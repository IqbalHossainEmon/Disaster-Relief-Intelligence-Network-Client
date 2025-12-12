import SectionHeader from './SectionHeader';

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
		<div className='glass card stat-card'>
			<span className='stat-card__label'>{label}</span>
			<span className='stat-card__value'>{value}</span>
			<span className='stat-card__detail'>{detail}</span>
		</div>
	);
}

function Stats() {
	return (
		<section className='section stats'>
			<SectionHeader
				eyebrow='Operational pulse'
				title='Live telemetry and readiness'
				description='Always-on metrics so dispatchers see exactly what is moving, where, and how fast.'
			/>
			<div className='stat-grid'>
				{statItems.map(item => (
					<StatCard key={item.label} {...item} />
				))}
			</div>
		</section>
	);
}

export default Stats;
