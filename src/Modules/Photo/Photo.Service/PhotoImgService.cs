//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated by a tool.
//
//     Changes to this file may cause incorrect behavior and will be lost if
//     the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace QN.Ots.Photo.Photo.Service
{
    using QN.EDF.Common;
    using QN.EDF.Model;
    using Microsoft.Extensions.Hosting;
    using QN.EDF.Common.Util;
    using Microsoft.Extensions.Configuration;
    using Microsoft.AspNetCore.Http;
    using QN.Ots.Photo.Framework;
    using QN.Ots.Photo.Photo.BusinessComponent;
    using QN.Ots.Photo.Photo.BusinessEntity;
    using QN.Ots.Photo.Photo.ServiceInterface;


    public class PhotoImgService : IPhotoImgSI
    {

        private PhotoImgBusinessComponent bc = QNInjection.Build<PhotoImgBusinessComponent>();

        private IHttpContextAccessor http = QNInjection.Build<IHttpContextAccessor>();

        public BizData<(List<PhotoImgBiz>, int)> GetPhotoImgPaging(PageRequest<PhotoImgBiz> data)
        {
            var boData = data.Transfer<PageRequest<PhotoImgBO>>();
            var result = bc.GetPhotoImgPaging(boData);

            var bizResponse = new BizData<(List<PhotoImgBiz>, int)>()
            {
                Code = 200,
                Success = true,
                Msg = "succeed",
                Data = (result.Item1.Transfer<List<PhotoImgBiz>>(), result.Item2)
            };

            return bizResponse;
        }

        public BizData<List<PhotoImgBiz>> GetPhotoImg(QueryRequest<PhotoImgBiz> data)
        {
            var boData = data.Transfer<QueryRequest<PhotoImgBO>>();
            var result = bc.GetPhotoImg(boData);

            var bizResponse = new BizData<List<PhotoImgBiz>>()
            {
                Code = 200,
                Success = true,
                Msg = "succeed",
                Data = result.Transfer<List<PhotoImgBiz>>()
            };

            return bizResponse;
        }

        public BizData<PhotoImgBiz> GetPhotoImgDetail(PhotoImgBiz data)
        {
            var list = GetPhotoImg(new QueryRequest<PhotoImgBiz>() { Data = data });

            var bizResponse = new BizData<PhotoImgBiz>()
            {
                Code = 200,
                Success = true,
                Msg = "succeed",
                Data = list.Data.FirstOrDefault()
            };

            return bizResponse;
        }

        public BizData<int> AddPhotoImg(List<PhotoImgBiz> data)
        {
            data.ForEach(p => p.FillCommonFields()); 
            var boData = data.Transfer<List<TPhotoImg>>();
            var result = bc.AddPhotoImg(boData);
            return new BizData<int>() { Code = 200, Success = true, Msg = "succeed", Data = result };
        }

        public BizData<int> UpdatePhotoImg(List<PhotoImgBiz> data)
        {
            data.ForEach(p => p.FillCommonFields());
            var boData = data.Transfer<List<TPhotoImg>>();
            var result = bc.UpdatePhotoImg(boData);
            return new BizData<int>() { Code = 200, Success = true, Msg = "succeed", Data = result };
        }

        public BizData<int> DeletePhotoImg(QNIDParamBiz data)
        {
            var boData = data.Transfer<QNIDParam>();
            var result = bc.DeletePhotoImg(boData);
            return new BizData<int>() { Code = 200, Success = true, Msg = "succeed", Data = result };
        }

        public BizData<int> DataStatusPhotoImg(QNIDParamBiz data)
        {
            var boData = data.Ids.Select(x => new PhotoImgBiz() { Id = x.Id, DataStatus = x.IsPhysical }).ToList();
            var result = UpdatePhotoImg(boData);
            return new BizData<int>() { Code = 200, Success = true, Msg = "succeed", Data = result.Data };
        }

        public BizData<QNExcelExportData> ExportPhotoImg(PageRequest<PhotoImgBiz> data)
        {
            //1.获取数据
            List<PhotoImgBiz> exportData = GetPhotoImgPaging(data).Data.Item1;

            //2.拼装参数
            var env = QNInjection.Build<IHostingEnvironment>();

            var fileName = $"PhotoImgBiz_{DateTime.Now.ToString("yyyymmddHHmmss") + DateTime.Now.Millisecond + QNUtils.RandNum(4)}.xlsx";

            var filePath = env.ContentRootPath + "\\wwwroot\\excel\\download\\";
            var fullPath = $"{filePath}{fileName}";

            QNExcelExportModel<PhotoImgBiz> exportParam = new QNExcelExportModel<PhotoImgBiz>()
            {
                Header = new Dictionary<string, string>()
                {
                    [""] = "序号",
                },
                Data = exportData,
                ExportType = "",
                FileName = fileName,
                FilePath = fullPath
            };

            //3.调用公用方法生成导出数据

            var result = QNExcelHelper.ExportExcel(exportParam);

            return new BizData<QNExcelExportData>() { Data = result };
        }
    }
}
