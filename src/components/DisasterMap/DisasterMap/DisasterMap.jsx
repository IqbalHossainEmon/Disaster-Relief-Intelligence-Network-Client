import { useState } from 'react';
import MapView from '../components/MapView/MapView';
import ZoneStats from '../components/ZoneStats/ZoneStats';
import ReliefNeedsPanel from '../components/ReliefNeedsPanel/ReliefNeedsPanel';
import { disasterZones, overallStats, zoneDetails } from '../../../data/mockData';
import styles from './DisasterMap.module.css';

const DisasterMap = () => {
	const [selectedZone, setSelectedZone] = useState(null);

	const handleZoneClick = zone => {
		setSelectedZone(zone);
	};

	const handleClosePanel = () => {
		setSelectedZone(null);
	};

	return (
		<div className={styles.container}>
			<header className={styles.header}>
				<div className={styles.logo}>AIPDRRP</div>
				<div className={styles.title}>Feni – The flood zones</div>
				<div className={styles.userProfile}>
					<div className={styles.avatar}>
						<span>👤</span>
					</div>
					<span className={styles.username}>Ahmed Hossain</span>
				</div>
			</header>

			<div className={styles.mainContent}>
				<aside className={styles.sidebar}>
					<nav className={styles.nav}>
						<div className={`${styles.navItem} ${styles.active}`}>
							<span className={styles.navIcon}>🗺️</span>
							<span>Disaster Map</span>
						</div>
						<div className={styles.navItem}>
							<span className={styles.navIcon}>👥</span>
							<span>Team Assignments</span>
						</div>
						<div className={styles.navItem}>
							<span className={styles.navIcon}>📋</span>
							<span>Contribution History</span>
						</div>
						<div className={styles.navItem}>
							<span className={styles.navIcon}>👨‍👩‍👧‍👦</span>
							<span>Team Manage</span>
						</div>
					</nav>
				</aside>

				<div className={styles.mapContainer}>
					<MapView zones={disasterZones} onZoneClick={handleZoneClick} selectedZone={selectedZone} />
					{selectedZone && (
						<ReliefNeedsPanel
							zone={selectedZone}
							zoneDetails={zoneDetails[selectedZone.id]}
							onClose={handleClosePanel}
						/>
					)}
					<ZoneStats stats={overallStats} selectedZone={selectedZone} zoneDetails={zoneDetails[selectedZone?.id]} />
				</div>
			</div>
		</div>
	);
};

export default DisasterMap;
