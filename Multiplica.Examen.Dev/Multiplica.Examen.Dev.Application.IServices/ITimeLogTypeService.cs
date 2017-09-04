using Multiplica.Examen.Dev.Application.DTOs.Common;
using Multiplica.Examen.Dev.Application.DTOs.TimeLogType;
using System.Collections.Generic;

namespace Multiplica.Examen.Dev.Application.IServices
{
    public interface ITimeLogTypeService
    {
        List<TimelogTypeResponse> GetAll();
        TimelogTypeResponse GetById(int id);
        OperationResult Create(TimeLogTypeDto dto);
    }
}
