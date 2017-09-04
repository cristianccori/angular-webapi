﻿using System.Text;
using Multiplica.Examen.Dev.DataBase.Statement.ColumnConstraint;

namespace Multiplica.Examen.Dev.DataBase.Statement
{
    internal class ColumnStatement : IStatement
    {
        private const string Template = "[{column-name}] {type-name} {column-constraint}";

        public string ColumnName { get; set; }
        public string TypeName { get; set; }
        public IColumnConstraintCollection ColumnConstraints { get; set; }

        public string CreateStatement()
        {
            var sb = new StringBuilder(Template);

            sb.Replace("{column-name}", ColumnName);
            sb.Replace("{type-name}", TypeName);
            sb.Replace("{column-constraint}", ColumnConstraints.CreateStatement());

            return sb.ToString().Trim();
        }
    }
}
