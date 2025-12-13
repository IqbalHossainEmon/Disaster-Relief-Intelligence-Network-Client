import styles from './Navbar.module.css';

function Navbar() {
	return (
		<header className={styles.navbar}>
			<div className={styles.inner}>
				<div className={styles.brand}>DRIN</div>
				<div className={styles.actions}>
					<button className={`${styles.btn} ${styles.btnPrimary}`}>Sign up</button>
				</div>
			</div>
		</header>
	);
}

export default Navbar;
