import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { userService, organizationService } from '../../../../services';
import styles from './TeamManage.module.css';

const TeamManage = () => {
	const location = useLocation();
	const [currentUser, setCurrentUser] = useState(null);
	const [members, setMembers] = useState([]);
	const [joinRequests, setJoinRequests] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [showAddModal, setShowAddModal] = useState(false);
	const [showJoinRequestModal, setShowJoinRequestModal] = useState(false);
	const [searchQuery, setSearchQuery] = useState('');
	const [searchResults, setSearchResults] = useState([]);
	const [searching, setSearching] = useState(false);
	const [notification, setNotification] = useState(null);
	const [organization, setOrganization] = useState(null);

	useEffect(() => {
		fetchOrganizationData();
	}, []);

	const fetchOrganizationData = async () => {
		try {
			setLoading(true);

			// Get current user
			const user = await userService.getCurrentUser();

			setCurrentUser(user);

			if (!user.organizationId) {
				setError('You are not part of any organization');
				setLoading(false);
				return;
			}

			// Get organization details
			const orgResponse = await organizationService.getOrganizationDetails(user.organizationId);
			setOrganization(orgResponse.data || orgResponse.organization);

			// Get organization members
			const membersResponse = await organizationService.getOrganizationMembers(user.organizationId);
			setMembers(membersResponse.data || membersResponse.members || []);

			// If user is leader, fetch join requests
			if (user.role === 'leader') {
				const requestsResponse = await organizationService.getJoinRequests(user.organizationId);
				setJoinRequests(requestsResponse.data || requestsResponse.requests || []);
			}

			setError(null);
		} catch (err) {
			console.error('Error fetching organization data:', err);
			setError(err.response?.data?.error || 'Failed to load organization data');
			showNotification(err.response?.data?.error || 'Failed to load organization data', 'error');
		} finally {
			setLoading(false);
		}
	};

	const showNotification = (message, type = 'success') => {
		setNotification({ message, type });
		setTimeout(() => setNotification(null), 5000);
	};

	const handleSearchUsers = async query => {
		if (!query || query.trim().length < 2) {
			setSearchResults([]);
			return;
		}

		try {
			setSearching(true);
			const response = await userService.searchUsers(query);
			setSearchResults(response || []);
		} catch (err) {
			console.error('Error searching users:', err);
			showNotification(err.response?.data?.error || 'Failed to search users', 'error');
		} finally {
			setSearching(false);
		}
	};

	const handleAddMember = async userId => {
		try {
			await organizationService.addMember(organization.id, userId);
			showNotification('Member added successfully!', 'success');
			setSearchQuery('');
			setSearchResults([]);
			setShowAddModal(false);
			fetchOrganizationData();
		} catch (err) {
			showNotification(err || 'Failed to add member', 'error');
		}
	};

	const handleSendJoinRequest = async () => {
		if (!organization) {
			showNotification('Organization not found', 'error');
			return;
		}

		try {
			await organizationService.sendJoinRequest(organization.id);
			showNotification('Join request sent successfully!', 'success');
			setShowJoinRequestModal(false);
		} catch (err) {
			console.error('Error sending join request:', err);
			showNotification(err.response?.data?.error || 'Failed to send join request', 'error');
		}
	};

	const handleApproveJoinRequest = async requestId => {
		try {
			await organizationService.approveJoinRequest(organization.id, requestId);
			setJoinRequests(prev => prev.filter(req => req.id !== requestId));
			showNotification('Join request approved', 'success');
			fetchOrganizationData();
		} catch (err) {
			console.error('Error approving join request:', err);
			showNotification(err.response?.data?.error || 'Failed to approve join request', 'error');
		}
	};

	const handleRejectJoinRequest = async requestId => {
		try {
			await organizationService.rejectJoinRequest(organization.id, requestId);
			setJoinRequests(prev => prev.filter(req => req.id !== requestId));
			showNotification('Join request rejected', 'success');
		} catch (err) {
			console.error('Error rejecting join request:', err);
			showNotification(err.response?.data?.error || 'Failed to reject join request', 'error');
		}
	};

	const handleRemoveMember = async (memberId, memberName) => {
		if (!window.confirm(`Are you sure you want to remove ${memberName} from the team?`)) {
			return;
		}

		try {
			await organizationService.removeMember(organization.id, memberId);
			setMembers(prev => prev.filter(m => m.id !== memberId));
			showNotification(`${memberName} removed successfully`, 'success');
		} catch (err) {
			console.error('Error removing member:', err);
			showNotification(err.response?.data?.error || 'Failed to remove member', 'error');
		}
	};

	const handleUpdateRole = async (memberId, newRole) => {
		if (!currentUser || currentUser.role !== 'leader') {
			showNotification('Only leaders can update member roles', 'error');
			return;
		}

		try {
			await organizationService.updateMemberRole(organization.id, memberId, newRole);
			setMembers(prev => prev.map(m => (m.id === memberId ? { ...m, role: newRole } : m)));
			showNotification('Role updated successfully', 'success');
		} catch (err) {
			console.error('Error updating role:', err);
			showNotification(err.response?.data?.error || 'Failed to update role', 'error');
		}
	};

	const formatDate = dateString => {
		return new Date(dateString).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'short',
			day: 'numeric',
		});
	};

	const getInitials = name => {
		return name
			.split(' ')
			.map(n => n[0])
			.join('')
			.toUpperCase()
			.substring(0, 2);
	};

	const stats = {
		total: members.length,
		leaders: members.filter(m => m.role === 'leader').length,
		members: members.filter(m => m.role === 'member').length,
		pendingRequests: joinRequests.length,
	};

	const isLeader = currentUser?.role === 'leader';

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
						<Link to='/contribution-history' className={styles.navItem}>
							<span className={styles.navIcon}>📋</span>
							<span>Contribution History</span>
						</Link>
						<Link to='/team-manage' className={`${styles.navItem} ${styles.active}`}>
							<span className={styles.navIcon}>👨‍👩‍👧‍👦</span>
							<span>Team Manage</span>
						</Link>
					</nav>
				</aside>
				<div className={styles.mainContent}>
					<div className={styles.loading}>Loading team data...</div>
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
					<Link to='/contribution-history' className={styles.navItem}>
						<span className={styles.navIcon}>📋</span>
						<span>Contribution History</span>
					</Link>
					<Link to='/team-manage' className={`${styles.navItem} ${styles.active}`}>
						<span className={styles.navIcon}>👨‍👩‍👧‍👦</span>
						<span>Team Manage</span>
					</Link>
				</nav>
			</aside>

			<div className={styles.mainContent}>
				<div className={styles.teamManage}>
					<div className={styles.header}>
						<div>
							<h1 className={styles.pageTitle}>Team Management</h1>
							{organization && <p className={styles.orgName}>{organization.name}</p>}
						</div>
						{isLeader ? (
							<button className={styles.addBtn} onClick={() => setShowAddModal(true)}>
								<span>➕</span>
								<span>Add Member</span>
							</button>
						) : (
							<button className={styles.addBtn} onClick={() => setShowJoinRequestModal(true)}>
								<span>📝</span>
								<span>Request to Join</span>
							</button>
						)}
					</div>

					<div className={styles.statsGrid}>
						<div className={styles.statCard}>
							<div className={styles.statIcon}>👥</div>
							<div className={styles.statInfo}>
								<h3>{stats.total}</h3>
								<p>Total Members</p>
							</div>
						</div>
						<div className={styles.statCard}>
							<div className={styles.statIcon}>👑</div>
							<div className={styles.statInfo}>
								<h3>{stats.leaders}</h3>
								<p>Leaders</p>
							</div>
						</div>
						<div className={styles.statCard}>
							<div className={styles.statIcon}>🧑‍🤝‍🧑</div>
							<div className={styles.statInfo}>
								<h3>{stats.members}</h3>
								<p>Members</p>
							</div>
						</div>
						{isLeader && (
							<div className={styles.statCard}>
								<div className={styles.statIcon}>📋</div>
								<div className={styles.statInfo}>
									<h3>{stats.pendingRequests}</h3>
									<p>Pending Requests</p>
								</div>
							</div>
						)}
					</div>

					{error && <div className={styles.error}>{error}</div>}

					{isLeader && joinRequests.length > 0 && (
						<div className={styles.requestsContainer}>
							<h2 className={styles.sectionTitle}>Join Requests</h2>
							<div className={styles.requestsList}>
								{joinRequests.map(request => (
									<div key={request.id} className={styles.requestCard}>
										<div className={styles.requestAvatar}>{getInitials(request.userName)}</div>
										<div className={styles.requestInfo}>
											<h3 className={styles.requestName}>{request.userName}</h3>
											<p className={styles.requestEmail}>{request.userEmail}</p>
											{request.message && <p className={styles.requestMessage}>{request.message}</p>}
											<span className={styles.requestDate}>Requested {formatDate(request.createdAt)}</span>
										</div>
										<div className={styles.requestActions}>
											<button
												className={styles.approveBtn}
												onClick={() => handleApproveJoinRequest(request.id)}
												title='Approve request'
											>
												✓ Approve
											</button>
											<button
												className={styles.rejectBtn}
												onClick={() => handleRejectJoinRequest(request.id)}
												title='Reject request'
											>
												✕ Reject
											</button>
										</div>
									</div>
								))}
							</div>
						</div>
					)}

					<div className={styles.membersContainer}>
						<h2 className={styles.sectionTitle}>Team Members</h2>
						{members.length === 0 ? (
							<div className={styles.emptyState}>No members found</div>
						) : (
							<div className={styles.membersList}>
								{members.map(member => (
									<div key={member.id} className={styles.memberCard}>
										<div className={styles.memberAvatar}>{getInitials(member.fullName)}</div>
										<div className={styles.memberInfo}>
											<h3 className={styles.memberName}>{member.fullName}</h3>
											<p className={styles.memberEmail}>{member.email}</p>
											<div className={styles.memberMeta}>
												<span className={`${styles.roleBadge} ${styles[member.role]}`}>
													{member.role.charAt(0).toUpperCase() + member.role.slice(1)}
												</span>
												<span className={styles.joinedDate}>Joined {formatDate(member.joinedAt)}</span>
											</div>
										</div>
										{isLeader && (
											<div className={styles.memberActions}>
												<select
													className={styles.roleSelect}
													value={member.role}
													onChange={e => handleUpdateRole(member.id, e.target.value)}
												>
													<option value='member'>Member</option>
													<option value='leader'>Leader</option>
												</select>
												<button
													className={styles.removeBtn}
													onClick={() => handleRemoveMember(member.id, member.fullName)}
													title='Remove member'
												>
													🗑️
												</button>
											</div>
										)}
									</div>
								))}
							</div>
						)}
					</div>
				</div>
			</div>

			{showAddModal && isLeader && (
				<div className={styles.modalBackdrop} onClick={() => setShowAddModal(false)}>
					<div className={styles.modalContent} onClick={e => e.stopPropagation()}>
						<div className={styles.modalHeader}>
							<h3>Add Team Member</h3>
							<button className={styles.closeBtn} onClick={() => setShowAddModal(false)}>
								✕
							</button>
						</div>
						<div className={styles.modalBody}>
							<label className={styles.inputLabel}>Search User by Name</label>
							<input
								type='text'
								className={styles.input}
								placeholder='Enter user name...'
								value={searchQuery}
								onChange={e => {
									setSearchQuery(e.target.value);
									handleSearchUsers(e.target.value);
								}}
							/>
							<p className={styles.helperText}>Search for users to add to your organization</p>

							{searching && <div className={styles.searchLoading}>Searching...</div>}

							{searchResults.length > 0 && (
								<div className={styles.searchResults}>
									{searchResults.map(user => (
										<div key={user.id} className={styles.searchResultItem}>
											<div className={styles.resultAvatar}>{getInitials(user.fullName)}</div>
											<div className={styles.resultInfo}>
												<div className={styles.resultName}>{user.fullName}</div>
												<div className={styles.resultEmail}>{user.email}</div>
											</div>
											<button className={styles.addResultBtn} onClick={() => handleAddMember(user.id)}>
												Add
											</button>
										</div>
									))}
								</div>
							)}

							{searchQuery.length >= 2 && !searching && searchResults.length === 0 && (
								<div className={styles.noResults}>No users found</div>
							)}
						</div>
						<div className={styles.modalFooter}>
							<button className={styles.cancelBtn} onClick={() => setShowAddModal(false)}>
								Cancel
							</button>
						</div>
					</div>
				</div>
			)}

			{showJoinRequestModal && !isLeader && (
				<div className={styles.modalBackdrop} onClick={() => setShowJoinRequestModal(false)}>
					<div className={styles.modalContent} onClick={e => e.stopPropagation()}>
						<div className={styles.modalHeader}>
							<h3>Request to Join Organization</h3>
							<button className={styles.closeBtn} onClick={() => setShowJoinRequestModal(false)}>
								✕
							</button>
						</div>
						<div className={styles.modalBody}>
							<p className={styles.joinRequestText}>
								Send a request to join <strong>{organization?.name}</strong>. Organization leaders will review your
								request.
							</p>
						</div>
						<div className={styles.modalFooter}>
							<button className={styles.cancelBtn} onClick={() => setShowJoinRequestModal(false)}>
								Cancel
							</button>
							<button className={styles.submitBtn} onClick={handleSendJoinRequest}>
								Send Request
							</button>
						</div>
					</div>
				</div>
			)}

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

export default TeamManage;
