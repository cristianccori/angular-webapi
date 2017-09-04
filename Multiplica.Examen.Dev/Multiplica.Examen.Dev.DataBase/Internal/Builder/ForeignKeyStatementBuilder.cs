using System.Collections.Generic;
using System.Linq;
using Multiplica.Examen.Dev.DataBase.Statement;
using Multiplica.Examen.Dev.DataBase.Utility;

namespace Multiplica.Examen.Dev.DataBase.Builder
{
    internal class ForeignKeyStatementBuilder : IStatementBuilder<ColumnStatementCollection>
    {
        private readonly IEnumerable<SqliteAssociationType> associationTypes;

        public ForeignKeyStatementBuilder(IEnumerable<SqliteAssociationType> associationTypes)
        {
            this.associationTypes = associationTypes;
        }

        public ColumnStatementCollection BuildStatement()
        {
            var columnDefStatement = new ColumnStatementCollection(GetForeignKeyStatements().ToList());
            return columnDefStatement;
        }

        private IEnumerable<ForeignKeyStatement> GetForeignKeyStatements()
        {
            foreach (var associationType in associationTypes)
            {
                yield return new ForeignKeyStatement
                {
                    ForeignKey = associationType.ForeignKey,
                    ForeignTable = associationType.FromTableName,
                    ForeignPrimaryKey = associationType.ForeignPrimaryKey,
                    CascadeDelete = associationType.CascadeDelete
                };
            }
        }
    }
}
