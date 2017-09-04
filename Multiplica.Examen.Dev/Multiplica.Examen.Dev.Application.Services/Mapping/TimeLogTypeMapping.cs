using System.Collections.Generic;
using Multiplica.Examen.Dev.Application.DTOs.TimeLogType;
using Multiplica.Examen.Dev.DataModel;

namespace Multiplica.Examen.Dev.Application.Services.Mapping
{
    public class TimeLogTypeMapping
    {
        public static List<TimelogTypeResponse> ModelToReponseList(List<TimeLogType> listModel)
        {
            if (listModel == null || listModel.Count == 0) return null;
            var mapping = new List<TimelogTypeResponse>();
            listModel.ForEach(x => mapping.Add(ModelToReponse(x)));
            return mapping;
        }

        public static TimelogTypeResponse ModelToReponse(TimeLogType model)
        {
            if (model == null) return null;
            return new TimelogTypeResponse { TimelogTypeId = model.Id, TimelogType = model.Type, Budget = model.Budget };
        }

        public static TimeLogType DtoToModel(TimeLogTypeDto dto)
        {
            if (dto == null) return null;
            return new TimeLogType { Type = dto.TimeLogType, Budget = dto.Budget };
        }
    }
}
