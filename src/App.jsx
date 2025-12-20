import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import styles from './App.module.css';
import Footer from './components/Shared/Footer/Footer/Footer';
import Navbar from './components/Shared/Navbar/Navbar/Navbar';
import Home from './components/Home/Home/Home/Home';
import AdminDashboard from './components/Admin/AdminDashboard/AdminDashboard/AdminDashboard';
import AssignmentRequests from './components/Admin/AssignmentRequests/AssignmentRequests/AssignmentRequests';
import UserManagement from './components/Admin/UserManagement/UserManagement/UserManagement';
import ZoneStatus from './components/Admin/ZoneStatus/ZoneStatus/ZoneStatus';
import Login from './components/Auth/Login/Login/Login';
import SignUp from './components/Auth/SignUp/SignUp/SignUp';

function App() {
	const location = useLocation();
	const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';
	const isAdminPage = location.pathname.startsWith('/admin');

	return (
		<div className={styles.page}>
			{!isAdminPage && <Navbar />}
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/login' element={<Login />} />
				<Route path='/signup' element={<SignUp />} />
				<Route path='/admin' element={<AdminDashboard />}>
					<Route index element={<Navigate to='/admin/assignment-requests' replace />} />
					<Route path='assignment-requests' element={<AssignmentRequests />} />
					<Route path='user-management' element={<UserManagement />} />
					<Route path='zone-status' element={<ZoneStatus />} />
				</Route>
			</Routes>
			{!isAuthPage && !isAdminPage && <Footer />}
		</div>
	);
}

export default App;
