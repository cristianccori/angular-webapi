using System.Collections.Generic;
using System.Data.Entity.Core.Metadata.Edm;
using System.Linq;
using Multiplica.Examen.Dev.DataBase.Statement;

namespace Multiplica.Examen.Dev.DataBase.Builder
{
    internal class CompositePrimaryKeyStatementBuilder : IStatementBuilder<CompositePrimaryKeyStatement>
    {
        private readonly IEnumerable<EdmMember> keyMembers;

        public CompositePrimaryKeyStatementBuilder(IEnumerable<EdmMember> keyMembers)
        {
            this.keyMembers = keyMembers;
        }

        public CompositePrimaryKeyStatement BuildStatement()
        {
            return new CompositePrimaryKeyStatement(keyMembers.Select(km => km.Name));
        }
    }
}
