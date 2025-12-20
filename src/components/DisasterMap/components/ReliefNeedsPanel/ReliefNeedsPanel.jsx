import NeedsList from '../../../ZoneDetails/components/NeedsList/NeedsList';
import styles from './ReliefNeedsPanel.module.css';

const ReliefNeedsPanel = ({ zone, zoneDetails, onClose }) => {
	if (!zoneDetails) {
		return (
			<div className={styles.panel}>
				<div className={styles.header}>
					<h2>Zone Details</h2>
					<button className={styles.closeBtn} onClick={onClose}>
						✕
					</button>
				</div>
				<div className={styles.content}>
					<p className={styles.noData}>No details available for this zone</p>
				</div>
			</div>
		);
	}

	return (
		<div className={styles.panel}>
			<div className={styles.header}>
				<div>
					<h2>{zone.name}</h2>
					<p className={styles.location}>{zone.location}</p>
				</div>
				<button className={styles.closeBtn} onClick={onClose}>
					✕
				</button>
			</div>

			<div className={styles.badges}>
				<div className={`${styles.badge} ${styles[zone.severity]}`}>
					{zone.severity === 'critical' && '🔴 Critical'}
					{zone.severity === 'high' && '🟠 High'}
					{zone.severity === 'moderate' && '🟡 Moderate'}
					{zone.severity === 'safe' && '🟢 Safe'}
				</div>
				<div className={styles.population}>Population: {zone.population.toLocaleString()}</div>
			</div>

			<div className={styles.content}>
				<h3 className={styles.sectionTitle}>Relief Needs</h3>
				<NeedsList reliefNeeds={zoneDetails.reliefNeeds} />
			</div>

			<div className={styles.footer}>
				<button className={styles.applyBtn}>Apply for Assignment</button>
			</div>
		</div>
	);
};

export default ReliefNeedsPanel;
