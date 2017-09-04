using System.Data.Entity.Core.Metadata.Edm;

namespace Multiplica.Examen.Dev.DataBase
{
    public interface ISqlGenerator
    {
        string Generate(EdmModel storeModel);
    }
}