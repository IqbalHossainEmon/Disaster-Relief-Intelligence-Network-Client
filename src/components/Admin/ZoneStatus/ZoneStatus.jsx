import styles from './ZoneStatus.module.css';

function ZoneStatus() {
	return (
		<div className={styles.zoneStatus}>
			<h2 className={styles.pageTitle}>Zone Status Monitor</h2>
			<div className={styles.placeholder}>
				<svg width='64' height='64' viewBox='0 0 24 24' fill='none'>
					<path
						d='M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z'
						stroke='currentColor'
						strokeWidth='2'
						strokeLinecap='round'
						strokeLinejoin='round'
					/>
					<circle cx='12' cy='10' r='3' stroke='currentColor' strokeWidth='2' />
				</svg>
				<p>Zone Status Monitor - Coming Soon</p>
			</div>
		</div>
	);
}

export default ZoneStatus;
