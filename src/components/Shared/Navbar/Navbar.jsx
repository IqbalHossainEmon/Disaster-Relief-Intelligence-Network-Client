import Styles from './Navbar.module.css';

function Navbar() {
	return (
		<header className={Styles.navbar}>
			<div className={Styles.inner}>
				<div className={Styles.brand}>AIPDRRP</div>
				<div className={Styles.actions}>
					<button className={`${Styles.btn} ${Styles.btnPrimary}`}>Sign up</button>
				</div>
			</div>
		</header>
	);
}

export default Navbar;
