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
import DisasterMap from './components/DisasterMap/DisasterMap/DisasterMap';
import ZoneDetails from './components/ZoneDetails/ZoneDetails/ZoneDetails';
import TeamAssignments from './components/Admin/TeamAssignments/TeamAssignments/TeamAssignments';
import ContributionHistory from './components/Admin/ContributionHistory/ContributionHistory/ContributionHistory';
import TeamManage from './components/Admin/TeamManage/TeamManage/TeamManage';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
	const location = useLocation();
	const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';
	const isAdminPage = location.pathname.startsWith('/admin');
	const isDisasterMapPage =
		location.pathname.startsWith('/disaster-map') ||
		location.pathname.startsWith('/zone') ||
		location.pathname === '/team-assignments' ||
		location.pathname === '/contribution-history' ||
		location.pathname === '/team-manage';
	const showFooter = !isAuthPage && !isAdminPage && !isDisasterMapPage;

	return (
		<div className={styles.page}>
			{!isAuthPage && <Navbar />}
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/login' element={<Login />} />
				<Route path='/signup' element={<SignUp />} />
				<Route path='/disaster-map' element={<DisasterMap />} />
				<Route path='/zone/:zoneId' element={<ZoneDetails />} />
				<Route path='/team-assignments' element={<TeamAssignments />} />
				<Route path='/contribution-history' element={<ContributionHistory />} />
				<Route path='/team-manage' element={<TeamManage />} />
				<Route
					path='/admin'
					element={
						<ProtectedRoute requiredRole='admin'>
							<AdminDashboard />
						</ProtectedRoute>
					}
				>
					<Route index element={<Navigate to='/admin/assignment-requests' replace />} />
					<Route path='assignment-requests' element={<AssignmentRequests />} />
					<Route path='user-management' element={<UserManagement />} />
					<Route path='zone-status' element={<ZoneStatus />} />
				</Route>
			</Routes>
			{showFooter && <Footer />}
		</div>
	);
}

export default App;
