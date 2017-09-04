using Multiplica.Examen.Dev.Application.DTOs.TimeLogType;
using Multiplica.Examen.Dev.Application.DTOs.Common;
using Multiplica.Examen.Dev.Application.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace Multiplica.Examen.Dev.WebAPI.Controllers
{
    [RoutePrefix("api/timelogtypes")]
    public class TimeLogTypeController : ApiController
    {
        private readonly TimeLogTypeService _timeLogTypeService;

        public TimeLogTypeController()
        {
            _timeLogTypeService = new TimeLogTypeService();
        }

        [HttpGet]
        [Route("getAll")]
        [EnableCors(origins: "http://localhost:4200", headers: "*", methods: "*")]
        public List<TimelogTypeResponse> GetAll()
        {
            return _timeLogTypeService.GetAll();
        }

        [HttpGet]
        [Route("getById")]
        [EnableCors(origins: "http://localhost:4200", headers: "*", methods: "*")]
        public TimelogTypeResponse GetById(int timeLogTypeId)
        {
            return _timeLogTypeService.GetById(timeLogTypeId);
        }

        [HttpPost, Route]
        [EnableCors(origins: "http://localhost:4200", headers: "*", methods: "*")]
        public OperationResult Create([FromBody] TimeLogTypeDto dto)
        {
            return _timeLogTypeService.Create(dto);
        }
    }
}
