using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using QN.EDF.Common;
using QN.EDF.Model;
using QN.EDF.Common.Util;
using Microsoft.Extensions.Configuration;

namespace QN.Ots.Photo.Framework
{
    public static class PhotoHelper
    {
        private static IHttpContextAccessor http = QNInjection.Build<IHttpContextAccessor>();
        private static string Insert = PhotoCommonConstants.FillType.Insert;

        public static QNUserInfoBiz GetCurrentUser()
        {
            var qnToken = http?.HttpContext?.Request?.Headers?[PhotoCommonConstants.QNToken] ?? "";
            var qnTokenExtral = http?.HttpContext?.Request?.Headers?[PhotoCommonConstants.QNTokenExtral] ?? "";

            if (string.IsNullOrEmpty(qnToken) || string.IsNullOrEmpty(qnTokenExtral))
            {
                new QNUserInfoBiz();
            }

            string securityKey = GetSecurityKey(qnTokenExtral);

            Tuple<bool, string, JwtEntity> jwtDecode = JwtHelper.DecodeToken(qnToken, securityKey);

            if (jwtDecode.Item1)
            {
                return new QNUserInfoBiz()
                {
                    Id = jwtDecode.Item3.Uid,
                    Name = string.Empty,
                    Phone = string.Empty,
                    CurrentAuthority = string.Empty
                };
            }

            return new QNUserInfoBiz();
        }

        public static string GetSecurityKey(string qnTokenExtral = "")
        {
            var securityKey = $"{QNInjection.Build<IConfiguration>()?.GetValue<string>("QN:JWT:Secret") ?? ""}";
            var tokenKey = $@"{securityKey}-{qnTokenExtral}";
            return tokenKey;
        }

        public static QNBizBase FillCommonFields(this QNBizBase data, string optType = "")
        {
            var user = GetCurrentUser();

            if (string.IsNullOrEmpty(data.Id))
            {
                data.Id = Guid.NewGuid().ToString().ToLower();
            }

            data.DataStatus = 1;
            //data.IsEnable = data.IsEnable != null ? data.IsEnable : 1;
            data.VersionNo = 1;
            data.TransactionId = Guid.NewGuid().ToString().ToLower();

            //set the default field fill type to Insert
            optType = string.IsNullOrEmpty(optType) ? PhotoCommonConstants.FillType.Insert : optType;

            if (optType == PhotoCommonConstants.FillType.Insert)
            {
                data.CreatedBy = user.Id;
                data.CreatedTime = DateTime.Now;
                data.LastUpdatedBy = user.Id;
                data.LastUpdatedTime = DateTime.Now;
            }

            if (optType == PhotoCommonConstants.FillType.Update)
            {
                data.LastUpdatedBy = user.Id;
                data.LastUpdatedTime = DateTime.Now;
            }

            return data;
        }

        public static List<QNBizBase> FillCommonFields(this List<QNBizBase> data, string optType = "")
        {
            data.ForEach(p =>
            {
                p.FillCommonFields(optType);
            });

            return data;
        }
    }
}
