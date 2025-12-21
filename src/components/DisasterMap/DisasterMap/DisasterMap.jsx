import { useState, useEffect } from 'react';
import MapView from '../components/MapView/MapView';
import ZoneStats from '../components/ZoneStats/ZoneStats';
import ReliefNeedsPanel from '../components/ReliefNeedsPanel/ReliefNeedsPanel';
import { zoneService, authService } from '../../../services';
import styles from './DisasterMap.module.css';

const DisasterMap = () => {
	const [selectedZone, setSelectedZone] = useState(null);
	const [zones, setZones] = useState([]);
	const [overallStats, setOverallStats] = useState(null);
	const [zoneDetails, setZoneDetails] = useState({});
	const [loading, setLoading] = useState(true);
	const [user, setUser] = useState(null);

	// Fetch initial data
	useEffect(() => {
		fetchData();
		// Get user from localStorage
		const storedUser = authService.getStoredUser();
		setUser(storedUser);
	}, []);

	// Fetch zones and overall statistics
	const fetchData = async () => {
		try {
			setLoading(true);
			// Fetch all zones and overall stats in parallel
			const [zonesResponse, statsResponse] = await Promise.all([
				zoneService.getAllZones(),
				zoneService.getOverallStatistics(),
			]);

			console.log('API Response - Zones:', zonesResponse);
			console.log('API Response - Stats:', statsResponse);

			// Normalize zone data to ensure coordinates are in [lat, lng] format
			const normalizedZones = (zonesResponse.zones || zonesResponse || []).map(zone => {
				console.log('Processing zone:', zone.name, 'Raw radius:', zone.radius, 'Raw coordinates:', zone.coordinates);

				return {
					...zone,
					coordinates: Array.isArray(zone.coordinates)
						? zone.coordinates
						: zone.coordinates?.latitude && zone.coordinates?.longitude
						? [zone.coordinates.latitude, zone.coordinates.longitude]
						: zone.latitude && zone.longitude
						? [zone.latitude, zone.longitude]
						: [23.0239, 91.3996], // default fallback
					radius: zone.radius ? zone.radius * 1000 : 5000, // Convert km to meters if needed
					severity: zone.severity || zone.priority || 'moderate',
					hasAssignedTeam: zone.hasAssignedTeam || zone.assignedTeam || false,
				};
			});

			console.log('Normalized Zones:', normalizedZones);
			setZones(normalizedZones);
			setOverallStats(statsResponse);
		} catch (error) {
			console.error('Error fetching data:', error);
		} finally {
			setLoading(false);
		}
	};

	// Fetch zone details when a zone is selected
	const handleZoneClick = async zone => {
		setSelectedZone(zone);

		// If we haven't fetched this zone's details yet
		if (!zoneDetails[zone.id]) {
			try {
				const details = await zoneService.getZoneDetails(zone.id);
				setZoneDetails(prev => ({
					...prev,
					[zone.id]: details,
				}));
			} catch (error) {
				console.error('Error fetching zone details:', error);
			}
		}
	};

	const handleClosePanel = () => {
		setSelectedZone(null);
	};

	if (loading) {
		return (
			<div className={styles.container}>
				<div className={styles.loading}>Loading disaster zones...</div>
			</div>
		);
	}

	return (
		<div className={styles.container}>
			<div className={styles.mainContent}>
				<aside className={styles.sidebar}>
					<div className={styles.sidebarHeader}>
						<h2 className={styles.sidebarTitle}>Feni – The flood zones</h2>
					</div>
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
					<MapView zones={zones} onZoneClick={handleZoneClick} selectedZone={selectedZone} />
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
