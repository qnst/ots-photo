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

namespace QN.Ots.Photo.API.Hosting
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
            //turn off entity field can not be null
            //https://learn.microsoft.com/en-us/dotnet/csharp/nullable-references
            builder.Services.AddControllers(options => options.SuppressImplicitRequiredAttributeForNonNullableReferenceTypes = true);

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

            QNInjection.ServiceProvider = builder.Services.BuildQNService();
        }

        private static void InitApp(WebApplication app)
        {
            app.UseHttpsRedirection();

            app.UseAuthorization();

            app.MapControllers();

            app.MapHub<PhotoAPIHub>("/hub");

            // global exception handler should code here insure it works
            app.UseApplicationContextMiddleware();

            app.UseRealIp();

            app.UseCookiePolicy();
            app.UseSession();
            app.UseDefaultFiles();
            app.UseStaticFiles();

            app.UseForwardedHeaders(new ForwardedHeadersOptions { ForwardedHeaders = ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto });

            app.UseQNExceptionMiddleware();
        }
    }
}
