import { Outlet } from 'react-router-dom';
import Sidebar from '../../Sidebar/Sidebar/Sidebar';
import styles from './AdminDashboard.module.css';

function AdminDashboard() {
	return (
		<div className={styles.adminDashboard}>
			<Sidebar />
			<main className={styles.mainContent}>
				<div className={styles.topBar}>
					<h1 className={styles.logo}>DRIM</h1>
					<div className={styles.userInfo}>
						<div className={styles.avatar}>
							<svg width='24' height='24' viewBox='0 0 24 24' fill='none'>
								<path
									d='M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2'
									stroke='currentColor'
									strokeWidth='2'
									strokeLinecap='round'
									strokeLinejoin='round'
								/>
								<circle cx='12' cy='7' r='4' stroke='currentColor' strokeWidth='2' />
							</svg>
						</div>
						<span className={styles.userName}>Safiha Alom Joya</span>
					</div>
				</div>
				<div className={styles.content}>
					<Outlet />
				</div>
			</main>
		</div>
	);
}

export default AdminDashboard;
