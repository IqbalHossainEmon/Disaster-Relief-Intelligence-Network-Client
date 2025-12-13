import styles from './Footer.module.css';

function Footer() {
	return (
		<footer className={styles.footer}>
			<div className={styles.footerInner}>
				<div className={styles.footerBrand}>
					<span className={styles.brandLogo}>DRIN</span>
				</div>
				<div className={styles.footerColumns}>
					<div className={styles.footerCol}>
						<h4>About</h4>
						<a href='#mission'>Our Mission</a>
						<a href='#team'>Our Team</a>
						<a href='#partners'>Our Partners</a>
					</div>
					<div className={styles.footerCol}>
						<h4>Legal</h4>
						<a href='#privacy'>Privacy Policy</a>
						<a href='#terms'>Terms of Service</a>
						<a href='#disclaimer'>Disclaimer</a>
					</div>
				</div>
				<div className={styles.footerMeta}>© 2025 Disaster Relief Intelligent Networks. All rights reserved.</div>
			</div>
		</footer>
	);
}

export default Footer;
