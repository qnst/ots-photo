//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated by a tool.
//
//     Changes to this file may cause incorrect behavior and will be lost if
//     the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace QN.Ots.Photo.Core.Service
{
    using QN.EDF.Common;
    using QN.EDF.Model;
    using Microsoft.Extensions.Hosting;
    using QN.EDF.Common.Util;
    using Microsoft.Extensions.Configuration;
    using Microsoft.AspNetCore.Http;
    using QN.Ots.Photo.Framework;
    using QN.Ots.Photo.Core.BusinessComponent;
    using QN.Ots.Photo.Core.BusinessEntity;
    using QN.Ots.Photo.Core.ServiceInterface;


    public class MngUserService : IMngUserSI
    {

        private MngUserBusinessComponent bc = QNInjection.Build<MngUserBusinessComponent>();

        private IHttpContextAccessor http = QNInjection.Build<IHttpContextAccessor>();

        public BizData<(List<MngUserBiz>, int)> GetMngUserPaging(PageRequest<MngUserBiz> data)
        {
            var boData = data.Transfer<PageRequest<MngUserBO>>();
            var result = bc.GetMngUserPaging(boData);

            var bizResponse = new BizData<(List<MngUserBiz>, int)>()
            {
                Code = 200,
                Success = true,
                Msg = "succeed",
                Data = (result.Item1.Transfer<List<MngUserBiz>>(), result.Item2)
            };

            return bizResponse;
        }

        public BizData<List<MngUserBiz>> GetMngUser(QueryRequest<MngUserBiz> data)
        {
            var boData = data.Transfer<QueryRequest<MngUserBO>>();
            var result = bc.GetMngUser(boData);

            var bizResponse = new BizData<List<MngUserBiz>>()
            {
                Code = 200,
                Success = true,
                Msg = "succeed",
                Data = result.Transfer<List<MngUserBiz>>()
            };

            return bizResponse;
        }

        public BizData<MngUserBiz> GetMngUserDetail(MngUserBiz data)
        {
            var list = GetMngUser(new QueryRequest<MngUserBiz>() { Data = data });

            var bizResponse = new BizData<MngUserBiz>()
            {
                Code = 200,
                Success = true,
                Msg = "succeed",
                Data = list.Data.FirstOrDefault()
            };

            return bizResponse;
        }

        public BizData<int> AddMngUser(List<MngUserBiz> data)
        {
            var boData = data.Transfer<List<TEdfMngUser>>();
            var result = bc.AddMngUser(boData);
            return new BizData<int>() { Code = 200, Success = true, Msg = "succeed", Data = result };
        }

        public BizData<int> UpdateMngUser(List<MngUserBiz> data)
        {
            var boData = data.Transfer<List<TEdfMngUser>>();
            var result = bc.UpdateMngUser(boData);
            return new BizData<int>() { Code = 200, Success = true, Msg = "succeed", Data = result };
        }

        public BizData<int> DeleteMngUser(QNIDParamBiz data)
        {
            var boData = data.Transfer<QNIDParam>();
            var result = bc.DeleteMngUser(boData);
            return new BizData<int>() { Code = 200, Success = true, Msg = "succeed", Data = result };
        }

        public BizData<int> DataStatusMngUser(QNIDParamBiz data)
        {
            var boData = data.Ids.Select(x => new MngUserBiz() { Id = x.Id, DataStatus = x.IsPhysical }).ToList();
            var result = UpdateMngUser(boData);
            return new BizData<int>() { Code = 200, Success = true, Msg = "succeed", Data = result.Data };
        }

        public BizData<QNExcelExportData> ExportMngUser(PageRequest<MngUserBiz> data)
        {
            //1.获取数据
            List<MngUserBiz> exportData = GetMngUserPaging(data).Data.Item1;

            //2.拼装参数
            var env = QNInjection.Build<IHostingEnvironment>();

            var fileName = $"MngUserBiz_{DateTime.Now.ToString("yyyymmddHHmmss") + DateTime.Now.Millisecond + QNUtils.RandNum(4)}.xlsx";

            var filePath = env.ContentRootPath + "\\wwwroot\\excel\\download\\";
            var fullPath = $"{filePath}{fileName}";

            QNExcelExportModel<MngUserBiz> exportParam = new QNExcelExportModel<MngUserBiz>()
            {
                Header = new Dictionary<string, string>()
                {
                    [""] = "序号",
                },
                Data = exportData,
                ExportType = "",
                FileName = fileName,
                FilePath = fullPath
            };

            //3.调用公用方法生成导出数据

            var result = QNExcelHelper.ExportExcel(exportParam);

            return new BizData<QNExcelExportData>() { Data = result };
        }

        public BizData<QNUserInfoBiz> LoginMngUser(QueryRequest<LoginBiz> data)
        {
            if (data.Data.Type == "account" && (string.IsNullOrEmpty(data.Data.UserName) || string.IsNullOrEmpty(data.Data.Password)))
            {
                var rsp = new BizData<QNUserInfoBiz>()
                {
                    Code = 500,
                    Success = false,
                    Msg = "用户名或密码不能为空",
                    Data = null
                };

                return rsp;
            }

            if (data.Data.Type == "mobile" && (string.IsNullOrEmpty(data.Data.Mobile) || string.IsNullOrEmpty(data.Data.Captcha)))
            {
                var rsp = new BizData<QNUserInfoBiz>()
                {
                    Code = 500,
                    Success = false,
                    Msg = "手机号或密码不能为空",
                    Data = null
                };

                return rsp;
            }

            BizData<List<MngUserBiz>> mngs = new BizData<List<MngUserBiz>>();

            if (data.Data.Type == "account")
            {
                var par = new QueryRequest<MngUserBiz>()
                {
                    Data = new MngUserBiz() { UserName = data.Data.UserName }
                };

                mngs = GetMngUser(par);
            }

            if (data.Data.Type == "mobile")
            {
                var par = new QueryRequest<MngUserBiz>()
                {
                    Data = new MngUserBiz() { Phone = data.Data.Mobile }
                };

                mngs = GetMngUser(par);
            }

            bool canLogin = mngs?.Data?.Any() ?? false;

            if (!canLogin)
            {
                var rsp = new BizData<QNUserInfoBiz>()
                {
                    Code = 500,
                    Success = false,
                    Msg = "账号不存在",
                    Data = null
                };

                return rsp;
            }

            MngUserBiz mng = null;

            if (mngs?.Data?.Any() ?? false)
            {
                mng = mngs.Data.FirstOrDefault();
                var newRsp = LoginAndCheck(data.Data, mng, "0");
                return newRsp;
            }

            var bizResponse = new BizData<QNUserInfoBiz>()
            {
                Code = 500,
                Success = false,
                Msg = "系统错误，请联系客服",
                Data = null
            };

            return bizResponse;
        }

        public BizData<QNUserInfoBiz> LoginAndCheck(LoginBiz par, MngUserBiz cusInfo, string logPhoneType)
        {
            string qnTokenExtral = http?.HttpContext?.Request?.Headers?[PhotoCommonConstants.QNTokenExtral] ?? "";

            var cusPwd = logPhoneType == "0" ? cusInfo?.Pwd ?? "" : "";

            //md5 salt
            string salt = $"{QNInjection.Build<IConfiguration>()?.GetValue<string>("QN:MD5:Salt") ?? ""}-{qnTokenExtral}";
            string pwd = !string.IsNullOrEmpty(par.Password) ? par.Password : !string.IsNullOrEmpty(par.Captcha) ? par.Captcha : "";
            bool pwdMd5 = QNEncrypt.MD5(pwd + salt) == cusPwd;

            if (!pwdMd5)
            {
                var rsp = new BizData<QNUserInfoBiz>()
                {
                    Code = 500,
                    Success = false,
                    Msg = "密码错误",
                    Data = null
                };

                return rsp;
            }

            //generate jwt token 
            string securityKey = $"{QNInjection.Build<IConfiguration>()?.GetValue<string>("QN:JWT:Secret") ?? ""}-{qnTokenExtral}";
            string token = JwtHelper.Token(cusInfo.Id, securityKey, timespan: 24 * 60 * 60 * 1000);

            QNUserInfoBiz user = new QNUserInfoBiz();

            user.Id = cusInfo.Id;
            user.NickName = logPhoneType == "0" ? cusInfo?.NickName ?? "" : "";
            user.Phone = logPhoneType == "0" ? cusInfo?.Phone ?? "" : "";
            user.CurrentAuthority = "admin";
            user.Token = token;
            user.UserType = "mng";
            user.LoginType = logPhoneType;
            user.Status = "ok";
            user.Type = "account";

            //前端需要把登录类型带到后台
            //localStorage.setItem('qn-ocw-user-type', '');
            //options: { ...options, headers: { 'spms-ocw-token': localStorage.getItem('qn-ocw-act') || '' ,'spms-ocw-login-type':localStorage.getItem('qn-ocw-user-type')} },

            var bizResponse = new BizData<QNUserInfoBiz>()
            {
                Code = 200,
                Success = true,
                Msg = "登陆成功",
                Data = user
            };

            return bizResponse;
        }

        public BizData<QNUserInfoBiz> GetCurrentMngUser()
        {
            QNUserInfoBiz sysUser = PhotoHelper.GetCurrentUser();
            BizData<MngUserBiz> user = GetMngUserDetail(new MngUserBiz() { Id = sysUser?.Id ?? "-1" });

            if (string.IsNullOrEmpty(user?.Data?.Id ?? ""))
            {
                var rsp = new BizData<QNUserInfoBiz>()
                {
                    Success = false,
                    Code = 401,
                    Msg = "用户不存在",
                    Data = null
                };

                return rsp;
            }

            QNUserInfoBiz sysRst = new QNUserInfoBiz();
            sysRst.Id = user?.Data?.Id ?? "";
            sysRst.Phone = user?.Data?.Phone ?? "";
            sysRst.Name = user?.Data?.UserName ?? "";
            sysRst.NickName = user?.Data.NickName ?? "";
            sysRst.CurrentAuthority = "customer";
            sysRst.UserType = "ocw";
            sysRst.Avatar = "https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png";

            //TODO access need to use auth table
            sysRst.Access = "admin";

            var biz = new BizData<QNUserInfoBiz>()
            {
                Success = true,
                Code = 200,
                Msg = "获取用户信息成功",
                Data = sysRst
            };

            return biz;
        }
    }
}
