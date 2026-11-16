// En tu authController.js (durante el login)
const token = jwt.sign(
    { id: user._id, rol: user.rol }, // 👈 Incluimos el rol aquí
    process.env.JWT_SECRET,
    { expiresIn: '1d' }
);