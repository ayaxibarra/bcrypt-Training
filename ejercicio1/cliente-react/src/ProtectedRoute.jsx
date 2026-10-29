import { Navigate } from 'react-router-dom';

function ProtectedRoute({ currentUser, children }) {
    if (!currentUser) {
        // Si no hay usuario logueado, redirigir al login
        return <Navigate to="/login" replace />;
    }
    // Si existe, renderizar el contenido protegido (children)
    return children;
}

export default ProtectedRoute;