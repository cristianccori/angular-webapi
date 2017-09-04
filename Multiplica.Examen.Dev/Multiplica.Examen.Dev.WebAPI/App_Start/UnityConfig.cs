using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;
using Microsoft.Practices.EnterpriseLibrary.ExceptionHandling;
using Microsoft.Practices.EnterpriseLibrary.Logging;
using Microsoft.Practices.EnterpriseLibrary.PolicyInjection.Configuration;
using Microsoft.Practices.Unity;
using Microsoft.Practices.Unity.InterceptionExtension;
using System.Collections.Generic;
using System.Reflection;
using System.Web.Http;
using Unity.WebApi;

namespace Multiplica.Examen.Dev.WebAPI
{
    public static class UnityConfig
    {
        public static void RegisterComponents()
        {
            var container = new UnityContainer();
            container.AddNewExtension<Interception>();

            IConfigurationSource source = ConfigurationSourceFactory.Create();

            var policyInjectionSettings = (PolicyInjectionSettings)source.GetSection(PolicyInjectionSettings.SectionName);
            policyInjectionSettings.ConfigureContainer(container);

            var exceptionPolicyFactory = new ExceptionPolicyFactory(source);
            var logWriterFactory = new LogWriterFactory(source);

            container.RegisterType<ExceptionManager>(new ContainerControlledLifetimeManager(), new InjectionFactory(unityContainer => exceptionPolicyFactory.CreateManager()));
            container.RegisterType<LogWriter>(new ContainerControlledLifetimeManager(), new InjectionFactory(unityContainer => logWriterFactory.Create()));

            IList<Assembly> servicesAssemblies = new List<Assembly>();
            servicesAssemblies.Add(Assembly.Load("Multiplica.Examen.Dev.Application.IServices"));
            servicesAssemblies.Add(Assembly.Load("Multiplica.Examen.Dev.Application.Services"));

            container.RegisterTypes(
                AllClasses.FromAssemblies(servicesAssemblies),
                WithMappings.FromMatchingInterface,
                WithName.Default,
                t => new PerRequestLifetimeManager(),
                type => new InjectionMember[]
                {
                    new InterceptionBehavior<PolicyInjectionBehavior>(),
                    new Interceptor<TransparentProxyInterceptor>()
                }
            );

            GlobalConfiguration.Configuration.DependencyResolver = new UnityDependencyResolver(container);
        }
    }
}