import SectionHeader from '../SectionHeader/SectionHeader';
import styles from './Stats.module.css';

const statItems = [
	{
		label: 'Sensors streaming',
		value: '12.4k',
		detail: 'Telemetry feeds normalized in real time.',
	},
	{
		label: 'Volunteers mobilized',
		value: '8,902',
		detail: 'Automatically routed to nearest safe hub.',
	},
	{
		label: 'Supply lanes',
		value: '318',
		detail: 'Scored for risk, weather, and congestion.',
	},
	{
		label: 'Data freshness',
		value: '14s',
		detail: 'Median ingest-to-map latency.',
	},
];

function StatCard({ label, value, detail }) {
	return (
		<div className={styles.statCard}>
			<span className={styles.statLabel}>{label}</span>
			<span className={styles.statValue}>{value}</span>
			<span className={styles.statDetail}>{detail}</span>
		</div>
	);
}

function Stats() {
	return (
		<section className={`${styles.section} ${styles.stats}`}>
			<SectionHeader
				eyebrow='Operational pulse'
				title='Live telemetry and readiness'
				description='Always-on metrics so dispatchers see exactly what is moving, where, and how fast.'
			/>
			<div className={styles.statGrid}>
				{statItems.map(item => (
					<StatCard key={item.label} {...item} />
				))}
			</div>
		</section>
	);
}

export default Stats;
