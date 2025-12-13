import Styles from './Hero.module.css';

function Hero() {
	return (
		<section className={Styles.hero} id='overview'>
			<div className={Styles.overlay} />
			<div className={Styles.background} aria-hidden />
			<div className={Styles.inner}>
				<div className={Styles.content}>
					<p className={Styles.eyebrow}>AI-Powered Resource Planning for Disaster Relief.</p>
					<h1 className={Styles.title}>Navigate Chaos with Intelligence</h1>
					<p className={Styles.subtitle}>AI-Powered Resource Planning for Disaster Relief.</p>
					<div className={Styles.actions}>
						<button className={`${Styles.btn} ${Styles.btnPrimary}`}>Sign up</button>
					</div>
				</div>
			</div>
		</section>
	);
}

export default Hero;
