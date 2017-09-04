using System.Data.Entity;
using Multiplica.Examen.Dev.DataBase;
using Multiplica.Examen.Dev.DataModel;

namespace Multiplica.Examen.Dev.DataAccess
{
    public class ExamDbInitializer : SqliteDropCreateDatabaseWhenModelChanges<ExamDbContext>
    {
        public ExamDbInitializer(DbModelBuilder modelBuilder)
            : base(modelBuilder, typeof(CustomHistory))
        { }

        protected override void Seed(ExamDbContext context)
        {
            // Here you can seed your core data if you have any.
        }
    }
}
