using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using QN.EDF.AspNet;
using QN.EDF.AspNet.Auth;

namespace QN.Ots.Photo.API.Hosting.Framework
{
    [QNAuthorize()]
    [Route("/v1/api/")]
    [ApiController()]
    public class PhotoAPIBaseController : ControllerBase
    {
    }
}
