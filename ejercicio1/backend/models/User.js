// models/User.js (ejemplo)
const userSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    rol: { 
        type: String, 
        enum: ['cliente', 'admin'], 
        default: 'cliente' 
    }
});