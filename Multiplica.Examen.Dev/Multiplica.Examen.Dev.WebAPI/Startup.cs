using Microsoft.Owin;
using Owin;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Configuration;

[assembly: OwinStartup(typeof(Multiplica.Examen.Dev.WebAPI.Startup))]

namespace Multiplica.Examen.Dev.WebAPI
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            //Dependency Injection
            UnityConfig.RegisterComponents();

            GlobalConfiguration.Configure(config =>
            {
                var corsDomain = ConfigurationManager.AppSettings["CorsDomain"];
                var cors = new EnableCorsAttribute(corsDomain, "*", "*", "*");
                config.EnableCors(cors);
            });
        }
    }
}
