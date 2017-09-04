# angular-webapi
Este proyecto ha sido creado con Angular CLI y la versión Angular 4. Se recomienda el uso de Yarn para restaurar los paquetes del proyecto ya que congela la versión de estos (yarn install).
Una vez compilado el typescript e iniciada la web SPA (ng serve), ingresar a la siguiente URL: http://localhost:4200/timelogtype
Puede que el typescript arroje errores/warnings en el Visual Studio por un problema de compatibilidad, pero esto no impide que levante el SPA sin erores.
Los servicios se consumen a través de Web API en formato JSON. En esta capa se utilizó inyección de dependencias (Unity) para invocar la capa de Aplicación-Servicios. La URL de la Web API es: http://localhost:8060/
La capa de datos utiliza una base de datos SQLite con las acciones de crear y obtener funcionando.
Los verbos para la prueba han sido de creación y listado (POST, GET); sin embargo, el cliente SPA está listo para implementar llamadas a verbos PUT y DELETE (data.service.ts)
Se crearon tests para validar las capas de aplicación y datos.
La solución corre en Visual Studio 2015, framework 4.5.2
