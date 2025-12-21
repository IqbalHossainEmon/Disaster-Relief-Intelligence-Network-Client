import { Outlet } from 'react-router-dom';
import Sidebar from '../../Sidebar/Sidebar/Sidebar';
import styles from './AdminDashboard.module.css';

function AdminDashboard() {
	return (
		<div className={styles.adminDashboard}>
			<Sidebar />
			<main className={styles.mainContent}>
				<div className={styles.content}>
					<Outlet />
				</div>
			</main>
		</div>
	);
}

export default AdminDashboard;
