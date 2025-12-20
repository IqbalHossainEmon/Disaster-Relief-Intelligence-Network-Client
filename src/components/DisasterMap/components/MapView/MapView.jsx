import { MapContainer, TileLayer, Circle, Tooltip, useMap } from 'react-leaflet';
import { useEffect } from 'react';
import 'leaflet/dist/leaflet.css';
import styles from './MapView.module.css';

// Component to adjust map view when zones change
const MapController = ({ zones, selectedZone }) => {
	const map = useMap();

	useEffect(() => {
		if (selectedZone) {
			// Zoom to selected zone
			map.setView(selectedZone.coordinates, 13, {
				animate: true,
				duration: 1,
			});
		} else if (zones && zones.length > 0) {
			// Reset to default view
			map.setView([23.0239, 91.3996], 10, {
				animate: true,
				duration: 1,
			});
		}
	}, [zones, selectedZone, map]);

	return null;
};

const MapView = ({ zones, onZoneClick, selectedZone }) => {
	const getSeverityColor = severity => {
		switch (severity) {
			case 'critical':
				return '#ff4444';
			case 'high':
				return '#ff8c42';
			case 'moderate':
				return '#ffd93d';
			case 'low':
				return '#a8e6cf';
			case 'safe':
				return '#6bcaef';
			default:
				return '#999';
		}
	};

	const getSeverityOpacity = severity => {
		switch (severity) {
			case 'critical':
				return 0.6;
			case 'high':
				return 0.5;
			case 'moderate':
				return 0.4;
			case 'safe':
				return 0.3;
			default:
				return 0.3;
		}
	};

	return (
		<div className={styles.mapWrapper}>
			<MapContainer
				center={[23.0239, 91.3996]}
				zoom={10}
				minZoom={8}
				maxZoom={15}
				className={styles.map}
				zoomControl={true}
				maxBounds={[
					[21.5, 89.5],
					[24.5, 93.5],
				]}
				maxBoundsViscosity={0.8}
			>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
				/>
				<MapController zones={zones} selectedZone={selectedZone} />

				{zones.map(zone => (
					<Circle
						key={zone.id}
						center={zone.coordinates}
						radius={zone.radius}
						pathOptions={{
							color: getSeverityColor(zone.severity),
							fillColor: getSeverityColor(zone.severity),
							fillOpacity: getSeverityOpacity(zone.severity),
							weight: 2,
						}}
						eventHandlers={{
							click: () => onZoneClick(zone),
						}}
					>
						<Tooltip direction='top' offset={[0, -10]} opacity={0.9}>
							<div className={styles.tooltip}>
								<strong>{zone.name}</strong> - {zone.location}
								<br />
								<span className={styles[zone.severity]}>
									{zone.severity.charAt(0).toUpperCase() + zone.severity.slice(1)} Priority
								</span>
								{zone.severity !== 'safe' && (
									<>
										<br />
										<span className={styles.teamStatus}>
											{zone.hasAssignedTeam !== false ? '✓ Team Assigned' : '⚠ No Team Assigned'}
										</span>
									</>
								)}
							</div>
						</Tooltip>
					</Circle>
				))}
			</MapContainer>
		</div>
	);
};

export default MapView;
