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
    
    
    public class PhotoImgBiz : QNBizBase
    {
        
        
        /// <summary>
        /// 类型
        /// </summary>
        public int? Type { get; set; }
        
        /// <summary>
        /// 路径
        /// </summary>
        public string? Path { get; set; }
        
        /// <summary>
        /// 名称
        /// </summary>
        public string? Name { get; set; }
        
        /// <summary>
        /// 信息，大小尺寸
        /// </summary>
        public string? Info { get; set; }
        
        /// <summary>
        /// 外键
        /// </summary>
        public string? Relid { get; set; }
    }
}
