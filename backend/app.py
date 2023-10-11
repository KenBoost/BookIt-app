from flask import Flask, jsonify
from pymongo import MongoClient
from bson import ObjectId
import bcrypt


#Conexion a la BD
app = Flask(__name__)

# Configuración de la base de datos MongoDB
client = MongoClient("mongodb://127.0.0.1:27017/")
db = client['libreria-bookit']



# Contraseña en texto claro que deseas convertir en hash
password = "admin123@".encode('utf-8')
password1 = "Keneth16@".encode('utf-8')

# Genera el hash de la contraseña
hashed_password = bcrypt.hashpw(password, bcrypt.gensalt())
hashed_password1 = bcrypt.hashpw(password1, bcrypt.gensalt())


@app.route('/')
def index():
    # Realiza la inserción en la colección de usuarios
    coleccion_usuarios = db["Usuarios"]
    usuarios_a_insertar = [
        {
        "nombre": "Admin Keneth",
        "correo_electronico": "admin@gmail.com",
        "contrasena_hash": hashed_password.decode('utf-8'),  # Guarda el hash como cadena
        "rol": 1
        },

        {
        "nombre": "Keneth Miranda Chaves",
        "correo_electronico": "kennethmiranda56@gmail.com",
        "contrasena_hash": hashed_password1.decode('utf-8'),  # Guarda el hash como cadena
        "rol": 2
        }
    ]
    coleccion_usuarios.insert_many(usuarios_a_insertar)

    return "Inserción completada"

if __name__ == '__main__':
    app.run()

