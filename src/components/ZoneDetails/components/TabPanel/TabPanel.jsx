import styles from './TabPanel.module.css';

const TabPanel = ({ activeTab, zone }) => {
	const renderZoneSummary = () => (
		<div className={styles.tabContent}>
			<div className={styles.infoGrid}>
				<div className={styles.infoCard}>
					<div className={styles.infoLabel}>Zone Name</div>
					<div className={styles.infoValue}>{zone.zoneSummary.zoneName}</div>
				</div>
				<div className={styles.infoCard}>
					<div className={styles.infoLabel}>Population Affected</div>
					<div className={styles.infoValue}>{zone.zoneSummary.populationAffected.toLocaleString()}</div>
				</div>
				<div className={styles.infoCard}>
					<div className={styles.infoLabel}>Severity Level</div>
					<div className={`${styles.infoValue} ${styles.critical}`}>{zone.zoneSummary.severityLevel}</div>
				</div>
				<div className={styles.infoCard}>
					<div className={styles.infoLabel}>Last Updated</div>
					<div className={styles.infoValue}>{zone.zoneSummary.lastUpdated}</div>
				</div>
			</div>
		</div>
	);

	const renderOngoingEfforts = () => (
		<div className={styles.tabContent}>
			<div className={styles.effortsList}>
				<div className={styles.effortItem}>
					<span className={styles.effortIcon}>📦</span>
					<div className={styles.effortInfo}>
						<div className={styles.effortLabel}>Relief Drop</div>
						<div className={styles.effortValue}>{zone.ongoingEfforts.reliefDrop}</div>
					</div>
				</div>
				<div className={styles.effortItem}>
					<span className={styles.effortIcon}>🚁</span>
					<div className={styles.effortInfo}>
						<div className={styles.effortLabel}>Evacuation</div>
						<div className={styles.effortValue}>{zone.ongoingEfforts.evacuationStatus}</div>
					</div>
				</div>
				<div className={styles.effortItem}>
					<span className={styles.effortIcon}>📡</span>
					<div className={styles.effortInfo}>
						<div className={styles.effortLabel}>Communication</div>
						<div className={styles.effortValue}>{zone.ongoingEfforts.communicationStatus}</div>
					</div>
				</div>
			</div>
		</div>
	);

	const renderChallengesAlerts = () => (
		<div className={styles.tabContent}>
			<div className={styles.alertsList}>
				<div className={styles.alertItem}>
					<span className={styles.alertIcon}>🚧</span>
					<div className={styles.alertInfo}>
						<div className={styles.alertLabel}>Roads Blocked</div>
						<div className={styles.alertValue}>{zone.challengesAlerts.roadsBlocked}</div>
					</div>
				</div>
				<div className={styles.alertItem}>
					<span className={styles.alertIcon}>⚡</span>
					<div className={styles.alertInfo}>
						<div className={styles.alertLabel}>Power Outage</div>
						<div className={styles.alertValue}>{zone.challengesAlerts.powerOutage}</div>
					</div>
				</div>
				<div className={styles.alertItem}>
					<span className={styles.alertIcon}>📶</span>
					<div className={styles.alertInfo}>
						<div className={styles.alertLabel}>Internet</div>
						<div className={styles.alertValue}>{zone.challengesAlerts.internetSignal}</div>
					</div>
				</div>
			</div>
		</div>
	);

	const renderAssignedTeams = () => (
		<div className={styles.tabContent}>
			<div className={styles.teamsList}>
				{zone.assignedTeams.map(team => (
					<div key={team.id} className={styles.teamCard}>
						<div className={styles.teamHeader}>
							<span className={styles.teamIcon}>👥</span>
							<div className={styles.teamInfo}>
								<div className={styles.teamName}>{team.name}</div>
								<div className={styles.teamMembers}>{team.members} members</div>
							</div>
						</div>
						<div className={`${styles.teamStatus} ${styles[team.status.toLowerCase().replace(' ', '')]}`}>
							{team.status}
						</div>
					</div>
				))}
				<button className={styles.seeMoreBtn}>See More</button>
			</div>
		</div>
	);

	switch (activeTab) {
		case 'summary':
			return renderZoneSummary();
		case 'efforts':
			return renderOngoingEfforts();
		case 'challenges':
			return renderChallengesAlerts();
		case 'teams':
			return renderAssignedTeams();
		default:
			return null;
	}
};

export default TabPanel;
