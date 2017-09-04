using Multiplica.Examen.Dev.DataModel;
using System.Data.Entity;

namespace Multiplica.Examen.Dev.DataAccess
{
    public class ModelConfiguration
    {
        public static void Configure(DbModelBuilder modelBuilder)
        {
            ConfigureTeamEntity(modelBuilder);
        }

        private static void ConfigureTeamEntity(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<TimeLogType>().ToTable("Base.MyTable");
        }
    }
}
