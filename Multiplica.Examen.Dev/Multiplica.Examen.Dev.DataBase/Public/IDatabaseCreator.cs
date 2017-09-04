using System.Data.Entity;
using System.Data.Entity.Infrastructure;

namespace Multiplica.Examen.Dev.DataBase
{
    public interface IDatabaseCreator
    {
        void Create(Database db, DbModel model);
    }
}