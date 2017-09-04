using Multiplica.Examen.Dev.Application.DTOs.TimeLogType;
using Multiplica.Examen.Dev.Application.Services;
using Multiplica.Examen.Dev.DataAccess.Repository;
using Multiplica.Examen.Dev.DataModel;
using NUnit.Framework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Multiplica.Examen.Dev.Test
{
    [TestFixture]
    public class TimeLogTypeIntegrationTest
    {
        private static TimeLogTypeService timeLogTypeService() => new TimeLogTypeService();

        [Test]
        public void Validate_ApplicationService_SuccessCreate()
        {
            var result = timeLogTypeService().Create(new TimeLogTypeDto { TimeLogType = "IntegrationTest1", Budget = 1000 });
            Assert.IsTrue(result.IsValid, "Test failed because object doesn't created.");
            Assert.Zero(result.BrokenRulesCollection.Count(), "Test failed because creation has broken rules.");
        }

        [Test]
        public void Validate_ApplicationService_GetByFirstId()
        {
            timeLogTypeService().Create(new TimeLogTypeDto { TimeLogType = "IntegrationTest2", Budget = 2000 });
            Assert.IsNotNull(timeLogTypeService().GetById(1), "Test failed because object wasn't found.");
        }

        [Test]
        public void Validate_ApplicationService_GetAllList()
        {
            timeLogTypeService().Create(new TimeLogTypeDto { TimeLogType = "IntegrationTest3", Budget = 3000 });
            var list = timeLogTypeService().GetAll();
            Assert.IsNotNull(list, "Test failed because list wasn't found.");
            Assert.NotZero(list.Count(), "Test failed because list is empty.");
        }
    }
}
