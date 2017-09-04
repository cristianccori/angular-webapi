using System.Collections.Generic;
using System.Web.Http;
using Multiplica.Examen.Dev.Application.DTOs.TimeLogType;
using Multiplica.Examen.Dev.Application.DTOs.Common;
using Multiplica.Examen.Dev.Application.IServices;
using Multiplica.Examen.Dev.Application.Services;
using System.Web.Http.Cors;

namespace Multiplica.Examen.Dev.WebAPI.Controllers
{
    [RoutePrefix("api/timelogtypes")]
    public class TimeLogTypeController : ApiController
    {
        private readonly ITimeLogTypeService _timeLogTypeService;

        public TimeLogTypeController(ITimeLogTypeService timeLogTypeService)
        {
            _timeLogTypeService = timeLogTypeService;
        }

        [HttpGet]
        [Route("getall")]
        public List<TimelogTypeResponse> GetAll()
        {
            return _timeLogTypeService.GetAll();
        }

        [HttpGet]
        [Route("getbyid")]
        public TimelogTypeResponse GetById(int timeLogTypeId)
        {
            return _timeLogTypeService.GetById(timeLogTypeId);
        }

        [HttpPost, Route]
        public OperationResult Create([FromBody] TimeLogTypeDto dto)
        {
            return _timeLogTypeService.Create(dto);
        }
    }
}
