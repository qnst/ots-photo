using Microsoft.AspNetCore.Mvc;
using QN.EDF.AspNet.Auth;
using QN.EDF.Common;
using QN.EDF.Model;
using QN.EDF.Wechat.Model;
using QN.Ots.Photo.Core.BusinessEntity;
using QN.Ots.Photo.Core.ServiceInterface;
using QN.Ots.Photo.MNG.Hosting.Framework;
using static System.Net.WebRequestMethods;

namespace QN.Ots.Photo.MNG.Hosting.Controllers
{
    public class WechatController : PhotoMNGBaseController
    {
        private static IHttpContextAccessor http = QNInjection.Build<IHttpContextAccessor>();
        private static IWechatSI si = QNInjection.Build<IWechatSI>();
        private static IWebHostEnvironment webHost = QNInjection.Build<IWebHostEnvironment>();

        [HttpPost()]
        [Route("wx/wechat-authorize")]
        [QNAllowAnonymous]
        public IActionResult WechatAuthorize([FromBody] WxAuthorizeBiz wxam)
        {
            BizData<string> rsp = new BizData<string>();

            if (wxam == null)
            {
                rsp.Code = 500;
                rsp.Msg = "参数不能为空";
                rsp.Data = "";

                return Ok(rsp);
            }

            if (string.IsNullOrEmpty(wxam.code))
            {
                rsp.Code = 500;
                rsp.Msg = "小程序授权CODE不能为空";
                rsp.Data = "";

                return Ok(rsp);
            }

            if (string.IsNullOrEmpty(wxam.encryptedData))
            {
                rsp.Code = 500;
                rsp.Msg = "小程序授权ENCRYPTED_DATA不能为空";
                rsp.Data = "";

                return Ok(rsp);
            }

            if (string.IsNullOrEmpty(wxam.iv))
            {
                rsp.Code = 500;
                rsp.Msg = "小程序授权IV不能为空";
                rsp.Data = "";

                return Ok(rsp);
            }

            rsp = si.WeChatAuthorize(wxam);
            var apiData = rsp.Transfer<ApiData<string>>();
            return Ok(apiData);
        }

        [HttpPost]
        [Route("wx/bind-phone")]
        [QNAllowAnonymous]
        public IActionResult BindPhone([FromBody] DecodePhoneBiz bph)
        {
            string accessToken = http?.HttpContext?.Request?.Headers?[QNCommonConstants.TokenName.QNToken].ToString() ?? "";
            //bph.agentId = accessToken;

            BizData<object> rsp = new BizData<object>();
            rsp = si.BindPhone(bph);
            return Ok(rsp);
        }
    }
}
