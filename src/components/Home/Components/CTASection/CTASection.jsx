import Styles from './CTASection.module.css';

function CTASection() {
	return (
		<section className={`${Styles.section} ${Styles.cta}`} id='cta'>
			<div className={Styles.body}>
				<h3 className={Styles.title}>AI Powered Disaster Relief Resource Planner</h3>
				<p className={Styles.description}>Stay updated on disaster relief efforts</p>
				<form className={Styles.form}>
					<input
						type='email'
						name='email'
						placeholder='Enter your email'
						aria-label='Enter your email'
						className={Styles.input}
					/>
					<button className={`${Styles.btn} ${Styles.btnPrimary}`} type='button'>
						Subscribe
					</button>
				</form>
			</div>
		</section>
	);
}

export default CTASection;
