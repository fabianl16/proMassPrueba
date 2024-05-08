<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

__Nota:__ *Se utilizo docker para correr la BD mediante un contenedor de imagen de mongo DB, ademas se utilizo MongoDB para la carga de datos*

# Backend en Nest prueba ProMass por Fabian Loaeza

1. Clonar el proyecto
2. Ejecutar npm para instalar librerias y dependencias

```
npm install
```
3. Clonar el archivo ``` .env.template ``` y renombrarlo a ``` .env ``` 
4. Cambiar las variables de entorno
5. Levantar la base de datos
```
docker-compose up -d
```
6. Levantar: ``` npm run start:dev ```
7. Registrar usuario
``` 
http://localhost:3000/auth/register
```

__Nota:__ *Todas las rutas necesitan el bearer token que se obtiene registrando o iniciando sesión en el login*

9. Ejecutar SEED para cargar productos aleatorios
 ``` 
 http://localhost:3000/product/seed
 ```
