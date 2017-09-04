using Multiplica.Examen.Dev.DataModel;
using System.Collections.Generic;
using System.Data.SQLite;
using System.Linq;

namespace Multiplica.Examen.Dev.DataAccess.Repository
{
    public class TimeLogTypeRepository   
    {
        public string ConnectionString
        {
            get { return System.Configuration.ConfigurationManager.ConnectionStrings["examDb"].ConnectionString; }
        }

        public List<TimeLogType> GetAll()
        {
            using (var connection = new SQLiteConnection(ConnectionString))
            {
                connection.Open();
                using (var context = new ExamDbContext(connection, false))
                {
                    return context.Set<TimeLogType>().ToList();
                }
            }
        }

        public TimeLogType GetById(int id)
        {
            using (var connection = new SQLiteConnection(ConnectionString))
            {
                connection.Open();
                using (var context = new ExamDbContext(connection, false))
                {
                    return context.Set<TimeLogType>().ToList().FirstOrDefault(x => x.Id == id);
                }
            }
        }

        public void Create(TimeLogType timeLogType)
        {
            using (var connection = new SQLiteConnection(ConnectionString))
            {
                connection.Open();
                using (var context = new ExamDbContext(connection, false))
                {
                    context.Set<TimeLogType>().Add(timeLogType);
                    context.SaveChanges();
                }
            }
        }
    }
}
