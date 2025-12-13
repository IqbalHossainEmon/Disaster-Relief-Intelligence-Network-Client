import styles from './FeatureGrid.module.css';

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
		<article className={styles.card}>
			<div className={styles.icon} aria-hidden>
				<span>{icon}</span>
			</div>
			<h3 className={styles.cardTitle}>{title}</h3>
			<p className={styles.cardCopy}>{copy}</p>
		</article>
	);
}

function FeatureGrid() {
	return (
		<section className={styles.featureGrid} id='features'>
			<div className={styles.header}>
				<h2 className={styles.headerTitle}>Solving the Toughest Challenges in Relief Logistics</h2>
				<p className={styles.headerDescription}>
					Disaster relief is complex. Our AI platform simplifies resource allocation, team coordination, and needs
					assessment, ensuring aid reaches where it&apos;s needed most, faster.
				</p>
			</div>
			<div className={styles.items}>
				{features.map(feature => (
					<FeatureCard key={feature.title} {...feature} />
				))}
			</div>
		</section>
	);
}

export default FeatureGrid;
