//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated by a tool.
//
//     Changes to this file may cause incorrect behavior and will be lost if
//     the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace QN.Ots.Photo.Core.BusinessComponent
{
    using QN.EDF.Common;
    using QN.EDF.Model;
    using QN.Ots.Photo.Core.DataAccess;
    using QN.Ots.Photo.Core.BusinessEntity;
    
    
    public class MngUserBusinessComponent
    {
        
        private MngUserDataAccess da = QNInjection.Build<MngUserDataAccess>();
        
        public (List<MngUserBO>, int) GetMngUserPaging(PageRequest<MngUserBO> data)
        {
            var result = da.GetMngUserPaging(data);
            return result;
        }
        
        public List<MngUserBO> GetMngUser(QueryRequest<MngUserBO> data)
        {
            var result = da.GetMngUser(data);
            return result;
        }
        
        public int AddMngUser(List<TEdfMngUser> data)
        {
            int result = da.AddMngUser(data);
            return result;
        }
        
        public int UpdateMngUser(List<TEdfMngUser> data)
        {
            int result = da.UpdateMngUser(data);
            return result;
        }
        
        public int DeleteMngUser(QNIDParam data)
        {
            int result = da.DeleteMngUser(data);
            return result;
        }
    }
}
