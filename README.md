# Prueba Widitrade

Esta es una aplicación de prueba para Widitrade, que incluye un backend desarrollado en Laravel y un frontend en Angular. La aplicación se despliega utilizando Docker, y se ha configurado con autenticación JWT y validación de captcha. El backend maneja la lógica de contenidos y reacciones, mientras que el frontend muestra la información de los contenidos y permite la interacción del usuario.

## Estructura del Proyecto

- **server/**: Contiene el código del backend en Laravel.
- **src/**: Contiene el código del frontend en Angular.
- **docker/**: Contiene los archivos Docker para los diferentes servicios (PHP, Node, Nginx, MySQL, etc.).
- **Makefile**: Contiene los comandos para gestionar el ciclo de vida de los contenedores Docker.
- **package.json**: Archivo de configuración de npm para gestionar las dependencias del proyecto frontend.
- **server/composer.json**: Archivo de configuración de Composer para gestionar las dependencias del proyecto backend.

## Endpoints del proyecto

- **FrontEnd:**: `http://localhost:4201/`
- **Backend:**: `http://localhost:86/`

## Prerrequisitos

- Docker y Docker Compose instalados.
- Node.js y npm instalados.
- Composer instalado.

## Comandos para Levantar el Proyecto

### Paso 1: Instalar dependencias de npm

Antes de levantar los contenedores, es necesario instalar las dependencias del frontend.

```bash
npm install
```

### Paso 2: Crear la red de Docker
Crear la red de Docker necesaria para la comunicación entre los contenedores.

``` bash
make network-create
```
### Paso 3: Levantar los contenedores
Levantar los contenedores Docker definidos en docker-compose.yml.

``` bash
make init
```
### Paso 4: Instalar dependencias de Composer
Entrar en el contenedor de PHP y ejecutar la instalación de dependencias de Composer.

``` bash
make php-shell
composer install
exit
``` 
### Paso 5: Crear archivo .env
Copia el archivo `server/.env.example` y crea el archivo `server/.env` luego entra al contenedor y genera el `APP_KEY`

``` bash
make php-shell
php artisan key:generate
exit
``` 
luego copia el valor de `APP_KEY` en el archivo `server/.env` en la variable `salt` en el archivo `src/enviroments/environment.ts`.
esto es necesario para que el frontend pueda comunicarse de manera segura con el frontend, si las variables `salt` y `APP_KEY` no son iguales, habra errores de seguridad en las consultas que se hagan desde el frontend.
puedes generar el valor de tu variable `JWT_SECRET` para que todo funcione bien, puedes usar esta pagina web para generarlo `https://www.javainuse.com/jwtgenerator#google_vignette`

### Paso 6: Correr migraciones y data dummie
Lo siguiente es correr las migracions y los seeders desde dentro del contenedor de php

``` bash
make php-shell
php artisan migrate
php artisan db:seed
exit
``` 
con esto la data dummie deberia estar ya cargada en la base de datos, puedes revisar estoy en phpMyAdmin `http://localhost:8081/` 

## Usuarios Disponibles

A continuación se presenta una lista de usuarios de prueba disponibles, junto con sus roles. Estos usuarios se crean automáticamente con los seeders proporcionados.

### Administrador
- **Username:** admin
- **Email:** admin@prueba_widitrade.com
- **Password:** admin
- **Rol:** Administrador

### Creador de Contenido
- **Username:** creator
- **Email:** creator@prueba_widitrade.com
- **Password:** creator
- **Rol:** Creador de Contenido

### Cliente
- **Username:** cliente
- **Email:** cliente@prueba_widitrade.com
- **Password:** cliente
- **Rol:** Cliente

Estos usuarios pueden utilizarse para probar las funcionalidades del sistema con diferentes niveles de acceso y permisos.

## Otros Comandos Útiles

### Detener los contenedores:
Detiene todos los contenedores de Docker definidos en `docker-compose.yml`.

```bash
make stop
```

### Reconstruir los contenedores:
Reconstruye y recrea todos los contenedores, aplicando cualquier cambio en los Dockerfiles.

```bash
make rebuild
```

### Reiniciar el contenedor de Node:
Detiene y luego inicia el contenedor de Node para aplicar cambios o reiniciar el entorno.

```bash
make node-restart
```

### Acceder al shell del contenedor de Nginx:
Abre una sesión de shell dentro del contenedor de Nginx.

```bash
make nginx-shell
```

### Acceder al shell del contenedor de PHP:
Abre una sesión de shell dentro del contenedor de PHP.

```bash
make php-shell
```

### Acceder al shell del contenedor de Node:
Abre una sesión de shell dentro del contenedor de Node.

```bash
make node-shell
```

### Acceder al shell del contenedor de MySQL:
Abre una sesión de shell dentro del contenedor de MySQL para ejecutar comandos de base de datos.

```bash
make db-shell
```

## Configuración Adicional
### Configuración de Redis y Mailhog
Asegúrate de que las siguientes variables de entorno están configuradas correctamente en tu archivo .env para que Redis y Mailhog funcionen correctamente:

```env
REDIS_HOST=172.82.0.6
REDIS_PASSWORD=null
REDIS_PORT=6379

MAIL_DRIVER=smtp
MAIL_PORT=1025
MAIL_ENCRYPTION=null
MAIL_HOST=172.82.0.8
MAIL_USERNAME=null
MAIL_PASSWORD=null
```

## Configuración de Captcha
Configura las siguientes variables de entorno para la validación del captcha:

```env
CAPTCHA_SECRET=your-captcha-secret-key
CAPTCHA_URL=https://www.google.com/recaptcha/api/siteverify
```
Asegúrate de reemplazar your-captcha-secret-key con tu clave secreta de Captcha real.

## Descripción de la Prueba
La prueba consiste en desarrollar una aplicación completa que permita la gestión y visualización de contenidos y reacciones. La aplicación incluye funcionalidades de autenticación, validación de captcha, y permite a los usuarios agregar, visualizar, y reaccionar a diferentes contenidos. El sistema está diseñado para ser desplegado utilizando Docker, lo que facilita su configuración y despliegue en diferentes entornos.
### Características Principales
- **Autenticación JWT**: Seguridad en las rutas y recursos del backend.
- **Validación de Captcha**: Protección contra bots en formularios.
- **CRUD de Contenidos**: Creación, lectura, actualización y eliminación de contenidos.
- **Reacciones a Contenidos**: Comentarios, favoritos y calificaciones.
- **Gestión de Archivos**: Subida y almacenamiento de archivos en LocalStack simulando S3.
- **Frontend en Angular**: Interfaz de usuario moderna y reactiva.

### Endpoints del API

A continuación, se describen los principales endpoints disponibles en el API del backend:

#### /api/content:
- `POST /api/content`: Crear un nuevo contenido.
- `GET /api/content`: Obtener todos los contenidos.
- `GET /api/content/{id}`: Obtener un contenido específico.
- `PUT /api/content/{id}`: Actualizar un contenido.
- `DELETE /api/content/{id}`: Eliminar un contenido.

#### /api/content/{content_id}/comment:
- `POST /api/content/{content_id}/comment`: Agregar un comentario a un contenido.
- `GET /api/content/{content_id}/comment`: Obtener los comentarios de un contenido.
- `DELETE /api/comment/{id}`: Eliminar un comentario.

#### /api/content/{content_id}/favorite:
- `POST /api/content/{content_id}/favorite`: Agregar un contenido a favoritos.
- `GET /api/favorites`: Obtener los contenidos favoritos del usuario autenticado.

#### /api/content/{content_id}/rating:
- `POST /api/content/{content_id}/rating`: Agregar una calificación a un contenido.
- `GET /api/ratings`: Obtener las calificaciones del usuario autenticado.

#### /api/landing:
- `POST /api/landing`: Crear una nueva landing.
- `GET /api/landings`: Obtener todas las landings.
- `GET /api/landing/{id}`: Obtener una landing específica.
- `GET /api/landing/{id}/products`: Obtener los productos de una landing.
- `PUT /api/landing/{id}`: Actualizar una landing.
- `DELETE /api/landing/{id}`: Eliminar una landing.

#### /api/products/import:
- `POST /api/products/import`: Importar productos desde un archivo JSON.

#### /api/file/upload:
- `POST /api/file/upload`: Subir un archivo.
- `POST /api/file/save`: Guardar la información del archivo en la base de datos.
- `GET /api/files`: Obtener todos los archivos.
- `GET /api/file/{id}`: Obtener un archivo específico.
- `DELETE /api/file/{id}`: Eliminar un archivo.

### Contribuciones

Las contribuciones al proyecto son bienvenidas. Por favor, crea un fork del repositorio y envía un pull request con tus cambios. Asegúrate de seguir las mejores prácticas de desarrollo y de documentar adecuadamente tus modificaciones.
