using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors.Infrastructure;
using Microsoft.AspNetCore.HttpOverrides;
using QN.EDF.Data;
using QN.EDF.Common;
using QN.EDF.AspNet;
using QN.EDF.AspNet.Auth;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.AspNetCore.Server.Kestrel.Core;
using Microsoft.Extensions.Hosting;
using Google.Protobuf.WellKnownTypes;
using Microsoft.AspNetCore.Builder;
using Microsoft.OpenApi.Models;

namespace QN.Ots.Photo.MNG.Hosting
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.  
            InitService(builder);

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            InitApp(app);

            app.Run();
        }

        private static void InitService(WebApplicationBuilder builder)
        {
            var env = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT");
            var appSettings = string.IsNullOrEmpty(env) ? $"appsettings.Production.json" : $"appsettings.{env}.json";

            builder.Configuration
                .SetBasePath(AppContext.BaseDirectory)
                .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
                .AddJsonFile($"{appSettings}", optional: true)
                .AddEnvironmentVariables();

            //turn off entity field can not be null
            //https://learn.microsoft.com/en-us/dotnet/csharp/nullable-references
            builder.Services.AddControllers(options =>
                {
                    options.SuppressImplicitRequiredAttributeForNonNullableReferenceTypes = true;
                })
                .AddJsonOptions(options =>
                {
                    //options.JsonSerializerOptions.PropertyNamingPolicy =null;
                    //options.JsonSerializerOptions.Encoder = JavaScriptEncoder.Create(UnicodeRanges.All);
                });

            builder.Services.AddSingleton<QNDBHelper>();

            builder.Services.AddCors(options => options.AddPolicy("Default",
                builder =>
                {
                    builder
                           .SetIsOriginAllowed(origin => true)
                           .AllowAnyMethod()
                           .AllowAnyHeader()
                           //.WithOrigins(cors)
                           .AllowCredentials();
                }));

            builder.Services.AddDistributedMemoryCache();

            builder.Services.AddSession(options =>
            {
                options.IdleTimeout = TimeSpan.FromHours(12);
                options.Cookie.HttpOnly = true;
                options.Cookie.IsEssential = true;
            });

            builder.Services.Configure<CookiePolicyOptions>(options =>
            {
                options.CheckConsentNeeded = context => true;
                options.MinimumSameSitePolicy = SameSiteMode.None;
            });

            builder.Services.AddSignalR();

            //add global authorize filter
            builder.Services.AddMvc(s => s.Filters.Add(typeof(QNAuthorizeAttribute)));

            builder.Services.AddQNAspNet();
            builder.Services.AddRealIp(x => x.HeaderKey = "X-Forwarded-For");

            //Multipart body length limit 134217728 exceeded 
            builder.Services.Configure<FormOptions>(x =>
            {
                x.ValueLengthLimit = int.MaxValue;
                x.MultipartBodyLengthLimit = int.MaxValue;
                x.MultipartHeadersLengthLimit = int.MaxValue;
            });

            //Kestrel
            builder.Services.Configure<KestrelServerOptions>(options =>
            {
                options.Limits.MaxRequestBodySize = int.MaxValue;
            });

            //IIS
            builder.Services.Configure<IISServerOptions>(options =>
            {
                options.MaxRequestBodySize = int.MaxValue;
            });

            builder.Services.AddSwaggerDocument(doc =>
            {
                doc.DocumentName = "Photo";
                doc.PostProcess = d => d.Info.Title = "Photography Platform";
            });

            QNInjection.ServiceProvider = builder.Services.BuildQNService();
        }

        private static void InitApp(WebApplication app)
        {
            app.UseHttpsRedirection();
            app.UseAuthorization();
            app.MapControllers();
            app.MapHub<PhotoMNGHub>("/hub");
            app.UseRealIp();
            app.UseCookiePolicy();
            app.UseSession();
            app.UseDefaultFiles();
            app.UseStaticFiles();
            app.UseForwardedHeaders(new ForwardedHeadersOptions { ForwardedHeaders = ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto });
            app.UseApplicationContextMiddleware();

            // global exception handler should code here insure it works 
            app.UseQNExceptionMiddleware();

            app.UseOpenApi();
            app.UseSwaggerUi3();
        }
    }
}
