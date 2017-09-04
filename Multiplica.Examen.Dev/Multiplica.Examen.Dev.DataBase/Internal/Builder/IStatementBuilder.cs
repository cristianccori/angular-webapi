using Multiplica.Examen.Dev.DataBase.Statement;

namespace Multiplica.Examen.Dev.DataBase.Builder
{
    internal interface IStatementBuilder<out TStatement>
        where TStatement : IStatement
    {
        TStatement BuildStatement();
    }
}
