//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated by a tool.
//
//     Changes to this file may cause incorrect behavior and will be lost if
//     the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace QN.Ots.Photo.Photo.BusinessEntity
{
    using QN.EDF.Model;


    public class TPhotoBooking : MySQLDOBase
    {


        /// <summary>
        /// 分类
        /// </summary>
        public string? category_id { get; set; }

        public string appoint_date { get; set; }

        public string appoint_time { get; set; }

        /// <summary>
        /// 电话
        /// </summary>
        public string? phone { get; set; }

        /// <summary>
        /// 姓名
        /// </summary>
        public string? name { get; set; }

        /// <summary>
        /// 备注
        /// </summary>
        public string? remark { get; set; }

        public string? user_id { get; set; }

        public string? user_name { get; set; }

        public string? user_phone { get; set; }
    }
}