# Portafolio-de-titulo
La web solicitada está construida con una arquitectura de microservicios con una base de datos MySQL única. Los microservicios se comunican con HTTP Rest.
Hay 5 proyectos diferentes que son parte del sitio web:

PortafolioWeb: contiene la lógica principal que recibe y envía la información al orchestrator y luego despliega los templates.

Orchestrator: este servicio está entre medio de todas las apps que desarrollamos. 

Auth Microservice: maneja el inicio y registro de la aplicación. Almacena las contraseñas.

Restaurant Microservice: este microservicios gestiona las principales funcionalidades de los clientes. Reserva, órdenes y pagos. 

Admin Microservice: contiene toda la lógica del administrador. 
