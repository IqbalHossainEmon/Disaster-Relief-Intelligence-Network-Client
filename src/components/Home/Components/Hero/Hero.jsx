import { Link } from 'react-router-dom';
import styles from './Hero.module.css';

function Hero() {
	return (
		<section className={styles.hero} id='overview'>
			<div className={styles.background} aria-hidden />
			<div className={styles.inner}>
				<div className={styles.content}>
					<p className={styles.eyebrow}>AI-Powered Resource Planner for Disaster Relief.</p>
					<h1 className={styles.title}>Navigate Chaos with Intelligence</h1>
					<p className={styles.subtitle}>Planning Made Simple and Effective</p>
					<div className={styles.actions}>
						<Link to='/signup'>
							<button className={`${styles.btn} ${styles.btnPrimary}`}>Sign up</button>
						</Link>
					</div>
				</div>
			</div>
		</section>
	);
}

export default Hero;
