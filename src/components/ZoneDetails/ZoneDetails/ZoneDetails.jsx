import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Polygon, Marker, Popup } from 'react-leaflet';
import NeedsList from '../components/NeedsList/NeedsList';
import TabPanel from '../components/TabPanel/TabPanel';
import { zoneDetails } from '../../../data/mockData';
import 'leaflet/dist/leaflet.css';
import styles from './ZoneDetails.module.css';

const ZoneDetails = () => {
	const { zoneId } = useParams();
	const navigate = useNavigate();
	const [activeTab, setActiveTab] = useState('summary');

	const zone = zoneDetails[zoneId];

	if (!zone) {
		return (
			<div className={styles.container}>
				<div className={styles.error}>Zone not found</div>
			</div>
		);
	}

	// Create polygon coordinates for the zone boundary
	const createZoneBoundary = (center, radiusInKm = 5) => {
		const points = 32;
		const coords = [];
		for (let i = 0; i < points; i++) {
			const angle = (i * 360) / points;
			const lat = center[0] + (radiusInKm / 111) * Math.cos((angle * Math.PI) / 180);
			const lng =
				center[1] + (radiusInKm / (111 * Math.cos((center[0] * Math.PI) / 180))) * Math.sin((angle * Math.PI) / 180);
			coords.push([lat, lng]);
		}
		return coords;
	};

	const zoneBoundary = createZoneBoundary(zone.coordinates);

	return (
		<div className={styles.container}>
			<header className={styles.header}>
				<div className={styles.headerLeft}>
					<button className={styles.backBtn} onClick={() => navigate('/disaster-map')}>
						← Back
					</button>
					<div className={styles.logo}>AIPDRRP</div>
					<div className={styles.title}>
						{zone.name} - ({zone.severity === 'critical' ? 'Danger' : zone.severity})
					</div>
				</div>
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

				<div className={styles.contentArea}>
					<div className={styles.mapSection}>
						<MapContainer
							center={zone.coordinates}
							zoom={13}
							minZoom={11}
							maxZoom={18}
							className={styles.map}
							zoomControl={true}
							maxBounds={[
								[zone.coordinates[0] - 0.5, zone.coordinates[1] - 0.5],
								[zone.coordinates[0] + 0.5, zone.coordinates[1] + 0.5],
							]}
							maxBoundsViscosity={0.8}
						>
							<TileLayer
								attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
								url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
							/>
							<Polygon
								positions={zoneBoundary}
								pathOptions={{
									color: '#ff4444',
									fillColor: '#ff4444',
									fillOpacity: 0.4,
									weight: 2,
								}}
							/>
							<Marker position={zone.coordinates}>
								<Popup>
									<strong>{zone.name}</strong>
									<br />
									{zone.zoneName}
								</Popup>
							</Marker>
						</MapContainer>

						<div className={styles.needsPanel}>
							<div className={styles.needsHeader}>
								<div className={styles.criticalBadge}>🚨 {zone.name} – Critical Needs</div>
							</div>
							<NeedsList reliefNeeds={zone.reliefNeeds} />
							<button className={styles.applyBtn}>Apply Now</button>
						</div>
					</div>

					<div className={styles.tabsSection}>
						<div className={styles.tabs}>
							<button
								className={`${styles.tab} ${activeTab === 'summary' ? styles.activeTab : ''}`}
								onClick={() => setActiveTab('summary')}
							>
								<span className={styles.tabIcon}>📄</span>
								Zone Summary
							</button>
							<button
								className={`${styles.tab} ${activeTab === 'efforts' ? styles.activeTab : ''}`}
								onClick={() => setActiveTab('efforts')}
							>
								<span className={styles.tabIcon}>🚀</span>
								Ongoing Efforts
							</button>
							<button
								className={`${styles.tab} ${activeTab === 'challenges' ? styles.activeTab : ''}`}
								onClick={() => setActiveTab('challenges')}
							>
								<span className={styles.tabIcon}>⚠️</span>
								Challenges & Alerts
							</button>
							<button
								className={`${styles.tab} ${activeTab === 'teams' ? styles.activeTab : ''}`}
								onClick={() => setActiveTab('teams')}
							>
								<span className={styles.tabIcon}>👥</span>
								Assigned Teams
							</button>
						</div>

						<div className={styles.tabContent}>
							<TabPanel activeTab={activeTab} zone={zone} />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ZoneDetails;
