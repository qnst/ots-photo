using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using QN.EDF.AspNet;
using QN.EDF.AspNet.Auth;
using QN.EDF.Model;
using QN.Ots.Photo.Core.ServiceInterface;
using QN.EDF.Common;
using QN.EDF.Core.ApplicationContexts;

namespace QN.Ots.Photo.MNG.Hosting.Framework
{
    public class PhotoMNGAuthWorker : IQNAuthWorker
    {
        private readonly IMngUserSI si = QNInjection.Build<IMngUserSI>();
        private readonly IApiUserSI apiSi = QNInjection.Build<IApiUserSI>();

        public ApiData<object> CheckUserAuth()
        {
            //throw new NotImplementedException();

            var userId = ApplicationContext.Current.UserId;

            var user = si.GetMngUserDetail(new Core.BusinessEntity.MngUserBiz() { Id = userId });
            bool notExist = string.IsNullOrEmpty(user?.Data?.Id ?? "");

            if (notExist)
            {
                //合并MNG&API user验证，不用多部署一套API站点
                var apiUser = apiSi.GetApiUserDetail(new Core.BusinessEntity.ApiUserBiz() { Id = userId });

                bool notExist2 = string.IsNullOrEmpty(apiUser?.Data?.Id ?? "");

                if (notExist2)
                {
                    ApiData<object> rsp = new ApiData<object>
                    {
                        Success = false,
                        Code = 1025,
                        Msg = "UnAuthorized-QN03",
                        Data = new { }
                    };

                    return rsp;
                }
                else
                {
                    return new ApiData<object>
                    {
                        Success = true,
                        Code = 200,
                        Msg = "Authorized",
                        Data = new { }
                    };
                } 
            }
            else
            {
                return new ApiData<object>
                {
                    Success = true,
                    Code = 200,
                    Msg = "Authorized",
                    Data = new { }
                };
            }
        }

        /*
        IEdfMngUserSI si = QNInjection.Build<IEdfMngUserSI>();

        var mngUser = si.GetEdfMngUserDetail(new TEdfMngUserBiz() { Id = deToken.Item3.Uid });
        bool notExist = string.IsNullOrEmpty(mngUser?.Data?.Id ?? "");

        if (notExist)
        {
            ApiData<object> rsp = new ApiData<object>
            {
                Success = false,
                Code = 1025,
                Msg = "UnAuthorized-QN03",
                Data = new { }
            };

            return rsp;
        }
        */
    }
}
