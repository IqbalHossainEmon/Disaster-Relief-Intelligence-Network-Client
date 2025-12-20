import styles from './ZoneStats.module.css';

const ZoneStats = ({ stats, selectedZone, zoneDetails }) => {
	// Show zone-specific stats when a zone is selected
	if (selectedZone && zoneDetails) {
		const hasTeams = zoneDetails.assignedTeams && zoneDetails.assignedTeams.length > 0;

		return (
			<div className={styles.statsContainer}>
				<div className={styles.statCard}>
					<div className={styles.statIcon}>
						<span className={styles.iconDanger}>📍</span>
					</div>
					<div className={styles.statContent}>
						<div className={styles.statLabel}>Zone Name</div>
						<div className={styles.statValue}>{selectedZone.name}</div>
						<div className={styles.statSubtext}>{selectedZone.location}</div>
					</div>
				</div>

				<div className={styles.statCard}>
					<div className={styles.statIcon}>
						<span className={styles.iconWarning}>⚠️</span>
					</div>
					<div className={styles.statContent}>
						<div className={styles.statLabel}>Severity Level</div>
						<div className={`${styles.statValue} ${styles[selectedZone.severity]}`}>
							{selectedZone.severity.charAt(0).toUpperCase() + selectedZone.severity.slice(1)}
						</div>
						<div className={styles.statSubtext}>Last Updated: {selectedZone.lastUpdated}</div>
					</div>
				</div>

				<div className={styles.statCard}>
					<div className={styles.statIcon}>
						<span className={styles.iconSafe}>👥</span>
					</div>
					<div className={styles.statContent}>
						<div className={styles.statLabel}>Population Affected</div>
						<div className={styles.statValue}>{selectedZone.affectedPeople.toLocaleString()}</div>
						<div className={styles.statSubtext}>Total: {selectedZone.population.toLocaleString()}</div>
					</div>
				</div>

				{selectedZone.severity !== 'safe' && (
					<div className={styles.statCard}>
						<div className={styles.statIcon}>
							<span className={styles.iconProgress}>👨‍👩‍👧‍👦</span>
						</div>
						<div className={styles.statContent}>
							<div className={styles.statLabel}>Assigned Teams</div>
							{hasTeams ? (
								<>
									<div className={styles.statValue}>{zoneDetails.assignedTeams.length}</div>
									<div className={styles.teamsList}>
										{zoneDetails.assignedTeams.map(team => (
											<div key={team.id} className={styles.teamItem}>
												<span className={styles.teamName}>{team.name}</span>
												<span className={styles.teamMembers}>({team.members} members)</span>
											</div>
										))}
									</div>
								</>
							) : (
								<>
									<div className={styles.statValue}>0</div>
									<div className={styles.statSubtext}>⚠ No Teams Assigned</div>
								</>
							)}
						</div>
					</div>
				)}
			</div>
		);
	}

	// Show overall stats when no zone is selected
	return (
		<div className={styles.statsContainer}>
			<div className={styles.statCard}>
				<div className={styles.statIcon}>
					<span className={styles.iconDanger}>📍</span>
				</div>
				<div className={styles.statContent}>
					<div className={styles.statLabel}>Active Disaster Zones</div>
					<div className={styles.statValue}>{stats.activeDisasterZones}</div>
					<div className={styles.statSubtext}>Affected People: {stats.affectedPeople.toLocaleString()}</div>
				</div>
			</div>

			<div className={styles.statCard}>
				<div className={styles.statIcon}>
					<span className={styles.iconSafe}>📍</span>
				</div>
				<div className={styles.statContent}>
					<div className={styles.statLabel}>Safe Zones</div>
					<div className={styles.statValue}>{stats.safeZones}</div>
					<div className={styles.statSubtext}>Shelter Capacity: {stats.shelterCapacity.toLocaleString()}</div>
				</div>
			</div>

			<div className={styles.statCard}>
				<div className={styles.statIcon}>
					<span className={styles.iconWarning}>⚠️</span>
				</div>
				<div className={styles.statContent}>
					<div className={styles.statLabel}>High Urgency Needs</div>
					<div className={styles.statValue}>{stats.highUrgencyNeeds}</div>
					<div className={styles.statSubtext}>Critical/high resource needs</div>
				</div>
			</div>

			<div className={styles.statCard}>
				<div className={styles.statIcon}>
					<span className={styles.iconProgress}>📊</span>
				</div>
				<div className={styles.statContent}>
					<div className={styles.statLabel}>Relief Distribution Progress</div>
					<div className={styles.statValue}>{stats.reliefDistributionProgress}%</div>
					<div className={styles.progressBarContainer}>
						<div className={styles.progressBar}>
							<div className={styles.progressFill} style={{ width: `${stats.reliefDistributionProgress}%` }}></div>
						</div>
						<div className={styles.progressText}>
							<span>in Progress</span>
						</div>
					</div>
					<div className={styles.statSubtext}>
						Delivered: {stats.delivered}% | Pending: {stats.pending}%
					</div>
				</div>
			</div>
		</div>
	);
};

export default ZoneStats;
