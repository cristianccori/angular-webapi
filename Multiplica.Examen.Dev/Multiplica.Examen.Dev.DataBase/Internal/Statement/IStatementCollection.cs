using System.Collections.Generic;

namespace Multiplica.Examen.Dev.DataBase.Statement
{
    public interface IStatementCollection : IStatement, ICollection<IStatement>
    {
    }
}
