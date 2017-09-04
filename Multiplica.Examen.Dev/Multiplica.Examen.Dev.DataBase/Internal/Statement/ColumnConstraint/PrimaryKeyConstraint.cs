﻿using System.Text;

namespace Multiplica.Examen.Dev.DataBase.Statement.ColumnConstraint
{
    internal class PrimaryKeyConstraint : IColumnConstraint
    {
        private const string Template = "PRIMARY KEY {autoincrement}";

        public bool Autoincrement { get; set; }

        public string CreateStatement()
        {
            var sb = new StringBuilder(Template);

            sb.Replace("{autoincrement}", Autoincrement ? "AUTOINCREMENT" : string.Empty);

            return sb.ToString().Trim();
        }
    }
}