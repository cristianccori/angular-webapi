using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;

namespace Multiplica.Examen.Dev.DataBase.Statement
{
    internal class CreateDatabaseStatement : Collection<IStatement>, IStatement
    {
        private const string StatementSeperator = "\r\n";

        public CreateDatabaseStatement() { }

        public CreateDatabaseStatement(IEnumerable<IStatement> statements)
        {
            foreach (var statement in statements)
            {
                Add(statement);
            }
        }

        public string CreateStatement()
        {
            return String.Join(StatementSeperator, this.Select(c => c.CreateStatement()));
        }
    }
}
