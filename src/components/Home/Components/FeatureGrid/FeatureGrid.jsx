import Styles from './FeatureGrid.module.css';

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
		<article className={Styles.card}>
			<div className={Styles.icon} aria-hidden>
				<span>{icon}</span>
			</div>
			<h3 className={Styles.cardTitle}>{title}</h3>
			<p className={Styles.cardCopy}>{copy}</p>
		</article>
	);
}

function FeatureGrid() {
	return (
		<section className={Styles.featureGrid} id='features'>
			<div className={Styles.header}>
				<h2 className={Styles.headerTitle}>Solving the Toughest Challenges in Relief Logistics</h2>
				<p className={Styles.headerDescription}>
					Disaster relief is complex. Our AI platform simplifies resource allocation, team coordination, and needs
					assessment, ensuring aid reaches where it&apos;s needed most, faster.
				</p>
			</div>
			<div className={Styles.items}>
				{features.map(feature => (
					<FeatureCard key={feature.title} {...feature} />
				))}
			</div>
		</section>
	);
}

export default FeatureGrid;
