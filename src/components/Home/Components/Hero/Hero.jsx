import styles from './Hero.module.css';

function Hero() {
	return (
		<section className={styles.hero} id='overview'>
			<div className={styles.background} aria-hidden />
			<div className={styles.inner}>
				<div className={styles.content}>
					<p className={styles.eyebrow}>AI-Powered Resource Planning for Disaster Relief.</p>
					<h1 className={styles.title}>Navigate Chaos with Intelligence</h1>
					<p className={styles.subtitle}>AI-Powered Resource Planning for Disaster Relief.</p>
					<div className={styles.actions}>
						<button className={`${styles.btn} ${styles.btnPrimary}`}>Sign up</button>
					</div>
				</div>
			</div>
		</section>
	);
}

export default Hero;
