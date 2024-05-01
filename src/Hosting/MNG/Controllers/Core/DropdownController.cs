using Microsoft.AspNetCore.Mvc;
using QN.EDF.Model;
using QN.Ots.Photo.MNG.Hosting.Framework;

namespace QN.Ots.Photo.MNG.Hosting.Controllers
{
    public class DropdownController : PhotoMNGBaseController
    {
        [HttpGet()]
        [Route("dp/col")]
        public IActionResult GetTableColumnDropdown(/*[FromQuery] TableColumnDPSearch param*/)
        {
            //List<DropdownSourceModel> list = si.GetTableColumnDropdown(param);

            //ApiResponseData<object> rsp = new ApiResponseData<object>();

            //if (list.Count > 0)
            //{
            //    rsp.success = true;
            //    rsp.code = 200;
            //    rsp.msg = "table-column succeed";
            //    rsp.data = list;
            //}
            //else
            //{
            //    rsp.success = false;
            //    rsp.code = 500;
            //    rsp.msg = "table-column failed";
            //    rsp.data = new { };
            //}

            //return Ok(rsp);

            var rsp = new
            {
                id = "fasdf",
                label = "fasdf",
                value = "fsd"
            };

            return Ok(rsp);
        }
    }
}
