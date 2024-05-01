using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using QN.EDF.Model;
using QN.EDF.Common;

namespace QN.Ots.Photo.Framework
{
    public class PhotoCommonConstants
    {
        public static PhotoCommonConstants Instance { get; } = new PhotoCommonConstants();

        public new string Framework => "Photography Platform";

        public const string QNToken = "qn-token";

        public const string QNTokenExtral = "qn-token-extral";

        public const string DefaultUserId = "00000000-0000-0000-0000-000000000000";

        public const string InstanceTestFiled = "Photography Platform";

        public class UserType
        {
            public static string Pic = "Pic";
            public static string Normal = "Normal";
        }

        public class ApplicationType
        {
            public static string Mng = "Mng";
            public static string Api = "Api";
        }

        public class FillType
        {
            public static string Insert = "Insert";
            public static string Update = "Update";
        }
    }
}
