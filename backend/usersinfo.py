import bcrypt

# Contraseña en texto claro que deseas convertir en hash
password = "admin123@".encode('utf-8')
password1 = "Keneth16@".encode('utf-8')

# Genera el hash de la contraseña
hashed_password = bcrypt.hashpw(password, bcrypt.gensalt())
hashed_password1 = bcrypt.hashpw(password1, bcrypt.gensalt())

# Crea un registro de usuario administrador con el hash generado
usuario_admin = {
    "nombre": "Admin Keneth",
    "correo_electronico": "admin@gmail.com",
    "contrasena_hash": hashed_password.decode('utf-8'),  # Guarda el hash como cadena
    "rol": 1
}

usuario_comun = {
    "nombre": "Keneth Miranda Chaves",
    "correo_electronico": "kennethmiranda56@gmail.com",
    "contrasena_hash": hashed_password1.decode('utf-8'),  # Guarda el hash como cadena
    "rol": 2
}
# Agrega el registro del usuario administrador a la lista de usuarios
usuarios = [
    usuario_admin,
    usuario_comun,
]

# Imprime el JSON con el usuario administrador y otros usuarios
print(usuarios)
