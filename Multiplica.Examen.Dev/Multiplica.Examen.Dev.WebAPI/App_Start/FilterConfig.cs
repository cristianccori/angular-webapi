using System.Web;
using System.Web.Mvc;

namespace Multiplica.Examen.Dev.WebAPI
{
    public class FilterConfig
    {
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            filters.Add(new HandleErrorAttribute());
        }
    }
}
