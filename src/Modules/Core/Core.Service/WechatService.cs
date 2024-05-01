using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using QN.EDF.Common;
using QN.EDF.Common.Util;
using QN.EDF.Model;
using QN.Ots.Photo.Core.BusinessComponent;
using QN.Ots.Photo.Core.BusinessEntity;
using QN.Ots.Photo.Core.ServiceInterface;
using QN.Ots.Photo.Framework;
using QN.EDF.Wechat.Model;
using QN.EDF.Wechat;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Primitives;

namespace QN.Ots.Photo.Core.Service
{
    public class WechatService : IWechatSI
    {
        private WechatBusinessComponent bc = QNInjection.Build<WechatBusinessComponent>();
        public readonly IApiUserSI bkSi = QNInjection.Build<IApiUserSI>();
        private static IHttpContextAccessor http = QNInjection.Build<IHttpContextAccessor>();

        public BizData<string> WeChatAuthorize(WxAuthorizeBiz wam)
        {
            BizData<string> rsp = new BizData<string>();

            WxAuthResultBiz authRsp = WechatHelper.WeChatAuthorize(wam.code);

            /*
            try
            {

            }
            catch (Exception ex)
            {
                rsp.code = 500;
                rsp.msg = "微信小程序授权错误";
                rsp.data = new { };
            }

            if (string.IsNullOrEmpty(authRsp.openid))
            {
                rsp.code = 500;
                rsp.msg = "未获取到授权信息,请重试";
                rsp.data = new { };
            }
            */

            string openId = authRsp.openid;
            string sessionKey = authRsp.session_key;

            if (string.IsNullOrEmpty(openId) || openId == "null")
            {
                rsp.Code = 500;
                rsp.Msg = "未获取到授权信息,请重试";
                rsp.Data = "";
            }

            if (string.IsNullOrEmpty(sessionKey) || sessionKey == "null")
            {
                rsp.Code = 500;
                rsp.Msg = "未获取到授权信息,请重试";
                rsp.Data = "";
            }

            string wxInfoText = WechatHelper.AESDecrypt(wam.encryptedData, sessionKey, wam.iv);

            WxEncryptDataBiz wxInfo = JsonConvert.DeserializeObject<WxEncryptDataBiz>(wxInfoText);

            String nick_name = wxInfo.nickName;
            String gender = wxInfo.gender;
            String province = wxInfo.province;
            String city = wxInfo.city;
            String district = wxInfo.country;
            String head_img = wxInfo.avatarUrl;
            String unionId = wxInfo.unionId;

            //creator user
            /* 微信昵称特殊字符串替换成星号*  */
            nick_name = nick_name.Replace("[\\x{10000}-\\x{10FFFF}]", "*");

            //生成jwttoken 

            BizData<ApiUserBiz> bkInfo = bkSi.GetApiUserDetail(new ApiUserBiz() { OpenId = openId });

            var qnExtral = http.HttpContext?.Request?.Headers?[QNCommonConstants.TokenName.QNTokenExtral] ?? ((StringValues)"");

            qnExtral = string.IsNullOrEmpty(qnExtral) ? "ots-photography" : qnExtral;
            string securityKey = $"{QNInjection.Build<IConfiguration>()?.GetValue<string>("QN:JWT:Secret") ?? ""}-{qnExtral}";

            //var securityKey = $"{QNInjection.Build<IConfiguration>()?.GetValue<string>("QN:JWT:Secret") ?? ""}";
            //string securityKey = $"{QNInjection.Configure<QNAppsettings>(QNCommonConstants.Framework).JWT.Secret}-loukoo";
            string token = "";

            bool bkInfoEmpty = string.IsNullOrEmpty(bkInfo?.Data?.Id ?? "");

            if (bkInfoEmpty)
            {
                //md5 salt
                string salt = $"{QNInjection.Build<IConfiguration>()?.GetValue<string>("QN:MD5:Salt") ?? ""}-{qnExtral}";
                var pwdMd5 = QNEncrypt.MD5("lk123456" + salt);

                //new AgentInfo
                ApiUserBiz bk = new ApiUserBiz()
                {
                    Id = Guid.NewGuid().ToString().ToLower(),
                    UserName = nick_name,//姓名
                    Phone = "", //电话
                    Pwd = pwdMd5,//密码
                    PwdText = "lk123456", //明文
                    Uid = unionId, //小程序用户UID
                    OpenId = openId, //小程序Open ID
                    OaOpenId = "", //用户公众号Open ID
                    SessionKey = sessionKey, //微信Session Key
                    Remark = "", //备注
                };

                bk.FillCommonFields();

                bkSi.AddApiUser(new List<ApiUserBiz>() { bk });

                rsp.Success = true;
                rsp.Code = 200;
                rsp.Msg = "授权成功";
                rsp.Data = "";

                //添加小程序的JWToken
                token = JwtHelper.Token(bk.Id, securityKey);

                rsp.Data = token;
            }
            else
            {
                //update wx info for existing user

                ApiUserBiz bk = bkInfo.Data;

                bk.Uid = unionId;
                bk.OpenId = openId;
                bk.SessionKey = sessionKey;
                bk.FillCommonFields();

                bkSi.UpdateApiUser(new List<ApiUserBiz>() { bk });

                rsp.Success = true;
                rsp.Code = 200;
                rsp.Msg = "授权成功";
                rsp.Data = "";

                //添加小程序的JWToken
                token = JwtHelper.Token(bk.Id, securityKey);

                rsp.Data = token;
            }

            //SysUserInfo user = new SysUserInfo()
            //{
            //    id = mng.id,
            //    name = mng.user_name,
            //    phone = mng.phone,
            //    token = token,
            //    currentAuthority = "admin",
            //    userType = "plt"
            //};

            return rsp;
        }

        public BizData<object> BindPhone(DecodePhoneBiz bph)
        {
            BizData<object> rsp = new BizData<object>();
            WxAuthResultBiz authRsp = new WxAuthResultBiz();

            string sessionKey = "";
            //string unionId = "";
            string openId = "";

            if (!string.IsNullOrEmpty(bph.code))
            {
                authRsp = WechatHelper.WeChatAuthorize(bph.code);

                sessionKey = authRsp.session_key;
                //unionId = authRsp.unionid;
                openId = authRsp.openid;

                string wxInfoText = WechatHelper.AESDecrypt(bph.encryptedData, sessionKey, bph.iv);

                WxEncryptDataBiz wxInfo = JsonConvert.DeserializeObject<WxEncryptDataBiz>(wxInfoText);
                string phone = wxInfo.phoneNumber;

                /* 更新用户session_key */
                BizData<ApiUserBiz> bks = bkSi.GetApiUserDetail(new ApiUserBiz() { OpenId = openId });

                bool isBkExists = !string.IsNullOrEmpty(bks?.Data?.Id ?? "");
                if (isBkExists)
                {
                    ApiUserBiz bk = bks.Data;

                    bk.SessionKey = sessionKey;
                    bk.Phone = phone;
                    bk.FillCommonFields();

                    var result = bkSi.UpdateApiUser(new List<ApiUserBiz>() { bk });

                    if (result.Success)
                    {
                        rsp.Code = 200;
                        rsp.Msg = "绑定手机号码成功";
                        rsp.Data = new { };
                        rsp.Success = true;

                        return rsp;
                    }
                    else
                    {
                        rsp.Code = 500;
                        rsp.Msg = "绑定手机号码失败,请重试";
                        rsp.Data = new { };

                        return rsp;
                    }
                }
                else
                {
                    rsp.Code = 500;
                    rsp.Msg = "绑定手机号码失败,请重试";
                    rsp.Data = new { };

                    return rsp;
                }
            }
            else
            { 
                //获取用户sessionkey
                BizData<ApiUserBiz> agent = bkSi.GetApiUserDetail(new ApiUserBiz() { Id = bph.agentId });

                bool isAgtExists = !string.IsNullOrEmpty(agent?.Data?.Id ?? "");

                if (isAgtExists)
                {
                    sessionKey = agent?.Data?.SessionKey ?? "";
                }

                //获取当前得session_key 
                if (string.IsNullOrEmpty(sessionKey))
                {
                    rsp.Code = 500;
                    rsp.Msg = "无法获取微信手机绑定的手机号码,请重试";
                    rsp.Data = new { };

                    return rsp;
                }

                string wxInfoText = WechatHelper.AESDecrypt(bph.encryptedData, sessionKey, bph.iv);

                if (string.IsNullOrEmpty(wxInfoText))
                {
                    //TODO 默认绑定成功-后期可以直接返回1205表示session过期
                    rsp.Code = 200;
                    rsp.Msg = "绑定手机号码成功";
                    rsp.Data = new { };
                    rsp.Success = true;

                    return rsp;
                }

                WxEncryptDataBiz wxInfo = JsonConvert.DeserializeObject<WxEncryptDataBiz>(wxInfoText);

                String nick_name = wxInfo.nickName;
                String gender = wxInfo.gender;
                String province = wxInfo.province;
                String city = wxInfo.city;
                String district = wxInfo.country;
                String head_img = wxInfo.avatarUrl;
                string phone = wxInfo.phoneNumber;

                if (string.IsNullOrEmpty(phone))
                {
                    rsp.Code = 500;
                    rsp.Msg = "绑定手机号码失败,请重试";
                    rsp.Data = new { };

                    return rsp;
                }

                if (isAgtExists)
                {
                    agent.Data.Phone = phone;
                    agent.Data.FillCommonFields();

                    var result = bkSi.UpdateApiUser(new List<ApiUserBiz>() { agent.Data });

                    if (result.Success)
                    {
                        rsp.Code = 200;
                        rsp.Msg = "绑定手机号码成功";
                        rsp.Data = new { };
                        rsp.Success = true;

                        return rsp;
                    }
                    else
                    {
                        rsp.Code = 500;
                        rsp.Msg = "绑定手机号码失败,请重试";
                        rsp.Data = new { };

                        return rsp;
                    }
                }
            }

            return rsp;
        }
    }
}