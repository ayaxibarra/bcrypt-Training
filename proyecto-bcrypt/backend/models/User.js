const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  roles: {
    type: [String],
    enum: ['cliente', 'admin'],
    default: ['cliente'],
  },
}, {
  timestamps: true,
});

const User = mongoose.model('User', userSchema);
module.exports = User;