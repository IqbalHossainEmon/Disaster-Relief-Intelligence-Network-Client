import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './TeamAssignments.module.css';
import { assignmentService } from '../../../../services';

const TeamAssignments = () => {
	const location = useLocation();
	const [assignments, setAssignments] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [filter, setFilter] = useState('all');
	const [notification, setNotification] = useState(null);

	useEffect(() => {
		fetchAssignments();
	}, []);

	const fetchAssignments = async () => {
		try {
			setLoading(true);
			const response = await assignmentService.getAssignments();
			const assignmentsData = response.data || response.assignments || response || [];
			setAssignments(assignmentsData);
			setError(null);
		} catch (err) {
			console.error('Error fetching assignments:', err);
			setError('Failed to load assignments');
			showNotification('Failed to load assignments', 'error');
		} finally {
			setLoading(false);
		}
	};

	const showNotification = (message, type = 'success') => {
		setNotification({ message, type });
		setTimeout(() => setNotification(null), 5000);
	};

	const getFilteredAssignments = () => {
		if (filter === 'all') return assignments;
		return assignments.filter(a => a.status === filter);
	};

	const getStatusBadgeClass = status => {
		switch (status) {
			case 'pending':
				return styles.statusPending;
			case 'in_progress':
				return styles.statusInProgress;
			case 'completed':
				return styles.statusCompleted;
			default:
				return '';
		}
	};

	const getStatusLabel = status => {
		switch (status) {
			case 'pending':
				return 'Pending';
			case 'in_progress':
				return 'In Progress';
			case 'completed':
				return 'Completed';
			default:
				return status;
		}
	};

	const formatDate = dateString => {
		return new Date(dateString).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'short',
			day: 'numeric',
		});
	};

	const filteredAssignments = getFilteredAssignments();
	const stats = {
		total: assignments.length,
		active: assignments.filter(a => a.status === 'in_progress').length,
		completed: assignments.filter(a => a.status === 'completed').length,
		pending: assignments.filter(a => a.status === 'pending').length,
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
						<Link to='/team-assignments' className={`${styles.navItem} ${styles.active}`}>
							<span className={styles.navIcon}>👥</span>
							<span>Team Assignments</span>
						</Link>
						<Link to='/contribution-history' className={styles.navItem}>
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
					<div className={styles.loading}>Loading assignments...</div>
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
					<Link to='/team-assignments' className={`${styles.navItem} ${styles.active}`}>
						<span className={styles.navIcon}>👥</span>
						<span>Team Assignments</span>
					</Link>
					<Link to='/contribution-history' className={styles.navItem}>
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
				<div className={styles.teamAssignments}>
					<h1 className={styles.pageTitle}>Team Assignments</h1>

					<div className={styles.statsGrid}>
						<div className={styles.statCard}>
							<div className={styles.statIcon}>📊</div>
							<div className={styles.statInfo}>
								<h3>{stats.total}</h3>
								<p>Total Assignments</p>
							</div>
						</div>
						<div className={styles.statCard}>
							<div className={styles.statIcon}>⏳</div>
							<div className={styles.statInfo}>
								<h3>{stats.active}</h3>
								<p>Active</p>
							</div>
						</div>
						<div className={styles.statCard}>
							<div className={styles.statIcon}>✅</div>
							<div className={styles.statInfo}>
								<h3>{stats.completed}</h3>
								<p>Completed</p>
							</div>
						</div>
						<div className={styles.statCard}>
							<div className={styles.statIcon}>🕐</div>
							<div className={styles.statInfo}>
								<h3>{stats.pending}</h3>
								<p>Pending</p>
							</div>
						</div>
					</div>

					<div className={styles.filterContainer}>
						<button
							className={`${styles.filterBtn} ${filter === 'all' ? styles.active : ''}`}
							onClick={() => setFilter('all')}
						>
							All ({assignments.length})
						</button>
						<button
							className={`${styles.filterBtn} ${filter === 'pending' ? styles.active : ''}`}
							onClick={() => setFilter('pending')}
						>
							Pending ({stats.pending})
						</button>
						<button
							className={`${styles.filterBtn} ${filter === 'in_progress' ? styles.active : ''}`}
							onClick={() => setFilter('in_progress')}
						>
							In Progress ({stats.active})
						</button>
						<button
							className={`${styles.filterBtn} ${filter === 'completed' ? styles.active : ''}`}
							onClick={() => setFilter('completed')}
						>
							Completed ({stats.completed})
						</button>
					</div>

					{error && <div className={styles.error}>{error}</div>}

					{filteredAssignments.length === 0 ? (
						<div className={styles.emptyState}>No assignments found</div>
					) : (
						<div className={styles.assignmentsList}>
							{filteredAssignments.map(assignment => (
								<div key={assignment.id} className={styles.assignmentCard}>
									<div className={styles.cardHeader}>
										<h3 className={styles.zoneName}>{assignment.zoneName}</h3>
										<span className={`${styles.statusBadge} ${getStatusBadgeClass(assignment.status)}`}>
											{getStatusLabel(assignment.status)}
										</span>
									</div>
									<div className={styles.cardBody}>
										<div className={styles.infoRow}>
											<span className={styles.label}>Organization:</span>
											<span className={styles.value}>{assignment.organizationName}</span>
										</div>
										<div className={styles.infoRow}>
											<span className={styles.label}>Team Size:</span>
											<span className={styles.value}>{assignment.teamSize} members</span>
										</div>
										<div className={styles.infoRow}>
											<span className={styles.label}>Assigned:</span>
											<span className={styles.value}>{formatDate(assignment.assignedDate)}</span>
										</div>
										{assignment.completionDate && (
											<div className={styles.infoRow}>
												<span className={styles.label}>Completed:</span>
												<span className={styles.value}>{formatDate(assignment.completionDate)}</span>
											</div>
										)}
										{assignment.notes && (
											<div className={styles.notes}>
												<span className={styles.label}>Notes:</span>
												<p>{assignment.notes}</p>
											</div>
										)}
									</div>
								</div>
							))}
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

export default TeamAssignments;
