function Hero() {
	return (
		<section className='section hero' id='overview'>
			<div className='hero__overlay' />
			<div className='hero__background' aria-hidden />
			<div className='hero__inner'>
				<div className='hero__content'>
					<p className='hero__eyebrow'>AI-Powered Resource Planning for Disaster Relief.</p>
					<h1 className='hero__title'>Navigate Chaos with Intelligence</h1>
					<p className='hero__subtitle'>AI-Powered Resource Planning for Disaster Relief.</p>
					<div className='hero__actions'>
						<button className='btn btn-primary btn-hero'>Sign up</button>
					</div>
				</div>
			</div>
		</section>
	);
}

export default Hero;
