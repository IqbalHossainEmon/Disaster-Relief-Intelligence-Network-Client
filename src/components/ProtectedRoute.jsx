import { Navigate } from 'react-router-dom';
import { authService } from '../services';

const ProtectedRoute = ({ children, requiredRole = null }) => {
	const user = authService.getStoredUser();

	// If no user is logged in, redirect to login
	if (!user) {
		return <Navigate to='/login' replace />;
	}
	console.log(user);

	// If a specific role is required and user doesn't have it, redirect to disaster-map
	if (requiredRole && user.role !== requiredRole) {
		return <Navigate to='/disaster-map' replace />;
	}

	// User is authorized
	return children;
};

export default ProtectedRoute;
