
from flask import Flask, jsonify, request
from pymongo import MongoClient, errors
from bson import ObjectId
from flask_cors import CORS

import bcrypt

#Conexion a la BD
app = Flask(__name__)

# Configuración de la base de datos MongoDB
client = MongoClient("mongodb://127.0.0.1:27017/")
db = client['libreria-bookit']

#Login------------------------------------------------------------------------------
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    correo = data.get('correo_electronico')
    contrasena = data.get('contrasena').encode('utf-8')
   
    usuario = db.Usuarios.find_one({"correo_electronico": correo})
    if usuario:
        contrasena_hash = usuario.get('contrasena_hash', '')  # Contraseña hasheada almacenada en la base de datos
    
        if bcrypt.checkpw(contrasena, contrasena_hash.encode('utf-8')):
           
            del usuario['contrasena_hash']
            usuario['_id'] = str(usuario['_id'])
            return jsonify(usuario), 200  # 200 significa "OK"
        else:
            return "Contraseña incorrecta", 401  # 401 significa "No autorizado"
    else:
        return "Usuario no encontrado", 404  # 404 significa "No encontrado"

## ----------------------------------------------------------------------------------
## USUARIOS -------------------------------------------------------------------------
##-----------------------------------------------------------------------------------

# Crear un usuario
@app.route('/crear_usuario', methods=['POST'])
def crear_usuario():
    try:
        data = request.json  # Se espera un JSON con los datos del usuario

        # Asegúrate de tener una copia del JSON original antes de eliminar la contraseña normal
        data_original = data.copy()

        # Elimina la contraseña normal del JSON
        del data['contrasena']

        password = data_original['contrasena']  # Obtén la contraseña del JSON original

        # Encripta la contraseña
        salt = bcrypt.gensalt()
        hashed_password = bcrypt.hashpw(password.encode('utf-8'), salt).decode('utf-8')
        data['contrasena_hash'] = hashed_password  # Reemplaza la contraseña en el JSON
        
        data['rol'] = 2  # Configurar manualmente el rol como 2
        result = db.Usuarios.insert_one(data)
        return "Usuario creado con ID: " + str(result.inserted_id), 201  # 201 significa "Creado"
    except Exception as e:
        return str(e), 400  # 400 significa "Solicitud incorrecta"


# Obtener un usuario por ID
@app.route('/obtener_usuario/<id>', methods=['GET'])
def obtener_usuario(id):
    usuario = db.Usuarios.find_one({"_id": id})
    if usuario:
        # Desencriptar la contraseña
        usuario['contrasena_hash'] = bcrypt.checkpw(
            usuario['contrasena_hash'].encode('utf-8'),  # Contraseña hasheada almacenada en la base de datos
            bcrypt.gensalt()  # Genera un salt para verificar la contraseña
        )
        return jsonify(usuario), 200  # 200 significa "OK"
    else:
        return "Usuario no encontrado", 404  # 404 significa "No encontrado"

# Actualizar un usuario por ID
@app.route('/actualizar_usuario/<id>', methods=['PUT'])
def actualizar_usuario(id):
    try:
        data = request.json  # Se espera un JSON con los datos actualizados del usuario
        
        # Obtén la contraseña nueva del JSON
        new_password = data['contrasena']
        
        # Encripta la nueva contraseña
        hashed_password = bcrypt.hashpw(new_password.encode('utf-8'), bcrypt.gensalt())
        data['contrasena'] = hashed_password  # Reemplaza la contraseña en el JSON
        
        result = db.Usuarios.update_one({"_id": id}, {"$set": data})
        if result.modified_count > 0:
            return "Usuario actualizado", 200  # 200 significa "OK"
        else:
            return "Usuario no encontrado", 404  # 404 significa "No encontrado"
    except Exception as e:
        return str(e), 400  # 400 significa "Solicitud incorrecta"


# Borrar un usuario por ID
@app.route('/borrar_usuario/<id>', methods=['DELETE'])
def borrar_usuario(id):
    result = db.Usuarios.delete_one({"_id": id})
    if result.deleted_count > 0:
        return "Usuario borrado", 200  # 200 significa "OK"
    else:
        return "Usuario no encontrado", 404  # 404 significa "No encontrado"

##-----------------------------------------------------------------------------------
## LIBROS----------------------------------------------------------------------------
##-----------------------------------------------------------------------------------

# Obtener todos los libros
@app.route('/obtener_libros', methods=['GET'])
def obtener_libros():
    libros = list(db.Libros.find({}))  # Encuentra todos los documentos en la colección de libros
    total_libros = len(libros)
    
    # Convertir objetos BSON a diccionarios
    libros_serializables = []
    for libro in libros:
        libro_serializable = {
            "_id": str(libro["_id"]),  # Convertir el ObjectId a una cadena
            "titulo": libro["titulo"],
            "autor": libro["autor"],
            "genero": libro["genero"],
            "ano_publicacion": libro["ano_publicacion"],
            "estado": libro["estado"]
        }
        libros_serializables.append(libro_serializable)
    
    return jsonify(libros_serializables), 200  # Devuelve el objeto JSON con el total y la lista de libros serializables

@app.route('/libros_disponibles', methods=['GET'])
def obtener_libros_disponibles():
    libros_disponibles = list(db.Libros.find({"estado": "disponible"}))

    # Convertir objetos BSON a diccionarios
    libros_serializables = []
    for libro in libros_disponibles:
        libro_serializable = {
            "_id": str(libro["_id"]),  # Convertir el ObjectId a una cadena
            "titulo": libro["titulo"],
            "autor": libro["autor"],
            "genero": libro["genero"],
            "ano_publicacion": libro["ano_publicacion"],
            "estado": libro["estado"]
        }
        libros_serializables.append(libro_serializable)

    if libros_disponibles:
        return jsonify(libros_serializables), 200  # Devuelve la lista de libros serializables
    else:
        return "No se encontraron libros disponibles", 404  # 404 significa "No encontrado"


# Crear un libro
@app.route('/crear_libro', methods=['POST'])
def crear_libro():
    try:
        data = request.json  # Se espera un JSON con los datos del libro
        data['estado'] = "disponible" # Configurar manualmente el rol como 2
        result = db.Libros.insert_one(data)
        return "Libro creado con ID: " + str(result.inserted_id), 201  # 201 significa "Creado"
    except Exception as e:
        return str(e), 400  # 400 significa "Solicitud incorrecta"


# Obtener un libro por ID
@app.route('/obtener_libro/<id>', methods=['GET'])
def obtener_libro(id):
    try:
        libro = db.Libros.find_one({"_id": ObjectId(id)})  # Convierte el ID de cadena a ObjectId
        if libro:
            # Convierte el ObjectId a una cadena antes de incluirlo en la respuesta JSON
            libro["_id"] = str(libro["_id"])
            return jsonify(libro), 200  # 200 significa "OK"
        else:
            return "Libro no encontrado", 404  # 404 significa "No encontrado"
    except Exception as e:
        return str(e), 400  # 400 significa "Solicitud incorrecta"


# Actualizar un libro por ID
@app.route('/actualizar_libro/<id>', methods=['PUT'])
def actualizar_libro(id):
    try:
        data = request.json  # Se espera un JSON con los datos actualizados del libro
        
        # Convierte el ID de cadena a ObjectId
        object_id = ObjectId(id)
        
        # Intenta actualizar el libro con el ID proporcionado
        result = db.Libros.update_one({"_id": object_id}, {"$set": data})
        
        if result.modified_count > 0:
            return "Libro actualizado", 200  # 200 significa "OK"
        else:
            return "Libro no encontrado", 404  # 404 significa "No encontrado"
    except Exception as e:
        return str(e), 400  # 400 significa "Solicitud incorrecta"



# Borrar un libro por ID
@app.route('/borrar_libro/<id>', methods=['DELETE'])
def borrar_libro(id):
    try:
        # Convierte el ID de cadena a ObjectId
        object_id = ObjectId(id)
        
        # Intenta borrar el libro con el ID proporcionado
        result = db.Libros.delete_one({"_id": object_id})
        
        if result.deleted_count > 0:
            return "Libro borrado", 200  # 200 significa "OK"
        else:
            return "Libro no encontrado", 404  # 404 significa "No encontrado"
    except Exception as e:
        return str(e), 400  # 400 significa "Solicitud incorrecta"



##-----------------------------------------------------------------------------------
## RESERVAS----------------------------------------------------------------------------
##-----------------------------------------------------------------------------------

# Crear una reserva
@app.route('/crear_reserva', methods=['POST'])
def crear_reserva():
 
    try:
        data = request.json  # Se espera un JSON con los datos de la reserva
        data['estado'] = "activa"
        # Inserta la reserva en la base de datos
        result = db.Reservas.insert_one(data)

        # Verifica si la inserción de la reserva fue exitosa
        if result.inserted_id:
            # Obten el ID del libro desde los datos de la reserva
            id_libro = data.get("id_libro")

            # Convierte el ID del libro de cadena a ObjectId
            object_id_libro = ObjectId(id_libro)

            # Actualiza el estado del libro a "reservado"
            result_libro = db.Libros.update_one({"_id": object_id_libro}, {"$set": {"estado": "reservado"}})

            # Verifica si la actualización del estado del libro fue exitosa
            if result_libro.modified_count > 0:
                return {"success": True, "message": "Reserva creada con ID: " + str(result.inserted_id)}, 201
            else:
                return "Libro no encontrado", 404  # 404 significa "No encontrado"
        else:
            return "Reserva no creada", 400  # 400 significa "Solicitud incorrecta"
    except Exception as e:
        return str(e), 400  # 400 significa "Solicitud incorrecta"


# Obtener una reserva por ID usuario
@app.route('/obtener_reservas/<id_usuario>', methods=['GET'])
def obtener_reservas(id_usuario):
    reservas = list(db.Reservas.find({"id_usuario": id_usuario}))

    # Obtener información del libro para cada reserva y convertir los ObjectId a cadenas
    reservas_con_info_libro = []
    for reserva in reservas:
        id_libro = reserva.get("id_libro")
        libro = db.Libros.find_one({"_id": ObjectId(id_libro)})
        if libro:
            reserva["libro_info"] = {
                "_id": str(libro["_id"]),  # Convertir el ObjectId a una cadena
                "titulo": libro["titulo"],
                "autor": libro["autor"],
                "genero": libro["genero"],
                "ano_publicacion": libro["ano_publicacion"],
                "estado": libro["estado"]
            }
            reserva["id_libro"] = str(id_libro)
            reserva["_id"] = str(reserva["_id"])  # Convertir el ObjectId de la reserva a una cadena
            reservas_con_info_libro.append(reserva)

    if reservas_con_info_libro:
        return jsonify(reservas_con_info_libro), 200
    else:
        return "No se encontraron reservas para el usuario", 404

# Actualizar una reserva por ID
@app.route('/actualizar_reserva/<id>', methods=['PUT'])
def actualizar_reserva(id):
    try:
        data = request.json  # Se espera un JSON con los datos actualizados de la reserva
        result = db.Reservas.update_one({"_id": id}, {"$set": data})
        if result.modified_count > 0:
            return "Reserva actualizada", 200  # 200 significa "OK"
        else:
            return "Reserva no encontrada", 404  # 404 significa "No encontrada"
    except Exception as e:
        return str(e), 400  # 400 significa "Solicitud incorrecta"

@app.route('/actualizar_estado/<id>/<nuevo_estado>', methods=['PUT'])
def actualizar_estado(id, nuevo_estado):
    try:
        # Asegúrate de validar que el nuevo_estado sea un valor permitido
        # para evitar posibles ataques o cambios no deseados.
        # Puedes utilizar una lista de estados permitidos.
        estados_permitidos = ["activo", "cancelada", "finalizada"]  # Corregí "activa" a "activo" para que coincida con las opciones permitidas.

        if nuevo_estado not in estados_permitidos:
            return "Estado no válido", 400

        # Convierte la cadena id en un ObjectId válido
        object_id = ObjectId(id)

        result = db.Reservas.update_one({"_id": object_id}, {"$set": {"estado": nuevo_estado}})
        if result.modified_count > 0:
            if nuevo_estado == "cancelada" or nuevo_estado == "finalizada":
                reserva = db.Reservas.find_one({"_id": object_id})
                if reserva:
                    id_libro = reserva.get("id_libro")
                    if id_libro:
                        # Actualiza el estado del libro a "disponible"
                        db.Libros.update_one({"_id": ObjectId(id_libro)}, {"$set": {"estado": "disponible"}})
            
            return "Reserva actualizada", 200  # 200 significa "OK"
        else:
            return "Reserva no encontrada", 404  # 404 significa "No encontrada"
    except Exception as e:
        return str(e), 400  # 400 significa "Solicitud incorrecta"





# Borrar una reserva por ID
@app.route('/borrar_reserva/<id>', methods=['DELETE'])
def borrar_reserva(id):
    result = db.Reservas.delete_one({"_id": id})
    if result.deleted_count > 0:
        return "Reserva borrada", 200  # 200 significa "OK"
    else:
        return "Reserva no encontrada", 404  # 404 significa "No encontrada"

#-----------------------------------------------------------------------
#CROSS ORIGINS-----------------------------------------------------------
cors = CORS(app, resources={r"*": {"origins": "http://localhost:3000"}})


#------------------------------------------------------------------------
#Correr la app-----------------------------------------------------------

if __name__ == '__main__':
    app.run(debug=True)
