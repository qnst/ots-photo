using Microsoft.AspNetCore.Mvc;
using QN.EDF.Common;
using QN.EDF.Model;
using QN.Ots.Photo.Core.BusinessEntity;
using QN.Ots.Photo.Core.ServiceInterface;
using QN.Ots.Photo.MNG.Hosting.Framework;
using QN.EDF.AspNet.Auth;
using QN.EDF.Common.Util;
using System.Linq;
using NPOI.POIFS.Crypt.Dsig;
using DocumentFormat.OpenXml.InkML;
using Microsoft.Extensions.Primitives;

namespace QN.Ots.Photo.MNG.Hosting.Controllers
{
    public class ImageUploadController : PhotoMNGBaseController
    {
        private static IHttpContextAccessor http = QNInjection.Build<IHttpContextAccessor>();

        private static IWebHostEnvironment webHost = QNInjection.Build<IWebHostEnvironment>();

        [HttpPost]
        [Route("core/image-upload")]
        //[QNAllowAnonymous]
        public async Task<IActionResult> ImageUpload([FromForm] IFormCollection formData)
        {
            StringValues stringValues = HttpContext?.Request?.Headers?[QNCommonConstants.TokenName.QNToken] ?? ((StringValues)"");
            StringValues stringValues2 = HttpContext?.Request?.Headers?[QNCommonConstants.TokenName.QNTokenExtral] ?? ((StringValues)"");
            var apiData = new ApiData<object>() { Code = 200, ShowType = QNEnum.ErrorShowType.SILENT, Success = true, Data = { }, Msg = "" };

            var fileName = http.HttpContext.Request.Form.ContainsKey("fileName") ? http.HttpContext.Request.Form["fileName"].ToString() : "";
            var fileSize = http.HttpContext.Request.Form.ContainsKey("fileSize") ? http.HttpContext.Request.Form["fileSize"].ToString() : "";
            var fileFullName = http.HttpContext.Request.Form.ContainsKey("fileFullName") ? http.HttpContext.Request.Form["fileFullName"].ToString() : "";
            var fileDir = http.HttpContext.Request.Form.ContainsKey("fileDir") ? http.HttpContext.Request.Form["fileDir"].ToString() : "";

            //wwwroot/mng-img/
            var uploadPath = $"{QNInjection.Build<IConfiguration>()?.GetValue<string>("QN:Upload:Path") ?? ""}";
            var uploadUrl = $"{QNInjection.Build<IConfiguration>()?.GetValue<string>("QN:Upload:Url") ?? ""}";
            var fileDirPath = Path.Combine(uploadPath, fileDir);

            if (!Directory.Exists(fileDirPath))
            {
                Directory.CreateDirectory(fileDirPath);
            }

            //表单中获取分块文件
            var file = Request.Form.Files["file"];

            //获取文件扩展名
            //var ext = fileFullName.Substring(fileFullName.LastIndexOf(".") + 1, (fileFullName.Length - fileFullName.LastIndexOf(".") - 1));
            string ext = System.IO.Path.GetExtension(file.FileName).ToLower();

            bool unValidImg = ext != ".png" && ext != ".jpg" && ext != ".jpeg" && ext != ".bmp";

            if (unValidImg)
            {
                apiData.Success = false;
                apiData.Code = 500;
                apiData.Msg = "图片格式不正确";
                apiData.Data = new { };

                return Ok(apiData);
            }

            var fileTs = QNUtils.GetTimeNum() + QNUtils.RandNum(4);
            var newFileName = fileTs + ext;

            var fullName = fileDirPath + "/" + newFileName;

            using (var stream = new FileStream(fullName, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            apiData.Success = true;
            apiData.Code = 200;
            apiData.Msg = "upload succeed";

            apiData.Data = new
            {
                uid = fileTs,
                name = newFileName,
                status = "done",
                url = uploadUrl + (!string.IsNullOrEmpty(fileDir) ? fileDir + "/" : "") + newFileName,
                origin_name = file.FileName,
                path = !string.IsNullOrEmpty(fileDir) ? fileDir + "/" : "" + "" + newFileName
            };

            return Ok(apiData);
        }
    }
}
