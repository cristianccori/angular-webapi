namespace Multiplica.Examen.Dev.DataBase.Statement.ColumnConstraint
{
    internal class NotNullConstraint : IColumnConstraint
    {
        public string CreateStatement()
        {
            return "NOT NULL";
        }
    }
}
