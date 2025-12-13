import { useState } from 'react';
import RequestDetailsModal from '../RequestDetailsModal/RequestDetailsModal';
import styles from './AssignmentRequests.module.css';

function AssignmentRequests() {
	const [selectedRequest, setSelectedRequest] = useState(null);

	// Mock data - replace with API call
	const pendingRequests = [
		{
			id: 1,
			groupLeader: 'Md. Asif Rahman',
			teamName: 'Feni Rescue Team',
			zoneRequested: 'Zone-5',
			submissionDate: '2025-05-10',
			teamMembers: [
				{ name: 'Nurul Amin', role: 'Relief Coordinator' },
				{ name: 'Jamal Uddin', role: 'Logistics Lead' },
				{ name: 'Imran Hossain', role: 'Medical Assistant' },
				{ name: 'Sakib Mahmud', role: 'Communication Officer' },
			],
			evidences: [
				'https://images.unsplash.com/photo-1593113598332-cd288d649433?w=800&h=600&fit=crop',
				'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=800&h=600&fit=crop',
				'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop',
			],
		},
		{
			id: 2,
			groupLeader: 'Farhan Chowdhury',
			teamName: 'Youth Supporters',
			zoneRequested: 'Zone-8',
			submissionDate: '2025-05-09',
			teamMembers: [
				{ name: 'Rashid Ahmed', role: 'Team Lead' },
				{ name: 'Nadia Islam', role: 'Medical Officer' },
				{ name: 'Karim Hossain', role: 'Supply Manager' },
			],
			evidences: ['https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&h=600&fit=crop'],
		},
		{
			id: 3,
			groupLeader: 'Salman Rahman',
			teamName: 'Unity Responders',
			zoneRequested: 'Zone-2',
			submissionDate: '2025-05-11',
			teamMembers: [
				{ name: 'Fahim Rahman', role: 'Operations Lead' },
				{ name: 'Sabrina Akhter', role: 'Health Coordinator' },
			],
			evidences: [
				'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=800&h=600&fit=crop',
				'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=800&h=600&fit=crop',
			],
		},
		{
			id: 4,
			groupLeader: 'Mahfuz Ahmed',
			teamName: 'Delta Force',
			zoneRequested: 'Zone-1',
			submissionDate: '2025-05-07',
			teamMembers: [
				{ name: 'Tanvir Ahmed', role: 'Field Commander' },
				{ name: 'Zara Khan', role: 'Resource Manager' },
				{ name: 'Arif Hasan', role: 'Communications' },
			],
			evidences: ['https://images.unsplash.com/photo-1593113598332-cd288d649433?w=800&h=600&fit=crop'],
		},
	];

	const approvedRequests = [
		{
			id: 5,
			groupLeader: 'Tanvir Hossain',
			teamName: 'RapidRelief BD',
			zoneRequested: 'Zone-1',
			approvalDate: '2025-05-08',
		},
	];

	const handleShowDetails = request => {
		setSelectedRequest(request);
	};

	const handleCloseModal = () => {
		setSelectedRequest(null);
	};

	const handleApprove = requestId => {
		console.log('Approved:', requestId);
		// Add API call here
		handleCloseModal();
	};

	const handleReject = requestId => {
		console.log('Rejected:', requestId);
		// Add API call here
		handleCloseModal();
	};

	return (
		<div className={styles.assignmentRequests}>
			<h2 className={styles.pageTitle}>Assignment Requests</h2>

			{/* Pending Section */}
			<section className={styles.section}>
				<h3 className={styles.sectionTitle}>Pending</h3>
				<div className={styles.tableWrapper}>
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
									<td>{request.groupLeader}</td>
									<td>{request.teamName}</td>
									<td>{request.zoneRequested}</td>
									<td>{request.submissionDate}</td>
									<td>
										<button className={styles.detailsBtn} onClick={() => handleShowDetails(request)}>
											Show Details
										</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</section>

			{/* Approved Section */}
			<section className={styles.section}>
				<h3 className={styles.sectionTitle}>Approved</h3>
				<div className={styles.tableWrapper}>
					<table className={styles.table}>
						<thead>
							<tr>
								<th>Group Leader</th>
								<th>Team Name</th>
								<th>Zone Requested</th>
								<th>Group Leader</th>
							</tr>
						</thead>
						<tbody>
							{approvedRequests.map(request => (
								<tr key={request.id}>
									<td>{request.groupLeader}</td>
									<td>{request.teamName}</td>
									<td>{request.zoneRequested}</td>
									<td>{request.approvalDate}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</section>

			{/* Details Modal */}
			{selectedRequest && (
				<RequestDetailsModal
					request={selectedRequest}
					onClose={handleCloseModal}
					onApprove={handleApprove}
					onReject={handleReject}
				/>
			)}
		</div>
	);
}

export default AssignmentRequests;
