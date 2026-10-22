import * as rutas from './modules/rutas.js';
import * as unidades from './modules/unidades.js';
import * as paradas from './modules/paradas.js';
import * as horarios from './modules/horarios.js'; 

const nombreProyecto = "Mi Ruta App";
const materia = "Arquitectura de Aplicaciones Full Stack 1";
const equipo = "Equipo 2";

console.log("Proyecto: ", nombreProyecto);
console.log("Materia: ", materia);
console.log("Equipo: ", equipo);

// objeto basico de prueba
const rutaPrueba = {
    nombre : "Centro - Catalina",
    costo : 10,
    activa : true
}
console.log("\nRuta de prueba creada manualmente:");
console.log(rutaPrueba);


// PRUEBAS DEL MÓDULO RUTAS (Este tiene todo: callbacks, promesas y async/await)

// Crear nueva ruta normal
const nuevaRuta = rutas.crearRuta("Centro - Texcapa", 12, "Base Texcapa");
console.log("\nNueva ruta agregada");
console.log(nuevaRuta);

// Uso de callbacks
rutas.mostrarRutasCallback((datos) => {
    console.log("\nRutas recibidas con Callback (Espera 2 seg): ");
    console.log(datos);
});

// Uso de promesas
rutas.mostrarRutasPromesa()
    .then((datos) => {
        console.log("\nRutas recibidas con Promesa (Espera 2 seg):");
        console.log(datos);
    })
    .catch((error) => {
        console.error("Error al obtener rutas: ", error);
    });

// Uso de async/await
async function probarRutasAsync(){
    try {
        const datos = await rutas.mostrarRutasAsync();
        console.log("\nFunción Async/Await ejecutada exitosamente para rutas");
        console.log(datos);
    }
    catch (error) {
        console.log('Error: ', error);
    }
}
probarRutasAsync();

// Buscar ruta por Id normal
console.log('\nBuscar ruta por ID (ID: 1)');
console.log(rutas.buscarRutaId(1));

// Actualizar ruta agregada
console.log('\nActualizar Ruta');
const rutaActualizada = rutas.actualizarRuta(nuevaRuta.id, { costo: 15 });
console.log(rutaActualizada);

// Desactivar ruta
console.log('\nDesactivar Ruta');
rutas.desactivarRuta(nuevaRuta.id);
console.log(`Ruta con ID ${nuevaRuta.id} desactivada exitosamente.`);

// Eliminar ruta
console.log('\nEliminar Ruta');
const rutaEliminada = rutas.eliminarRuta(nuevaRuta.id);
console.log('Ruta eliminada de la memoria:', rutaEliminada);


// PRUEBAS DE LOS DEMÁS MÓDULOS

// usamos una funcion asincrona para probar los demas
(async () => {
    try {
        console.log("\n--- Pruebas de Unidades ---");
        // creamos una unidad y simulamos que tarda un poco
        const unidadNueva = await unidades.crearUnidadAsync("05", "123-ABC", "Toyota");
        console.log("Unidad creada con Async/Await:", unidadNueva);

        console.log("\n--- Pruebas de Paradas ---");
        const paradaNueva = await paradas.crearParadaAsync("Mercado Municipal", "Frente a la farmacia");
        console.log("Parada creada con Async/Await:", paradaNueva);

    } catch (error) {
        console.error("Ocurrio un error en los modulos:", error.message);
    }
})();