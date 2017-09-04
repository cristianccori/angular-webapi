using Multiplica.Examen.Dev.DataAccess.Repository;
using Multiplica.Examen.Dev.DataModel;
using NUnit.Framework;
using System.Linq;

namespace Multiplica.Examen.Dev.Test
{
    [TestFixture]
    public class TimeLogTypeUnitaryTest
    {
        private static TimeLogTypeRepository timeLogTypeRepository() => new TimeLogTypeRepository();

        [Test]
        public void Validate_DataAccessComponent_SuccessCreate()
        {
            timeLogTypeRepository().Create(new TimeLogType { Type = "UnitaryTest1", Budget = 1000 });
            var list = timeLogTypeRepository().GetAll();
            Assert.IsNotNull(list, "Test failed because object doesn't created.");
            Assert.IsNotNull(list.FirstOrDefault(x => x.Type == "UnitaryTest1"), "Test failed because object doesn't created.");
        }

        [Test]
        public void Validate_DataAccessComponent_GetByFirstId()
        {
            timeLogTypeRepository().Create(new TimeLogType { Type = "UnitaryTest2", Budget = 2000 });
            Assert.IsNotNull(timeLogTypeRepository().GetById(1), "Test failed because object wasn't found.");
        }

        [Test]
        public void Validate_DataAccessComponent_GetAllList()
        {
            timeLogTypeRepository().Create(new TimeLogType { Type = "UnitaryTest3", Budget = 3000 });
            var list = timeLogTypeRepository().GetAll();
            Assert.IsNotNull(list, "Test failed because list wasn't found.");
            Assert.NotZero(list.Count(), "Test failed because list is empty.");
        }
    }
}
