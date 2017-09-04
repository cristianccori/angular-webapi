using System;
using Multiplica.Examen.Dev.Application.DTOs.Common;
using Multiplica.Examen.Dev.Application.DTOs.TimeLogType;
using Multiplica.Examen.Dev.Application.IServices;
using Multiplica.Examen.Dev.Application.Services.Mapping;
using Multiplica.Examen.Dev.DataAccess.Repository;
using System.Collections.Generic;

namespace Multiplica.Examen.Dev.Application.Services
{
    public class TimeLogTypeService : ITimeLogTypeService
    {
        private readonly TimeLogTypeRepository _timeLogTypeRepository;

        public TimeLogTypeService()
        {
            _timeLogTypeRepository = new TimeLogTypeRepository();
        }

        public List<TimelogTypeResponse> GetAll()
        {
            try
            {
                return TimeLogTypeMapping.ModelToReponseList(_timeLogTypeRepository.GetAll());
            }
            catch (Exception)
            {
                return null;
            }
        }

        public TimelogTypeResponse GetById(int id)
        {
            try
            {
                return TimeLogTypeMapping.ModelToReponse(_timeLogTypeRepository.GetById(id));
            }
            catch (Exception)
            {
                return null;
            }
        }

        public OperationResult Create(TimeLogTypeDto dto)
        {
            try
            {
                var model = TimeLogTypeMapping.DtoToModel(dto);
                if (model == null || string.IsNullOrEmpty(model.Type) || model.Budget == 0)
                {
                    return new OperationResult
                    {
                        BrokenRulesCollection = new BrokenRulesCollection(
                        new List<BrokenRule> {
                            new BrokenRule {
                                Description = model.Budget == 0 ? "Budget can not be '0'.": "Invalid Time Log Type to create.",
                                Severity = RuleSeverity.Error} })
                    };
                }
                model.Type = model.Type.ToUpper();
                _timeLogTypeRepository.Create(model);
                //success, no broken rules by error
                return new OperationResult();
            }
            catch (Exception ex)
            {
                return new OperationResult { BrokenRulesCollection = new BrokenRulesCollection(
                    new List<BrokenRule> {
                        new BrokenRule {
                            Description = ex.Message,
                            Severity = RuleSeverity.Error} })};
            }
        }
    }
}
