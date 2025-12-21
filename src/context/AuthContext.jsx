import { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		// Check if user is logged in on mount
		const storedUser = authService.getStoredUser();
		const token = authService.getStoredToken();

		if (storedUser && token) {
			setUser(storedUser);
			// Optionally fetch fresh user data
			fetchCurrentUser();
		} else {
			setLoading(false);
		}
	}, []);

	const fetchCurrentUser = async () => {
		try {
			const response = await authService.getCurrentUser();
			setUser(response.user);
		} catch (error) {
			console.error('Error fetching current user:', error);
			// If error, clear invalid credentials
			authService.logout();
			setUser(null);
		} finally {
			setLoading(false);
		}
	};

	const login = async (email, password) => {
		const response = await authService.login(email, password);
		setUser(response.user);
		return response;
	};

	const logout = () => {
		authService.logout();
		setUser(null);
	};

	const updateUser = updatedUser => {
		setUser(updatedUser);
	};

	const value = {
		user,
		loading,
		login,
		logout,
		updateUser,
		isAuthenticated: !!user,
		isAdmin: user?.role === 'admin',
		isLeader: user?.role === 'leader',
		isMember: user?.role === 'member',
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error('useAuth must be used within an AuthProvider');
	}
	return context;
};
