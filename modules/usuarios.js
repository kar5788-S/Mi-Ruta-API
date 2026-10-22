// arreglo simulando la base de datos de los usuarios del sistema
const usuarios = [
  { id: 1, nombre: "Karol Salvador", correo: "karol@miruta.com", rol: "administrador", activo: true },
  { id: 2, nombre: "Lesly Lora", correo: "lesly@miruta.com", rol: "administrador", activo: true },
  { id: 3, nombre: "Pasajero Frecuente", correo: "pasajero@gmail.com", rol: "usuario", activo: true }
];

// crear un nuevo usuario
async function crearUsuarioAsync(nombre, correo, rol) {
  const nuevoId = usuarios.length > 0 ? Math.max(...usuarios.map((u) => u.id)) + 1 : 1;

  const nuevoUsuario = {
    id: nuevoId,
    nombre,
    correo,
    rol,
    activo: true
  };

  usuarios.push(nuevoUsuario);
  return nuevoUsuario;
}

// mostrar todos los usuarios
async function mostrarUsuariosAsync() {
  return usuarios;
}

// buscar usuario por su id
async function buscarUsuarioAsync(id) {
  const usuario = usuarios.find((u) => u.id === id);

  if (!usuario) {
    throw new Error("Usuario no encontrado");
  }
  
  return usuario;
}

// actualizar datos de un usuario (ej. cambio de correo o contraseña)
async function actualizarUsuarioAsync(id, datos) {
  const indice = usuarios.findIndex((u) => u.id === id);

  if (indice === -1) {
    throw new Error("No se pudo actualizar, el usuario no existe");
  }

  usuarios[indice] = {
    ...usuarios[indice],
    ...datos,
    id: usuarios[indice].id 
  };

  return usuarios[indice];
}

// suspender o bloquear a un usuario temporalmente
async function desactivarUsuarioAsync(id) {
  const indice = usuarios.findIndex((u) => u.id === id);

  if (indice === -1) {
    throw new Error("No se pudo desactivar, el usuario no existe");
  }

  usuarios[indice].activo = false;
  return true;
}

// eliminar el usuario de la memoria
async function eliminarUsuarioAsync(id) {
  const indice = usuarios.findIndex((u) => u.id === id);

  if (indice === -1) {
    throw new Error("No se pudo eliminar, el usuario no existe");
  }

  const eliminado = usuarios.splice(indice, 1);
  return eliminado[0];
}

export {
  crearUsuarioAsync,
  mostrarUsuariosAsync,
  buscarUsuarioAsync,
  actualizarUsuarioAsync,
  desactivarUsuarioAsync,
  eliminarUsuarioAsync
};