//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated by a tool.
//
//     Changes to this file may cause incorrect behavior and will be lost if
//     the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace QN.Ots.Photo.API.Hosting.Controllers
{
    using Microsoft.AspNetCore.Mvc;
    using QN.EDF.Common;
    using QN.EDF.Model;
    using QN.Ots.Photo.Core.BusinessEntity;
    using QN.Ots.Photo.Core.ServiceInterface;
    using QN.Ots.Photo.API.Hosting.Framework;
    using QN.EDF.AspNet.Auth;
    
    
    public class ApiUserController : PhotoAPIBaseController
    {
        
        private static IApiUserSI si = QNInjection.Build<IApiUserSI>();
        
        private static IHttpContextAccessor http = QNInjection.Build<IHttpContextAccessor>();
        
        private static IWebHostEnvironment webHost = QNInjection.Build<IWebHostEnvironment>();
        
        [HttpPost()]
        [Route("core/list-edf-api-user")]
        public IActionResult GetApiUserPaging([FromBody] PageRequest<ApiUserBiz> data)
        {

            BizData<(List<ApiUserBiz>, int)> bizResponse = si.GetApiUserPaging(data);
            var apiData = bizResponse.Transfer<ApiUserBiz, List<ApiUserBiz>>(data.Current, data.PageSize);
            return Ok(apiData);
        }
        
        [HttpPost()]
        [Route("core/add-edf-api-user")]
        public IActionResult AddApiUser([FromBody] ApiUserBiz data)
        {

            BizData<int> bizResponse = si.AddApiUser(new List<ApiUserBiz>() {data});
            var apiData = bizResponse.Transfer<ApiData<int>>();
            return Ok(apiData);
        }
        
        [HttpPost()]
        [Route("core/update-edf-api-user")]
        public IActionResult UpdateApiUser([FromBody] ApiUserBiz data)
        {

            BizData<int> bizResponse = si.UpdateApiUser(new List<ApiUserBiz>() {data});
            var apiData = bizResponse.Transfer<ApiData<int>>();
            return Ok(apiData);
        }
        
        [HttpGet()]
        [Route("core/detail-edf-api-user")]
        public IActionResult GetApiUserDetail([FromQuery] ApiUserBiz data)
        {

            BizData<ApiUserBiz> bizResponse = si.GetApiUserDetail(data);
            var apiData = bizResponse.Transfer<ApiData<ApiUserBiz>>();
            return Ok(apiData);
        }
        
        [HttpPost()]
        [Route("core/delete-edf-api-user")]
        public IActionResult DeleteApiUser([FromBody] QNIDParamBiz data)
        {

            BizData<int> bizResponse = si.DeleteApiUser(data);
            var apiData = bizResponse.Transfer<ApiData<int>>();
            return Ok(apiData);
        }
        
        [HttpPost()]
        [Route("core/export-edf-api-user")]
        public IActionResult ExportApiUser()
        {

            BizData<QNExcelExportData> biz = si.ExportApiUser(new PageRequest<ApiUserBiz>());
            FileStreamResult fsr = File(biz.Data.ExportStream, biz.Data.OutFormat, biz.Data.FileName);
            return fsr;
        }
        
        [HttpPost()]
        [Route("core/login-edf-api-user")]
        [QNAllowAnonymous()]
        public IActionResult LoginApiUser([FromBody] QueryRequest<LoginBiz> data)
        {

            BizData<QNUserInfoBiz> bizResponse = si.LoginApiUser(data);
            var apiData = bizResponse.Transfer<ApiData<QNUserInfoBiz>>();
            return Ok(apiData);
        }
        
        [HttpGet()]
        [Route("core/current-edf-api-user")]
        public IActionResult CurrentApiUser()
        {

            BizData<QNUserInfoBiz> bizResponse = si.GetCurrentApiUser();
            var apiData = bizResponse.Transfer<ApiData<QNUserInfoBiz>>();
            return Ok(apiData);
        }
        
        [HttpPost()]
        [Route("core/login-out-edf-api-user")]
        public IActionResult LoginOut()
        {

            var apiData = new ApiData<object>() { Code = 200, ShowType = QNEnum.ErrorShowType.SILENT, Success = true, Data = { }, Msg = "login out succeed!" };
            return Ok(apiData);
        }
    }
}