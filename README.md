### Entity: User
+ Name: String
+ Last Name: String
+ Cellphone: String Unique
+ Email: String Unique
+ Password: String
+ Activation Token
+ Verified At: Date

### Endpoints
Registro de usuario  /api/v1/users
activación de usuario https://:domain/api/v1/users/:token/activate (método PUT)

### Funciones
1. REGISTRO DE USUARIOS
2. ENVIO DE CORREO ELECTRONICO
3. ACTIVACIÓN DE CUENTA
4. Logout:  Si el usuario no esta logeado no se podrá cerrar sesión (validación de rutas)
5. JWT implementado 
6. Busca actualizacion atravez de la fecha de verificación
7. Repositorios MySQL y Mongo implementados

### Desarrolladores:
+ Fernando Daniel Perez Perez
+ Leonardo Javier Cancino Montoya
+ Yadira Guadalupe Cortez Fuentes
