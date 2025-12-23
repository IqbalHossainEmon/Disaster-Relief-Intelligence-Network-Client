import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './ContributionHistory.module.css';
import { contributionService } from '../../../../services';

const ContributionHistory = () => {
	const location = useLocation();
	const [contributions, setContributions] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [filter, setFilter] = useState('all');
	const [notification, setNotification] = useState(null);

	useEffect(() => {
		fetchContributions();
	}, []);

	const fetchContributions = async () => {
		try {
			setLoading(true);
			const response = await contributionService.getContributions();
			const contributionsData = response.data || response.contributions || response || [];
			setContributions(contributionsData);
			setError(null);
		} catch (err) {
			console.error('Error fetching contributions:', err);
			setError('Failed to load contributions');
			showNotification('Failed to load contributions', 'error');
		} finally {
			setLoading(false);
		}
	};

	const showNotification = (message, type = 'success') => {
		setNotification({ message, type });
		setTimeout(() => setNotification(null), 5000);
	};

	const getFilteredContributions = () => {
		if (filter === 'all') return contributions;
		return contributions.filter(c => c.type === filter);
	};

	const getTypeBadgeClass = type => {
		switch (type) {
			case 'food':
				return styles.typeFood;
			case 'water':
				return styles.typeWater;
			case 'medical':
				return styles.typeMedical;
			case 'shelter':
				return styles.typeShelter;
			case 'clothing':
				return styles.typeClothing;
			default:
				return '';
		}
	};

	const getTypeIcon = type => {
		switch (type) {
			case 'food':
				return '🍽️';
			case 'water':
				return '💧';
			case 'medical':
				return '⚕️';
			case 'shelter':
				return '🏠';
			case 'clothing':
				return '👕';
			default:
				return '📦';
		}
	};

	const getStatusBadgeClass = status => {
		switch (status) {
			case 'pending':
				return styles.statusPending;
			case 'in_transit':
				return styles.statusInTransit;
			case 'delivered':
				return styles.statusDelivered;
			default:
				return '';
		}
	};

	const formatDate = dateString => {
		return new Date(dateString).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'short',
			day: 'numeric',
			hour: '2-digit',
			minute: '2-digit',
		});
	};

	const filteredContributions = getFilteredContributions();
	const stats = {
		food: contributions.filter(c => c.type === 'food').length,
		water: contributions.filter(c => c.type === 'water').length,
		medical: contributions.filter(c => c.type === 'medical').length,
		shelter: contributions.filter(c => c.type === 'shelter').length,
	};

	if (loading) {
		return (
			<div className={styles.container}>
				<aside className={styles.sidebar}>
					<div className={styles.sidebarHeader}>
						<h2 className={styles.sidebarTitle}>Admin Panel</h2>
					</div>
					<nav className={styles.nav}>
						<Link to='/disaster-map' className={styles.navItem}>
							<span className={styles.navIcon}>🗺️</span>
							<span>Disaster Map</span>
						</Link>
						<Link to='/team-assignments' className={styles.navItem}>
							<span className={styles.navIcon}>👥</span>
							<span>Team Assignments</span>
						</Link>
						<Link to='/contribution-history' className={`${styles.navItem} ${styles.active}`}>
							<span className={styles.navIcon}>📋</span>
							<span>Contribution History</span>
						</Link>
						<Link to='/team-manage' className={styles.navItem}>
							<span className={styles.navIcon}>👨‍👩‍👧‍👦</span>
							<span>Team Manage</span>
						</Link>
					</nav>
				</aside>
				<div className={styles.mainContent}>
					<div className={styles.loading}>Loading contributions...</div>
				</div>
			</div>
		);
	}

	return (
		<div className={styles.container}>
			<aside className={styles.sidebar}>
				<div className={styles.sidebarHeader}>
					<h2 className={styles.sidebarTitle}>Admin Panel</h2>
				</div>
				<nav className={styles.nav}>
					<Link to='/disaster-map' className={styles.navItem}>
						<span className={styles.navIcon}>🗺️</span>
						<span>Disaster Map</span>
					</Link>
					<Link to='/team-assignments' className={styles.navItem}>
						<span className={styles.navIcon}>👥</span>
						<span>Team Assignments</span>
					</Link>
					<Link to='/contribution-history' className={`${styles.navItem} ${styles.active}`}>
						<span className={styles.navIcon}>📋</span>
						<span>Contribution History</span>
					</Link>
					<Link to='/team-manage' className={styles.navItem}>
						<span className={styles.navIcon}>👨‍👩‍👧‍👦</span>
						<span>Team Manage</span>
					</Link>
				</nav>
			</aside>

			<div className={styles.mainContent}>
				<div className={styles.contributionHistory}>
					<h1 className={styles.pageTitle}>Contribution History</h1>

					<div className={styles.statsGrid}>
						<div className={styles.statCard}>
							<div className={styles.statIcon}>🍽️</div>
							<div className={styles.statInfo}>
								<h3>{stats.food}</h3>
								<p>Food Contributions</p>
							</div>
						</div>
						<div className={styles.statCard}>
							<div className={styles.statIcon}>💧</div>
							<div className={styles.statInfo}>
								<h3>{stats.water}</h3>
								<p>Water Contributions</p>
							</div>
						</div>
						<div className={styles.statCard}>
							<div className={styles.statIcon}>⚕️</div>
							<div className={styles.statInfo}>
								<h3>{stats.medical}</h3>
								<p>Medical Contributions</p>
							</div>
						</div>
						<div className={styles.statCard}>
							<div className={styles.statIcon}>🏠</div>
							<div className={styles.statInfo}>
								<h3>{stats.shelter}</h3>
								<p>Shelter Contributions</p>
							</div>
						</div>
					</div>

					<div className={styles.filterContainer}>
						<button
							className={`${styles.filterBtn} ${filter === 'all' ? styles.active : ''}`}
							onClick={() => setFilter('all')}
						>
							All ({contributions.length})
						</button>
						<button
							className={`${styles.filterBtn} ${filter === 'food' ? styles.active : ''}`}
							onClick={() => setFilter('food')}
						>
							🍽️ Food ({stats.food})
						</button>
						<button
							className={`${styles.filterBtn} ${filter === 'water' ? styles.active : ''}`}
							onClick={() => setFilter('water')}
						>
							💧 Water ({stats.water})
						</button>
						<button
							className={`${styles.filterBtn} ${filter === 'medical' ? styles.active : ''}`}
							onClick={() => setFilter('medical')}
						>
							⚕️ Medical ({stats.medical})
						</button>
						<button
							className={`${styles.filterBtn} ${filter === 'shelter' ? styles.active : ''}`}
							onClick={() => setFilter('shelter')}
						>
							🏠 Shelter ({stats.shelter})
						</button>
					</div>

					{error && <div className={styles.error}>{error}</div>}

					{filteredContributions.length === 0 ? (
						<div className={styles.emptyState}>No contributions found</div>
					) : (
						<div className={styles.tableContainer}>
							<table className={styles.table}>
								<thead>
									<tr>
										<th>Type</th>
										<th>Contributor</th>
										<th>Quantity</th>
										<th>Zone</th>
										<th>Status</th>
										<th>Date</th>
									</tr>
								</thead>
								<tbody>
									{filteredContributions.map(contribution => (
										<tr key={contribution.id}>
											<td>
												<span className={`${styles.typeBadge} ${getTypeBadgeClass(contribution.type)}`}>
													{getTypeIcon(contribution.type)}{' '}
													{contribution.type.charAt(0).toUpperCase() + contribution.type.slice(1)}
												</span>
											</td>
											<td>
												<div className={styles.contributorInfo}>
													<div className={styles.contributorName}>{contribution.contributorName}</div>
													<div className={styles.organizationName}>{contribution.organizationName}</div>
												</div>
											</td>
											<td className={styles.quantity}>
												{contribution.quantity} {contribution.unit}
											</td>
											<td>{contribution.zoneName}</td>
											<td>
												<span className={`${styles.statusBadge} ${getStatusBadgeClass(contribution.status)}`}>
													{contribution.status.replace('_', ' ').charAt(0).toUpperCase() +
														contribution.status.replace('_', ' ').slice(1)}
												</span>
											</td>
											<td className={styles.date}>{formatDate(contribution.createdAt)}</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					)}
				</div>
			</div>

			{notification && (
				<div className={`${styles.notification} ${styles[notification.type]}`}>
					<div className={styles.notificationContent}>
						<span>{notification.type === 'success' ? '✓' : '✕'}</span>
						<span>{notification.message}</span>
					</div>
					<button className={styles.notificationClose} onClick={() => setNotification(null)}>
						✕
					</button>
				</div>
			)}
		</div>
	);
};

export default ContributionHistory;
