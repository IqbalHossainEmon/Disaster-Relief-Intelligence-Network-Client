const features = [
	{
		title: 'Predictive Needs Analysis',
		copy: 'Leverage AI to anticipate resource requirements based on disaster type, location, and population data.',
		icon: '🔮',
	},
	{
		title: 'Optimized Resource Allocation',
		copy: 'Automatically match available supplies and equipment to identified needs across multiple zones.',
		icon: '📦',
	},
	{
		title: 'Team Assignments',
		copy: 'Assign teams based on skills, availability, and real-time status updates for maximum efficiency.',
		icon: '👥',
	},
	{
		title: 'Real-time Situational Awareness',
		copy: 'Visualize critical data on infrastructure status, medical resources, shelters, and affected areas.',
		icon: '📈',
	},
];

function FeatureCard({ title, copy, icon }) {
	return (
		<article className='card feature-card'>
			<div className='feature-icon' aria-hidden>
				<span>{icon}</span>
			</div>
			<h3>{title}</h3>
			<p>{copy}</p>
		</article>
	);
}

function FeatureGrid() {
	return (
		<section className='section feature-grid' id='features'>
			<div className='section-header section-header--center'>
				<h2>Solving the Toughest Challenges in Relief Logistics</h2>
				<p>
					Disaster relief is complex. Our AI platform simplifies resource allocation, team coordination, and needs
					assessment, ensuring aid reaches where it&apos;s needed most, faster.
				</p>
			</div>
			<div className='feature-grid__items'>
				{features.map(feature => (
					<FeatureCard key={feature.title} {...feature} />
				))}
			</div>
		</section>
	);
}

export default FeatureGrid;
