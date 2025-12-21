import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styles from './Navbar.module.css';
import { authService } from '../../../../services';

function Navbar() {
	const location = useLocation();
	const navigate = useNavigate();
	const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';
	const [user, setUser] = useState(null);
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);

	useEffect(() => {
		// Get user from localStorage
		const storedUser = authService.getStoredUser();
		setUser(storedUser);
	}, [location.pathname]);

	const handleLogout = () => {
		authService.logout();
		setUser(null);
		setIsDropdownOpen(false);
		navigate('/login');
	};

	const toggleDropdown = () => {
		setIsDropdownOpen(!isDropdownOpen);
	};

	// Close dropdown when clicking outside
	useEffect(() => {
		const handleClickOutside = event => {
			if (isDropdownOpen && !event.target.closest(`.${styles.profileContainer}`)) {
				setIsDropdownOpen(false);
			}
		};

		document.addEventListener('click', handleClickOutside);
		return () => document.removeEventListener('click', handleClickOutside);
	}, [isDropdownOpen]);

	return (
		<header className={styles.navbar}>
			<div className={styles.inner}>
				<Link to='/' className={styles.brand}>
					DRIN
				</Link>
				{!isAuthPage && (
					<div className={styles.actions}>
						{user ? (
							<div className={styles.profileContainer}>
								<button className={styles.profileBtn} onClick={toggleDropdown}>
									<div className={styles.avatar}>
										{user.fullName?.charAt(0).toUpperCase() || user.email?.charAt(0).toUpperCase() || 'U'}
									</div>
									<span className={styles.userName}>{user.fullName || user.email}</span>
									<svg
										className={`${styles.dropdownIcon} ${isDropdownOpen ? styles.dropdownIconOpen : ''}`}
										width='20'
										height='20'
										viewBox='0 0 24 24'
										fill='none'
										stroke='currentColor'
										strokeWidth='2'
									>
										<polyline points='6 9 12 15 18 9'></polyline>
									</svg>
								</button>
								{isDropdownOpen && (
									<div className={styles.dropdown}>
										<div className={styles.dropdownHeader}>
											<div className={styles.dropdownAvatar}>{user.fullName?.charAt(0).toUpperCase() || 'U'}</div>
											<div className={styles.dropdownUserInfo}>
												<div className={styles.dropdownUserName}>{user.fullName || 'User'}</div>
												<div className={styles.dropdownUserEmail}>{user.email}</div>
											</div>
										</div>
										<div className={styles.dropdownDivider} />
										<Link to='/disaster-map' className={styles.dropdownItem} onClick={() => setIsDropdownOpen(false)}>
											<svg width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
												<path d='M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z'></path>
												<circle cx='12' cy='10' r='3'></circle>
											</svg>
											Disaster Map
										</Link>
										{(user.role === 'leader' || user.role === 'admin') && (
											<Link to='/admin' className={styles.dropdownItem} onClick={() => setIsDropdownOpen(false)}>
												<svg
													width='18'
													height='18'
													viewBox='0 0 24 24'
													fill='none'
													stroke='currentColor'
													strokeWidth='2'
												>
													<rect x='3' y='3' width='18' height='18' rx='2' ry='2'></rect>
													<line x1='3' y1='9' x2='21' y2='9'></line>
													<line x1='9' y1='21' x2='9' y2='9'></line>
												</svg>
												Admin Dashboard
											</Link>
										)}
										<div className={styles.dropdownDivider} />
										<button className={styles.dropdownItem} onClick={handleLogout}>
											<svg width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
												<path d='M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4'></path>
												<polyline points='16 17 21 12 16 7'></polyline>
												<line x1='21' y1='12' x2='9' y2='12'></line>
											</svg>
											Logout
										</button>
									</div>
								)}
							</div>
						) : (
							<>
								<Link to='/login'>
									<button className={styles.btn}>Log in</button>
								</Link>
								<Link to='/signup'>
									<button className={`${styles.btn} ${styles.btnPrimary}`}>Sign up</button>
								</Link>
							</>
						)}
					</div>
				)}
			</div>
		</header>
	);
}

export default Navbar;
