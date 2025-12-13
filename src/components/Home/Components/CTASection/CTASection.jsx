import styles from './CTASection.module.css';

function CTASection() {
	return (
		<section className={`${styles.section} ${styles.cta}`} id='cta'>
			<div className={styles.body}>
				<h3 className={styles.title}>AI Powered Disaster Relief Resource Planner</h3>
				<p className={styles.description}>Stay updated on disaster relief efforts</p>
				<form className={styles.form}>
					<input
						type='email'
						name='email'
						placeholder='Enter your email'
						aria-label='Enter your email'
						className={styles.input}
					/>
					<button className={`${styles.btn} ${styles.btnPrimary}`} type='button'>
						Subscribe
					</button>
				</form>
			</div>
		</section>
	);
}

export default CTASection;
