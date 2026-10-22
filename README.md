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

## Como ejecutar el proyecto

1. Asegurate de tener Node.js instalado en tu computadora.
2. Abre una terminal en la carpeta raiz de tu proyecto (mi-ruta-api).
3. Si aun no tienes el archivo de configuracion, inicializa el proyecto de Node ejecutando:
   npm init -y
4. Abre el archivo package.json que se acaba de crear y agrega esta linea antes de las dependencias para permitir la sintaxis de modulos:
   "type": "module",
5. Ejecuta el archivo principal para ver los resultados de las pruebas CRUD en tu consola:
   node app.js

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