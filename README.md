# Mi Ruta App - API REST (Modulos Base)

Este proyecto contiene la estructura base y los modulos de backend para la reactivacion del sistema "Mi Ruta App", cuyo objetivo es centralizar la gestion de rutas, horarios y unidades del transporte publico en Huauchinango y sus alrededores.

El codigo fue desarrollado como parte de la evaluacion de la asignatura de Arquitectura de Aplicaciones Full Stack 1.

## Estructura del Proyecto

El codigo esta organizado bajo un enfoque modular, separando la logica de negocio de cada entidad del sistema para facilitar su escalabilidad futura:

mi-ruta-api/
├── package.json         # Configuracion del proyecto (ES Modules)
├── app.js               # Archivo principal y orquestador de pruebas
└── modules/
    ├── rutas.js         # Modulo Maestro (Callbacks, Promesas, Async/Await)
    ├── unidades.js      # CRUD con Async/Await
    ├── paradas.js       # CRUD con Async/Await
    ├── horarios.js      # CRUD con Async/Await
    ├── usuarios.js      # CRUD con Async/Await
    └── reportes.js      # CRUD con Async/Await

## Tecnologias y Conceptos Aplicados

* Node.js: Entorno de ejecucion para el servidor backend asincrono.
* ES Modules (import/export): Arquitectura modular habilitada mediante "type": "module" en la configuracion del proyecto.
* Gestion de Asincronia: 
    * El modulo principal (rutas.js) demuestra el dominio de las diferentes tecnicas vistas en la unidad: Callbacks, Promesas y Async/Await.
    * Los modulos secundarios estan optimizados utilizando exclusivamente Async/Await y manejo de errores con try...catch, estableciendo el estandar moderno recomendado para la futura integracion con bases de datos NoSQL como MongoDB.

## Como ejecutar la API

1. Asegurate de tener Node.js instalado y abre una terminal en la carpeta raiz del proyecto.
2. Instala las dependencias:
   `npm install`
3. Inicia el servidor en modo desarrollo (se reinicia al cambiar archivos):
   `npm run dev`
4. Para iniciar el servidor sin modo observacion:
   `npm start`

Por defecto, la API escucha en `http://localhost:3001`. Puedes configurar el puerto
con la variable de entorno `PORT` y el host con `HOST`.

## Equipo 2 - Desarrolladores

* Rocio Castillo Jimenez
* Lesly Lora Rivera
* Itzel Lazcano Vergara
* Monica Itzel Oliver Ponce
* Karol Salvador Rodriguez Gonzalez
* Luis Antonio Santos Jolalpa
* Noemi Tolentino Cabrera

Instituto Tecnologico Superior de Huauchinango
Ingenieria en Sistemas Computacionales