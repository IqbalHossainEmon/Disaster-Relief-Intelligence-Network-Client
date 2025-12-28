import { useState, useEffect } from 'react';
import styles from './UserManagement.module.css';
import { adminService } from '../../../../services';

function UserManagement() {
	const [users, setUsers] = useState([]);
	const [filteredUsers, setFilteredUsers] = useState([]);
	const [searchQuery, setSearchQuery] = useState('');
	const [loading, setLoading] = useState(true);
	const [editingUser, setEditingUser] = useState(null);
	const [showEditModal, setShowEditModal] = useState(false);
	const [notification, setNotification] = useState({ show: false, message: '', type: '' });

	useEffect(() => {
		fetchUsers();
	}, []);

	useEffect(() => {
		if (searchQuery.trim()) {
			const filtered = users.filter(
				user =>
					user.fullName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
					user.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
					user.role?.toLowerCase().includes(searchQuery.toLowerCase())
			);
			setFilteredUsers(filtered);
		} else {
			setFilteredUsers(users);
		}
	}, [searchQuery, users]);

	const fetchUsers = async () => {
		try {
			setLoading(true);
			const response = await adminService.getAllUsers();
			const usersData = response.data || response.users || response || [];
			setUsers(usersData);
			setFilteredUsers(usersData);
		} catch (error) {
			console.error('Failed to fetch users:', error);
			showNotification('Failed to load users', 'error');
		} finally {
			setLoading(false);
		}
	};

	const handleRoleChange = async (userId, newRole) => {
		try {
			await adminService.updateUserRole(userId, { role: newRole });
			await fetchUsers();
			showNotification('User role updated successfully', 'success');
		} catch (error) {
			console.error('Failed to update role:', error);
			showNotification(error.response?.data?.error || 'Failed to update user role', 'error');
		}
	};

	const handleDeleteUser = async userId => {
		if (!window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
			return;
		}

		try {
			await adminService.deleteUser(userId);
			await fetchUsers();
			showNotification('User deleted successfully', 'success');
		} catch (error) {
			console.error('Failed to delete user:', error);
			showNotification(error.response?.data?.error || 'Failed to delete user', 'error');
		}
	};

	const handleEditUser = user => {
		setEditingUser({ ...user });
		setShowEditModal(true);
	};

	const handleSaveEdit = async () => {
		try {
			await adminService.updateUser(editingUser.id, {
				fullName: editingUser.fullName,
				email: editingUser.email,
			});
			await fetchUsers();
			setShowEditModal(false);
			setEditingUser(null);
			showNotification('User updated successfully', 'success');
		} catch (error) {
			console.error('Failed to update user:', error);
			showNotification(error.response?.data?.error || 'Failed to update user', 'error');
		}
	};

	const showNotification = (message, type) => {
		setNotification({ show: true, message, type });
		setTimeout(() => {
			setNotification({ show: false, message: '', type: '' });
		}, 5000);
	};

	const getRoleBadgeClass = role => {
		switch (role?.toLowerCase()) {
			case 'admin':
				return styles.roleAdmin;
			case 'leader':
				return styles.roleLeader;
			case 'member':
				return styles.roleMember;
			default:
				return styles.roleDefault;
		}
	};

	if (loading) {
		return (
			<div className={styles.userManagement}>
				<div className={styles.loading}>Loading users...</div>
			</div>
		);
	}

	return (
		<div className={styles.userManagement}>
			<div className={styles.header}>
				<h2 className={styles.pageTitle}>User Management</h2>
				<div className={styles.searchBox}>
					<svg className={styles.searchIcon} width='20' height='20' viewBox='0 0 24 24' fill='none'>
						<circle cx='11' cy='11' r='8' stroke='currentColor' strokeWidth='2' />
						<path d='m21 21-4.35-4.35' stroke='currentColor' strokeWidth='2' strokeLinecap='round' />
					</svg>
					<input
						type='text'
						placeholder='Search by name, email, or role...'
						value={searchQuery}
						onChange={e => setSearchQuery(e.target.value)}
						className={styles.searchInput}
					/>
				</div>
			</div>

			<div className={styles.statsGrid}>
				<div className={styles.statCard}>
					<div className={styles.statIcon}>👥</div>
					<div className={styles.statContent}>
						<div className={styles.statValue}>{users.length}</div>
						<div className={styles.statLabel}>Total Users</div>
					</div>
				</div>
				<div className={styles.statCard}>
					<div className={styles.statIcon}>👑</div>
					<div className={styles.statContent}>
						<div className={styles.statValue}>{users.filter(u => u.role === 'admin').length}</div>
						<div className={styles.statLabel}>Admins</div>
					</div>
				</div>
				<div className={styles.statCard}>
					<div className={styles.statIcon}>⭐</div>
					<div className={styles.statContent}>
						<div className={styles.statValue}>{users.filter(u => u.role === 'leader').length}</div>
						<div className={styles.statLabel}>Leaders</div>
					</div>
				</div>
				<div className={styles.statCard}>
					<div className={styles.statIcon}>👤</div>
					<div className={styles.statContent}>
						<div className={styles.statValue}>{users.filter(u => u.role === 'member').length}</div>
						<div className={styles.statLabel}>Members</div>
					</div>
				</div>
			</div>

			<div className={styles.tableContainer}>
				<table className={styles.table}>
					<thead>
						<tr>
							<th>User</th>
							<th>Email</th>
							<th>Role</th>
							<th>Organization</th>
							<th>Joined</th>
							<th>Actions</th>
						</tr>
					</thead>
					<tbody>
						{filteredUsers.length === 0 ? (
							<tr>
								<td colSpan='6' className={styles.emptyState}>
									{searchQuery ? 'No users found matching your search' : 'No users available'}
								</td>
							</tr>
						) : (
							filteredUsers.map(user => (
								<tr key={user.id}>
									<td>
										<div className={styles.userCell}>
											<div className={styles.userAvatar}>{user.fullName?.charAt(0).toUpperCase() || 'U'}</div>
											<span className={styles.userName}>{user.fullName || 'N/A'}</span>
										</div>
									</td>
									<td>{user.email}</td>
									<td>
										<select
											value={user.role}
											onChange={e => handleRoleChange(user.id, e.target.value)}
											className={`${styles.roleSelect} ${getRoleBadgeClass(user.role)}`}
										>
											<option value='member'>Member</option>
											<option value='leader'>Leader</option>
											<option value='admin'>Admin</option>
										</select>
									</td>
									<td>{user.organizationName || 'No Organization'}</td>
									<td>{user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}</td>
									<td>
										<div className={styles.actions}>
											<button className={styles.editBtn} onClick={() => handleEditUser(user)} title='Edit User'>
												✏️
											</button>
											<button
												className={styles.deleteBtn}
												onClick={() => handleDeleteUser(user.id)}
												title='Delete User'
											>
												🗑️
											</button>
										</div>
									</td>
								</tr>
							))
						)}
					</tbody>
				</table>
			</div>

			{showEditModal && (
				<>
					<div className={styles.modalOverlay} onClick={() => setShowEditModal(false)} />
					<div className={styles.modal}>
						<div className={styles.modalHeader}>
							<h3>Edit User</h3>
							<button className={styles.closeBtn} onClick={() => setShowEditModal(false)}>
								×
							</button>
						</div>
						<div className={styles.modalBody}>
							<div className={styles.formGroup}>
								<label>Full Name</label>
								<input
									type='text'
									value={editingUser?.fullName || ''}
									onChange={e => setEditingUser({ ...editingUser, fullName: e.target.value })}
									className={styles.input}
								/>
							</div>
							<div className={styles.formGroup}>
								<label>Email</label>
								<input
									type='email'
									value={editingUser?.email || ''}
									onChange={e => setEditingUser({ ...editingUser, email: e.target.value })}
									className={styles.input}
								/>
							</div>
						</div>
						<div className={styles.modalFooter}>
							<button className={styles.cancelBtn} onClick={() => setShowEditModal(false)}>
								Cancel
							</button>
							<button className={styles.saveBtn} onClick={handleSaveEdit}>
								Save Changes
							</button>
						</div>
					</div>
				</>
			)}

			{notification.show && (
				<div className={`${styles.notification} ${styles[notification.type]}`}>{notification.message}</div>
			)}
		</div>
	);
}

export default UserManagement;
