function Footer() {
	return (
		<footer className='footer'>
			<div className='footer__inner'>
				<div className='footer__brand'>
					<span className='brand-logo'>AIPDRRP</span>
				</div>
				<div className='footer__columns'>
					<div className='footer__col'>
						<h4>About</h4>
						<a href='#mission'>Our Mission</a>
						<a href='#team'>Our Team</a>
						<a href='#partners'>Our Partners</a>
					</div>
					<div className='footer__col'>
						<h4>Legal</h4>
						<a href='#privacy'>Privacy Policy</a>
						<a href='#terms'>Terms of Service</a>
						<a href='#disclaimer'>Disclaimer</a>
					</div>
				</div>
				<div className='footer__meta'>© 2025 Disaster Relief Intelligent Networks. All rights reserved.</div>
			</div>
		</footer>
	);
}

export default Footer;
