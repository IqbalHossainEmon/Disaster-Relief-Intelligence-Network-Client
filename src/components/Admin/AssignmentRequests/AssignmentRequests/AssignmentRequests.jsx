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

	// Fetch assignment requests on component mount
	useEffect(() => {
		fetchRequests();
	}, []);

	const fetchRequests = async () => {
		try {
			setLoading(true);
			setError('');

			// Fetch pending and approved requests in parallel
			const [pendingResponse, approvedResponse] = await Promise.all([
				assignmentService.getRequests({ status: 'pending' }),
				assignmentService.getRequests({ status: 'approved' }),
			]);

			setPendingRequests(pendingResponse.requests || []);
			setApprovedRequests(approvedResponse.requests || []);
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
		} catch (err) {
			console.error('Error approving request:', err);
			alert('Failed to approve request: ' + (err.message || 'Unknown error'));
		}
	};

	const handleReject = async (requestId, reason) => {
		try {
			await assignmentService.rejectRequest(requestId, reason);
			// Refresh the requests list
			await fetchRequests();
			setSelectedRequest(null);
		} catch (err) {
			console.error('Error rejecting request:', err);
			alert('Failed to reject request: ' + (err.message || 'Unknown error'));
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
								{pendingRequests.map(request => (
									<tr key={request.id}>
										<td>{request.requestedBy?.fullName || request.requestedBy?.full_name || 'N/A'}</td>
										<td>{request.organization?.name || 'N/A'}</td>
										<td>{request.zone?.name || request.zoneId}</td>
										<td>
											{new Date(request.createdAt || request.created_at || request.submissionDate).toLocaleDateString()}
										</td>
										<td>
											<button className={styles.detailsBtn} onClick={() => setSelectedRequest(request)}>
												Show Details
											</button>
										</td>
									</tr>
								))}
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
									<tr key={request.id}>
										<td>{request.requestedBy?.fullName || request.requestedBy?.full_name || 'N/A'}</td>
										<td>{request.organization?.name || 'N/A'}</td>
										<td>{request.zone?.name || request.zoneId}</td>
										<td>
											{new Date(request.approvedAt || request.approved_at || request.approvalDate).toLocaleDateString()}
										</td>
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
		</div>
	);
}

export default AssignmentRequests;
