//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated by a tool.
//
//     Changes to this file may cause incorrect behavior and will be lost if
//     the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace QN.Ots.Photo.Photo.BusinessComponent
{
    using QN.EDF.Common;
    using QN.EDF.Model;
    using QN.Ots.Photo.Photo.DataAccess;
    using QN.Ots.Photo.Photo.BusinessEntity;
    
    
    public class PhotoCategoryBusinessComponent
    {
        
        private PhotoCategoryDataAccess da = QNInjection.Build<PhotoCategoryDataAccess>();
        
        public (List<PhotoCategoryBO>, int) GetPhotoCategoryPaging(PageRequest<PhotoCategoryBO> data)
        {
            var result = da.GetPhotoCategoryPaging(data);
            return result;
        }
        
        public List<PhotoCategoryBO> GetPhotoCategory(QueryRequest<PhotoCategoryBO> data)
        {
            var result = da.GetPhotoCategory(data);
            return result;
        }
        
        public int AddPhotoCategory(List<TPhotoCategory> data)
        {
            int result = da.AddPhotoCategory(data);
            return result;
        }
        
        public int UpdatePhotoCategory(List<TPhotoCategory> data)
        {
            int result = da.UpdatePhotoCategory(data);
            return result;
        }
        
        public int DeletePhotoCategory(QNIDParam data)
        {
            int result = da.DeletePhotoCategory(data);
            return result;
        }
    }
}