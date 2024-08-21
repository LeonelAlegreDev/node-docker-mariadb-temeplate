# Documentación del Proyecto

Este proyecto es una aplicación web desarrollada con Node.js y Express, utilizando MariaDB como sistema de gestión de bases de datos. La aplicación está diseñada para ser ejecutada en contenedores Docker, facilitando así su despliegue y escalabilidad.

## Estructura de Directorios

La estructura de directorios del proyecto se organiza de la siguiente manera:

- app.js: Archivo principal de la aplicación que configura el servidor Express.
- docker-compose.yml: Archivo de Docker Compose para definir y ejecutar los servicios de la aplicación.
- .env: Archivo para almacenar variables de entorno utilizadas por la aplicación y los contenedores Docker.
- utils/: Directorio para funciones de utilidad que pueden ser usadas en toda la aplicación.
- tests/: Directorio que contiene los tests de la aplicación, organizados por módulos.
- routes/: Directorio para los archivos de rutas de Express, que definen los endpoints de la API.
- models/: Directorio para los modelos de datos, que representan la estructura de las tablas de la base de datos y la lógica de negocio.
- middlewares/: Directorio para los middlewares de Express, que pueden procesar las solicitudes antes de llegar a las rutas.
- db/: Directorio que contiene scripts de configuración de la base de datos, como esquemas y migraciones.
- controllers/: Directorio para los controladores que manejan la lógica de negocio para cada ruta.
- config/: Directorio para archivos de configuración de la aplicación, como la configuración de la base de datos.

## Configuración y Uso

### Prerrequisitos

- Docker y Docker Compose instalados en tu sistema.
- Node.js y npm instalados para desarrollo local y pruebas.

### Configuración

1. Variables de Entorno: Configura las variables de entorno necesarias en el archivo .env. Esto incluye configuraciones para la base de datos y el servidor.

2. Docker Compose: El archivo docker-compose.yml define los servicios necesarios para la aplicación, incluyendo la base de datos MariaDB. 

### Ejecución

Para iniciar la aplicación y la base de datos, ejecuta el siguiente comando en el directorio raíz del proyecto:

```bash
docker-compose up
```

Este comando construirá las imágenes de Docker si es necesario, y luego iniciará los contenedores definidos en `docker-compose.yml`.

## Comprobar conexion a la base de datos
1. Acceder al contenedor de MariaDB: Primero, necesitas acceder al contenedor de Docker que está ejecutando MariaDB. Utiliza el siguiente comando en la terminal:

```bash
docker exec -it node-docker-mariadb-temeplate-mariadb-1 bash
```

Este comando te dará acceso a la línea de comandos dentro del contenedor node-docker-mariadb-temeplate-mariadb-1.

2. Conectarse a la base de datos MariaDB: Una vez dentro del contenedor, puedes conectarte a la base de datos MariaDB utilizando el cliente de línea de comandos de MariaDB. Ejecuta el siguiente comando:

```bash
mariadb -u root -p
```

## Inicializar Aplicacion
1. Primero es necesario instalar las dependencias de la aplicacion:

```bash
npm i
```

2. Luego hay que crear un par de llaves, una publica y otra privada con los nombres id_rsa_pub.pem y id_rsa_priv.pem, respectivamente y se almacenan en el directorio config:

```bash
npm run genpwd
```

Sin este par de llaves la aplicacion no podra procesar las peticiones que requieran de autorizacion o validacion de identidad.

3. Para ejecutar la aplicacion de backend tenemos varias opciones.

El siguiente comando ejecuta la aplicacion en modo de desarrollo usando nodemon:

```bash
npm run dev
```

El siguiente comando ejecuta la aplicacion en modo de produccion usando pm2:

```bash
npm run prod
```