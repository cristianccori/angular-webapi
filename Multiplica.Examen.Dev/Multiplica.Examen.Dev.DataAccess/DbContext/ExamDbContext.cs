using System.Data.Common;
using System.Data.Entity;

namespace Multiplica.Examen.Dev.DataAccess
{
    public class ExamDbContext : DbContext
    {
        public ExamDbContext(string nameOrConnectionString)
            : base(nameOrConnectionString)
        {
            Configure();
        }

        public ExamDbContext(DbConnection connection, bool contextOwnsConnection)
            : base(connection, contextOwnsConnection)
        {
            Configure();
        }

        private void Configure()
        {
            Configuration.ProxyCreationEnabled = true;
            Configuration.LazyLoadingEnabled = true;
        }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            ModelConfiguration.Configure(modelBuilder);
            var initializer = new ExamDbInitializer(modelBuilder);
            Database.SetInitializer(initializer);
        }
    }
}
