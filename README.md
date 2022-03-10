# Delilah Resto 

>API para gestion de pedidos.

Proyecto del segundo Sprint del curso de Desarrollo Web Back End de Acamica

## Tecnologias y dependencias utilizadas:

- Node.js - v14.17.3
- Chai - v4.3.4
- Cors - v2.8.5
- Dotenv - v10.0.0
- Express - v4.17.1
- Helmet - v4.6.0
- Js-sha256 - v0.9.0
- Jsonwebtoken - v8.5.1
- Mariadb - v2.5.4
- Mocha - v9.1.3
- Moment - v2.29.1
- Nodemon - v2.0.12
- Redis - v3.1.2
- Sequelize - v6.6.5
- Supertest - v6.1.6
- Postman para el manejo de endpoints
- Swagger para la documentacion
- DBeaver para el manejo de la la base de datos

El proyecto consiste en generar la arquitectura back end de una app de pedidos de comida, donde se puedan manipular los distintos endpoints para obtener y enviar determinada infromacion

# Documentación


En el archivo doc.yaml se encuentra la documentacion de la API. Recomiendo importar los datos a Swagger para poder acceder a los distintos metodos y endpoints

# Instalacion del proyecto

### Requisitos previos
- Tener instalado MySQL
- Revisar que este configurado en el puerto 3306
- Crear una base de datos llamada "sprintproject"

## 1) Clonar el repositorio del proyecto desde gitlab

En este [__link__ ](https://gitlab.com/erdini.dylan/delilah-resto)se encuentra el repositorio del proyecto para que lo pueda clonar

Utilizando lo siguiente en la terminal:

```bash 
    git clone https://gitlab.com/erdini.dylan/delilah-resto.git

```
## 2) Instalar dependencias

```bash
    npm i
```

## 3) Configuracion de variables de entorno
Crear un archivo en el directorio raiz del proyecto con extension __.env__ con las siguientes variables:
```
    NODE_PORT
    DB_HOST
    DB_USER
    DB_PASSWORD
    DB_PORT
    DB_NAME
    SECRETKEY
    REDIS_HOST
    REDIS_PORT
```


## 4) Iniciar el servidor

Para poder iniciar el servidor debe ubicarse en la raiz del repositorio y ejecutar el siguiente comando desde node:

```bash
    node index.js
```
