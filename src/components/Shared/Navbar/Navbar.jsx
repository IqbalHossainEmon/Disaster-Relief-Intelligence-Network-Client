import { Link, useLocation } from 'react-router-dom';
import styles from './Navbar.module.css';

function Navbar() {
	const location = useLocation();
	const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';

	return (
		<header className={styles.navbar}>
			<div className={styles.inner}>
				<Link to='/' className={styles.brand}>
					DRIN
				</Link>
				{!isAuthPage && (
					<div className={styles.actions}>
						<Link to='/login'>
							<button className={styles.btn}>Log in</button>
						</Link>
						<Link to='/signup'>
							<button className={`${styles.btn} ${styles.btnPrimary}`}>Sign up</button>
						</Link>
					</div>
				)}
			</div>
		</header>
	);
}

export default Navbar;
