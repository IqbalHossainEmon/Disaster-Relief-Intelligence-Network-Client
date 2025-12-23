import { useState, useEffect } from 'react';
import MapView from '../components/MapView/MapView';
import ReliefNeedsPanel from '../components/ReliefNeedsPanel/ReliefNeedsPanel';
import { zoneService } from '../../../services';
import styles from './DisasterMap.module.css';

const DisasterMap = () => {
	const [selectedZone, setSelectedZone] = useState(null);
	const [zones, setZones] = useState([]);
	const [zoneDetails, setZoneDetails] = useState({});
	const [loading, setLoading] = useState(true);

	// Fetch initial data
	useEffect(() => {
		fetchData();
	}, []);

	// Fetch zones and overall statistics
	const fetchData = async () => {
		try {
			setLoading(true);

			// Check if user is authenticated
			const token = localStorage.getItem('token');
			if (!token) {
				console.error('No authentication token found. Please login first.');
				setZones([]);
				setZoneDetails({});
				return;
			}

			console.log('Fetching zones from API...');
			const zonesResponse = await zoneService.getAllZones();
			console.log('API Response:', zonesResponse);

			// Handle empty response
			if (!zonesResponse) {
				console.warn('No response from API');
				setZones([]);
				setZoneDetails({});
				return;
			}

			// Extract zones from response
			const zonesData = zonesResponse.zones || zonesResponse.data || zonesResponse || [];
			console.log('Zones data:', zonesData);

			// Check if zones is an array
			if (!Array.isArray(zonesData)) {
				console.error('Zones data is not an array:', zonesData);
				setZones([]);
				setZoneDetails({});
				return;
			}

			// Normalize the response format
			const normalizedZones = zonesData.map(zone => {
				// Handle coordinates - backend may send as object {latitude, longitude} or array [lat, lng]
				let coords;
				if (Array.isArray(zone.coordinates)) {
					coords = zone.coordinates;
				} else if (zone.coordinates?.latitude !== undefined && zone.coordinates?.longitude !== undefined) {
					coords = [zone.coordinates.latitude, zone.coordinates.longitude];
				} else if (zone.latitude !== undefined && zone.longitude !== undefined) {
					coords = [zone.latitude, zone.longitude];
				} else {
					coords = [23.0239, 91.3996]; // Default fallback
				}

				// Handle radius - backend may send in kilometers, we need meters
				let radiusInMeters;
				if (zone.radius) {
					// If radius is small (< 100), assume it's in kilometers
					radiusInMeters = zone.radius < 100 ? zone.radius * 1000 : zone.radius;
				} else {
					radiusInMeters = 1500; // Default
				}

				return {
					...zone,
					coordinates: coords,
					radius: radiusInMeters,
					severity: zone.severity || zone.priority || 'moderate',
					hasAssignedTeam: zone.hasAssignedTeam || zone.assignedTeam || false,
				};
			});

			console.log('Normalized zones:', normalizedZones);
			console.log('Total zones loaded:', normalizedZones.length);
			setZones(normalizedZones);

			// Store zone details
			const details = {};
			normalizedZones.forEach(zone => {
				details[zone.id] = zone;
			});
			setZoneDetails(details);
		} catch (error) {
			console.error('Error fetching zones:', error);
			console.error('Error details:', error.response?.data || error.message);
			if (error.response?.status === 401) {
				console.error('Authentication failed. You will be redirected to login.');
			}
			// Set empty zones array on error so map still shows
			setZones([]);
			setZoneDetails({});
		} finally {
			setLoading(false);
		}
	};

	// Fetch zone details when a zone is selected
	const handleZoneClick = async zone => {
		console.log('Zone clicked:', zone);

		try {
			console.log(`Fetching full zone details for ${zone.id}...`);
			// Fetch complete zone details including assignments and relief needs
			const response = await zoneService.getZoneDetails(zone.id);
			console.log('Full zone details API response:', response);

			const zoneData = response?.data || response;
			const zoneInfo = zoneData?.zone || zone;
			const needsArray = zoneData?.reliefNeeds || [];
			const assignments = zoneData?.assignments || [];
			const statistics = zoneData?.statistics || null;

			console.log('Assignments:', assignments);
			console.log('Relief needs array:', needsArray);

			// Transform array into nested object structure grouped by category
			// Backend format: [{ category: "water", item: "Drinking Water", quantityNeeded: 50000, quantityDelivered: 30000, unit: "liters" }]
			// Frontend expects: { water: { category: "water", items: [{ name: "Drinking Water", needed: 50000, delivered: 30000, ... }] } }
			const transformedNeeds = {};

			if (Array.isArray(needsArray)) {
				needsArray.forEach(need => {
					const categoryKey = need.category || 'other';

					if (!transformedNeeds[categoryKey]) {
						transformedNeeds[categoryKey] = {
							category: categoryKey.charAt(0).toUpperCase() + categoryKey.slice(1),
							items: [],
						};
					}

					transformedNeeds[categoryKey].items.push({
						name: need.item || need.name,
						needed: need.quantityNeeded || need.quantity || need.needed,
						delivered: need.quantityDelivered || need.delivered || 0,
						unit: need.unit,
						subtext: need.notes || need.subtext,
					});
				});
			}

			console.log('Transformed relief needs:', transformedNeeds);

			// Update zone with full details
			const updatedZone = {
				...zoneInfo,
				reliefNeeds: transformedNeeds,
				assignments: assignments,
				statistics: statistics,
			};

			setZoneDetails(prev => ({
				...prev,
				[zone.id]: updatedZone,
			}));

			setSelectedZone(updatedZone);
		} catch (error) {
			console.error('Error fetching relief needs:', error);
			console.error('Error details:', error.response?.data || error.message);

			// Still show zone even if relief needs fail to load
			setZoneDetails(prev => ({
				...prev,
				[zone.id]: { ...zone, reliefNeeds: {} },
			}));
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
							onZoneUpdate={() => handleZoneClick(selectedZone)}
						/>
					)}
				</div>
			</div>
		</div>
	);
};

export default DisasterMap;
