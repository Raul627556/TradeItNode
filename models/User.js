const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    // Información de usuario
    personalInfo: {
        name: { type: String, required: true },  // Nombre real
        email: { type: String, required: true, unique: true },
        age: { type: Number },
        country: { type: String },
        photo_src: { type: String },
        location: { type: String },
        zipcode: { type: String }
    },

    // Datos programáticos
    account: {
        username: { type: String, required: true, unique: true }, // Nombre de usuario
        passwordHash: { type: String, required: true }, // Contraseña encriptada
        last_login: { type: Date, default: Date.now },
        loginAttempts: { type: Number, default: 0 }, // Intentos fallidos de login
        lockUntil: { type: Date }, // Fecha de desbloqueo en caso de bloqueo

        // Tokens JWT activos
        tokens: [{ token: { type: String } }]
    },

    // Registro de actividad (historial de inicios de sesión)
    loginHistory: [{ 
        date: { type: Date, default: Date.now },
        ip: { type: String }
    }]
});

// Método para verificar si el usuario está bloqueado
UserSchema.methods.isLocked = function () {
    return this.account.lockUntil && this.account.lockUntil > Date.now();
};

module.exports = mongoose.model('User', UserSchema);
