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
    
    
    public class TPhotoCategory : MySQLDOBase
    {
        
        
        /// <summary>
        /// 名称
        /// </summary>
        public string? name { get; set; }

        public string? price { get; set; }

        public string sub_title { get; set; }

        /// <summary>
        /// 缩略图
        /// </summary>
        public string? thumb { get; set; }
        
        /// <summary>
        /// 父级
        /// </summary>
        public string? parent_id { get; set; }
        
        /// <summary>
        /// 备注
        /// </summary>
        public string? remark { get; set; }
    }
}