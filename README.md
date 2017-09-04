# angular-webapi
Este proyecto ha sido creado con Angular CLI y la versión Angular 4. Se recomienda el uso de Yarn para restaurar los paquetes del proyecto ya que congela la versión de estos (yarn install).<br><br>
Una vez compilado el typescript e iniciada la web SPA (ng serve), ingresar a la siguiente URL: http://localhost:4200/timelogtype <br><br>
Puede que el typescript arroje errores/warnings en el Visual Studio por un problema de compatibilidad, pero esto no impide que levante el SPA sin errores. <br><br>
Se utilizaron algunos componentes de terceros como el kendo-angular-grid de Kendo UI (http://www.telerik.com/kendo-angular-ui/) y algunos propios como el sidepanel.component (panel de visualzación de detalle al lado del grid) o notificationmessage.component (componente para mostrar mensajes de éxito/error). <br><br>
Los servicios se consumen a través de Web API en formato JSON. En esta capa se utilizó inyección de dependencias (Unity) para invocar la capa de Aplicación-Servicios. La URL de la Web API es: http://localhost:8060/ <br><br>
La capa de datos utiliza una base de datos SQLite con las acciones de crear y obtener funcionando. <br><br>
Los verbos para la prueba han sido de creación y listado (POST, GET); sin embargo, el cliente SPA está listo para implementar llamadas a verbos PUT y DELETE (data.service.ts) <br><br>
Se crearon tests para validar las capas de aplicación y datos. <br><br>
La solución corre en Visual Studio 2015, framework 4.5.2 <br>
