import { useState, useEffect } from 'react';
import RequestDetailsModal from '../../RequestDetailsModal/RequestDetailsModal/RequestDetailsModal';
import { assignmentService } from '../../../../services';
import styles from './AssignmentRequests.module.css';

function AssignmentRequests() {
	const [selectedRequest, setSelectedRequest] = useState(null);
	const [pendingRequests, setPendingRequests] = useState([]);
	const [approvedRequests, setApprovedRequests] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState('');
	const [notification, setNotification] = useState(null);

	// Fetch assignment requests on component mount
	useEffect(() => {
		fetchRequests();
	}, []);

	// Auto-hide notification after 5 seconds
	useEffect(() => {
		if (notification) {
			const timer = setTimeout(() => {
				setNotification(null);
			}, 5000);
			return () => clearTimeout(timer);
		}
	}, [notification]);

	const showNotification = (message, type = 'success') => {
		setNotification({ message, type });
	};

	const fetchRequests = async () => {
		try {
			setLoading(true);
			setError('');

			// Fetch pending and approved requests in parallel
			const [pendingResponse, approvedResponse] = await Promise.all([
				assignmentService.getRequests({ status: 'pending' }),
				assignmentService.getRequests({ status: 'approved' }),
			]);

			// Handle both formats: data.requests or data array
			const pendingData = pendingResponse.requests || [];
			const approvedData = approvedResponse.requests || [];

			// Sort by createdAt in descending order (newest first)
			const sortedPending = [...pendingData].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
			const sortedApproved = [...approvedData].sort(
				(a, b) => new Date(b.approvalDate || b.createdAt) - new Date(a.approvalDate || a.createdAt)
			);

			setPendingRequests(sortedPending);
			setApprovedRequests(sortedApproved);
		} catch (err) {
			console.error('Error fetching requests:', err);
			setError('Failed to load assignment requests');
		} finally {
			setLoading(false);
		}
	};

	const handleApprove = async (requestId, notes) => {
		try {
			await assignmentService.approveRequest(requestId, notes);
			// Refresh the requests list
			await fetchRequests();
			setSelectedRequest(null);
			showNotification('Request approved successfully!', 'success');
		} catch (err) {
			console.error('Error approving request:', err);
			showNotification('Failed to approve request: ' + (err.message || 'Unknown error'), 'error');
		}
	};

	const handleReject = async (requestId, reason) => {
		try {
			await assignmentService.rejectRequest(requestId, reason);
			// Refresh the requests list
			await fetchRequests();
			setSelectedRequest(null);
			showNotification('Request rejected successfully!', 'success');
		} catch (err) {
			console.error('Error rejecting request:', err);
			showNotification('Failed to reject request: ' + (err.message || 'Unknown error'), 'error');
		}
	};

	if (loading) {
		return (
			<div className={styles.assignmentRequests}>
				<div className={styles.loading}>Loading assignment requests...</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className={styles.assignmentRequests}>
				<div className={styles.error}>{error}</div>
			</div>
		);
	}

	return (
		<div className={styles.assignmentRequests}>
			<h2 className={styles.pageTitle}>Assignment Requests</h2>

			{/* Pending Section */}
			<section className={styles.section}>
				<h3 className={styles.sectionTitle}>Pending ({pendingRequests.length})</h3>
				<div className={styles.tableWrapper}>
					{pendingRequests.length === 0 ? (
						<div className={styles.emptyState}>No pending requests</div>
					) : (
						<table className={styles.table}>
							<thead>
								<tr>
									<th>Group Leader</th>
									<th>Team Name</th>
									<th>Zone Requested</th>
									<th>Submission Date</th>
									<th>Actions</th>
								</tr>
							</thead>
							<tbody>
								{pendingRequests.map(request => {
									return (
										<tr key={request.createdAt + request.zoneName}>
											<td>{request.requestedByName || 'N/A'}</td>
											<td>{request.organizationName || 'N/A'}</td>
											<td>{request.zoneName || request.zoneId}</td>
											<td>{request.createdAt ? new Date(request.createdAt).toLocaleDateString() : 'N/A'}</td>
											<td>
												<button className={styles.detailsBtn} onClick={() => setSelectedRequest(request)}>
													Show Details
												</button>
											</td>
										</tr>
									);
								})}
							</tbody>
						</table>
					)}
				</div>
			</section>

			{/* Approved Section */}
			<section className={styles.section}>
				<h3 className={styles.sectionTitle}>Approved ({approvedRequests.length})</h3>
				<div className={styles.tableWrapper}>
					{approvedRequests.length === 0 ? (
						<div className={styles.emptyState}>No approved requests</div>
					) : (
						<table className={styles.table}>
							<thead>
								<tr>
									<th>Group Leader</th>
									<th>Team Name</th>
									<th>Zone Requested</th>
									<th>Approval Date</th>
								</tr>
							</thead>
							<tbody>
								{approvedRequests.map(request => (
									<tr key={request.createdAt + request.zoneName}>
										<td>{request.requestedByName || 'N/A'}</td>
										<td>{request.organizationName || 'N/A'}</td>
										<td>{request.zoneName || request.zoneId}</td>
										<td>{request.approvalDate ? new Date(request.approvalDate).toLocaleDateString() : 'N/A'}</td>
									</tr>
								))}
							</tbody>
						</table>
					)}
				</div>
			</section>

			{/* Details Modal */}
			{selectedRequest && (
				<RequestDetailsModal
					request={selectedRequest}
					onClose={() => setSelectedRequest(null)}
					onApprove={handleApprove}
					onReject={handleReject}
				/>
			)}

			{/* Notification Toast */}
			{notification && (
				<div className={`${styles.notification} ${styles[notification.type]}`}>
					<div className={styles.notificationContent}>
						{notification.type === 'success' ? (
							<svg width='24' height='24' viewBox='0 0 24 24' fill='none' className={styles.notificationIcon}>
								<circle cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='2' />
								<path
									d='M9 12l2 2 4-4'
									stroke='currentColor'
									strokeWidth='2'
									strokeLinecap='round'
									strokeLinejoin='round'
								/>
							</svg>
						) : (
							<svg width='24' height='24' viewBox='0 0 24 24' fill='none' className={styles.notificationIcon}>
								<circle cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='2' />
								<path d='M12 8v4m0 4h.01' stroke='currentColor' strokeWidth='2' strokeLinecap='round' />
							</svg>
						)}
						<span>{notification.message}</span>
					</div>
					<button className={styles.notificationClose} onClick={() => setNotification(null)}>
						<svg width='18' height='18' viewBox='0 0 24 24' fill='none'>
							<path d='M18 6L6 18M6 6l12 12' stroke='currentColor' strokeWidth='2' strokeLinecap='round' />
						</svg>
					</button>
				</div>
			)}
		</div>
	);
}

export default AssignmentRequests;
