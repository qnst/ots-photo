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

namespace QN.Ots.Photo.API.Hosting.Framework
{
    public class PhotoAPIAuthWorker : IQNAuthWorker
    {
        private readonly IApiUserSI si = QNInjection.Build<IApiUserSI>();

        public ApiData<object> CheckUserAuth()
        {
            //throw new NotImplementedException();

            var userId = ApplicationContext.Current.UserId;

            var user = si.GetApiUserDetail(new Core.BusinessEntity.ApiUserBiz() { Id = userId });
            bool notExist = string.IsNullOrEmpty(user?.Data?.Id ?? "");

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
