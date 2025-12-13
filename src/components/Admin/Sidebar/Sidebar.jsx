import { NavLink } from 'react-router-dom';
import styles from './Sidebar.module.css';

function Sidebar() {
	const menuItems = [
		{
			id: 'assignment-requests',
			path: '/admin/assignment-requests',
			label: 'Assignment Requests',
			icon: (
				<svg width='24' height='24' viewBox='0 0 24 24' fill='none'>
					<path d='M9 11l3 3L22 4' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
					<path
						d='M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11'
						stroke='currentColor'
						strokeWidth='2'
						strokeLinecap='round'
						strokeLinejoin='round'
					/>
				</svg>
			),
		},
		{
			id: 'user-management',
			path: '/admin/user-management',
			label: 'User Management',
			icon: (
				<svg width='24' height='24' viewBox='0 0 24 24' fill='none'>
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
			),
		},
		{
			id: 'zone-status',
			path: '/admin/zone-status',
			label: 'Zone Status Monitor',
			icon: (
				<svg width='24' height='24' viewBox='0 0 24 24' fill='none'>
					<path
						d='M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z'
						stroke='currentColor'
						strokeWidth='2'
						strokeLinecap='round'
						strokeLinejoin='round'
					/>
					<circle cx='12' cy='10' r='3' stroke='currentColor' strokeWidth='2' />
				</svg>
			),
		},
	];

	return (
		<aside className={styles.sidebar}>
			<nav className={styles.nav}>
				{menuItems.map(item => (
					<NavLink
						key={item.id}
						to={item.path}
						className={({ isActive }) => `${styles.navItem} ${isActive ? styles.active : ''}`}
					>
						<span className={styles.icon}>{item.icon}</span>
						<span className={styles.label}>{item.label}</span>
					</NavLink>
				))}
			</nav>
		</aside>
	);
}

export default Sidebar;
