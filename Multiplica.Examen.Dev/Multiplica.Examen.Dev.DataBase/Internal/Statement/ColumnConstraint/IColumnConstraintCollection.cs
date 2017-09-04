using System.Collections.Generic;

namespace Multiplica.Examen.Dev.DataBase.Statement.ColumnConstraint
{
    interface IColumnConstraintCollection : ICollection<IColumnConstraint>, IColumnConstraint
    {
    }
}
