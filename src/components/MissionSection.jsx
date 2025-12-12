import SectionHeader from './SectionHeader';

const phases = [
	{ title: 'Detect', detail: 'Satellite, drone, and citizen channels fused into a single alert stream.' },
	{ title: 'Decide', detail: 'Risk-aware scoring highlights the safest corridors for crews and supplies.' },
	{ title: 'Deploy', detail: 'Auto-assign teams, assets, and resupply with live ETA and comms status.' },
];

const callouts = [
	'Multi-hazard overlays: firelines, floodplains, structural risk, and access control.',
	'Lightweight mobile briefs for crews with offline fallback.',
	'Audit-ready history for every decision and reroute.',
];

function TimelineItem({ index, title, detail }) {
	return (
		<div className='timeline-item'>
			<div className='timeline-marker'>{index + 1}</div>
			<div>
				<div className='timeline-title'>{title}</div>
				<div className='timeline-detail'>{detail}</div>
			</div>
		</div>
	);
}

function MissionSection() {
	return (
		<section className='section mission' id='missions'>
			<SectionHeader
				eyebrow='Mission control'
				title='Plan, brief, and execute'
				description='Everything stays in sync — plans, people, and supplies — so teams focus on action, not admin.'
			/>
			<div className='mission__layout'>
				<div className='glass card mission__panel'>
					<h3>Operational rhythm</h3>
					<div className='timeline'>
						{phases.map((phase, idx) => (
							<TimelineItem key={phase.title} index={idx} {...phase} />
						))}
					</div>
				</div>
				<div className='glass card mission__notes'>
					<h3>What changes in the field</h3>
					<ul className='callouts'>
						{callouts.map(item => (
							<li key={item}>{item}</li>
						))}
					</ul>
					<div className='chips'>
						<span className='chip'>Air & ground assets</span>
						<span className='chip'>Volunteer coordination</span>
						<span className='chip'>Live briefings</span>
					</div>
				</div>
			</div>
		</section>
	);
}

export default MissionSection;
