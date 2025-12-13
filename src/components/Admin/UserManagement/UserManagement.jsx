import styles from './UserManagement.module.css';

function UserManagement() {
	return (
		<div className={styles.userManagement}>
			<h2 className={styles.pageTitle}>User Management</h2>
			<div className={styles.placeholder}>
				<svg width='64' height='64' viewBox='0 0 24 24' fill='none'>
					<path
						d='M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2'
						stroke='currentColor'
						strokeWidth='2'
						strokeLinecap='round'
						strokeLinejoin='round'
					/>
					<circle cx='9' cy='7' r='4' stroke='currentColor' strokeWidth='2' />
					<path
						d='M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75'
						stroke='currentColor'
						strokeWidth='2'
						strokeLinecap='round'
						strokeLinejoin='round'
					/>
				</svg>
				<p>User Management - Coming Soon</p>
			</div>
		</div>
	);
}

export default UserManagement;
