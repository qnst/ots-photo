//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated by a tool.
//
//     Changes to this file may cause incorrect behavior and will be lost if
//     the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace QN.Ots.Photo.Photo.DataAccess
{
    using QN.EDF.Data;
    using QN.EDF.Common;
    using QN.EDF.Model;
    using Dapper;
    using System.Data;
    using QN.Ots.Photo.Photo.BusinessEntity;


    public class PhotoPriceDataAccess : QNDataAccessBase
    {

        public (List<PhotoPriceBO>, int) GetPhotoPricePaging(PageRequest<PhotoPriceBO> data)
        {
            //using (var conn = Helper.Database.CreateConnection())
            {
                var dic = data.Transfer(QNCommonConstants.OptType.Page);
                List<PhotoPriceBO> result = Helper.C1.Query<PhotoPriceBO>("P_PHOTO_PRICE_P", dic, commandType: CommandType.StoredProcedure).ToList();
                Int32 totalNum = result.Count > 0 ? dic.Get<Int32>(QNCommonConstants.DataOperation.StoredProcedureParam.TotalNum.ToLower()) : 0;
                return (result, totalNum);
            }
        }

        public List<PhotoPriceBO> GetPhotoPrice(QueryRequest<PhotoPriceBO> data)
        {
            //using (var conn = Helper.Database.CreateConnection())
            {
                var dic = data.Transfer();
                List<PhotoPriceBO> result = Helper.C1.Query<PhotoPriceBO>("P_PHOTO_PRICE_S", dic, commandType: CommandType.StoredProcedure).ToList();
                return result;
            }
        }

        public int AddPhotoPrice(List<TPhotoPrice> data)
        {
            //using (var conn = Helper.Database.CreateConnection())
            {
                var affected = 0;

                data.ForEach(p =>
                {
                    var dic = p.Transfer();
                    affected += Helper.C1.Execute("P_PHOTO_PRICE_I", dic, commandType: CommandType.StoredProcedure);
                });

                return affected;
            }
        }

        public int UpdatePhotoPrice(List<TPhotoPrice> data)
        {
            //using (var conn = Helper.Database.CreateConnection())
            {
                var affected = 0;

                data.ForEach(p =>
                {
                    var dic = p.Transfer();
                    affected += Helper.C1.Execute("P_PHOTO_PRICE_U", dic, commandType: CommandType.StoredProcedure);
                });

                return affected;
            }
        }

        public int DeletePhotoPrice(QNIDParam data)
        {
            //using (var conn = Helper.Database.CreateConnection())
            {
                var affected = 0;

                data.ids.ForEach(id =>
                {
                    var dic = id.Transfer();
                    dic["p_is_physical"] = 1;
                    affected += Helper.C1.Execute("P_PHOTO_PRICE_D", dic, commandType: CommandType.StoredProcedure);
                });

                return affected;
            }
        }
    }
}
