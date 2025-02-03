import mongoose from 'mongoose'

// Creacion de la coleccion para la base de datos

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true
    },
    password: {
      type: String,
      required: true,
      unique: true
    },
    email: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
)

export default mongoose.model('User', UserSchema) // Cracion del modelo con el cual podemos hacer
// De sus metodos de escema creado
