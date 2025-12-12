function CTASection() {
	return (
		<section className='section cta' id='cta'>
			<div className='cta__body'>
				<h3>AI Powered Disaster Relief Resource Planner</h3>
				<p>Stay updated on disaster relief efforts</p>
				<form className='cta__form'>
					<input type='email' name='email' placeholder='Enter your email' aria-label='Enter your email' />
					<button className='btn btn-primary' type='button'>
						Subscribe
					</button>
				</form>
			</div>
		</section>
	);
}

export default CTASection;
