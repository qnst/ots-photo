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


    public class PhotoBookingBiz : QNBizBase
    {


        /// <summary>
        /// 分类
        /// </summary>
        public string? CategoryId { get; set; }

        public string CategoryName { get; set; }

        public string Price { get; set; }

        public string AppointDate { get; set; }

        public string AppointTime { get; set; }

        /// <summary>
        /// 电话
        /// </summary>
        public string? Phone { get; set; }

        /// <summary>
        /// 姓名
        /// </summary>
        public string? Name { get; set; }

        /// <summary>
        /// 备注
        /// </summary>
        public string? Remark { get; set; }

        public string? UserId { get; set; } 

        public string UserName { get; set; }

        public string UserPhone { get; set; }

        public string? Tx { get; set; }
    }
}
