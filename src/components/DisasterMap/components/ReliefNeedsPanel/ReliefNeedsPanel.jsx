import { useState, useEffect } from 'react';
import NeedsList from '../../../ZoneDetails/components/NeedsList/NeedsList';
import AssignmentApplicationModal from '../AssignmentApplicationModal/AssignmentApplicationModal';
import assignmentService from '../../../../services/assignmentService';
import { authService } from '../../../../services';
import styles from './ReliefNeedsPanel.module.css';

const ReliefNeedsPanel = ({ zone, zoneDetails, onClose, onZoneUpdate }) => {
	const [currentZoneId, setCurrentZoneId] = useState(zone.id);
	const [showApplicationModal, setShowApplicationModal] = useState(false);
	const [applicationStatus, setApplicationStatus] = useState(null);
	const [currentUser, setCurrentUser] = useState(null);
	const [userLoading, setUserLoading] = useState(true);

	// Fetch current user from backend
	useEffect(() => {
		const fetchCurrentUser = async () => {
			try {
				setUserLoading(true);
				const response = await authService.getCurrentUser();
				setCurrentUser(response.user || response.data?.user);
			} catch (err) {
				console.error('Error fetching current user:', err);
				setCurrentUser(null);
			} finally {
				setUserLoading(false);
			}
		};

		fetchCurrentUser();
	}, []);

	const userRole = currentUser?.role;
	const userOrgId = currentUser?.organizationId;

	// Reset modal state when zone changes
	useEffect(() => {
		if (zone.id !== currentZoneId) {
			setCurrentZoneId(zone.id);
			setShowApplicationModal(false);
			setApplicationStatus(null);
		}
	}, [zone.id, currentZoneId]);

	// Check if user can apply for assignment
	const canApplyForAssignment = () => {
		// Wait for user data to load
		if (userLoading || !currentUser) return false;

		// Only team leaders can apply (not admins or members)
		if (userRole !== 'leader') return false;

		// Must have an organization
		if (!userOrgId) return false;

		// Check if current user's organization has already applied/assigned to this zone
		if (zoneDetails?.assignments && zoneDetails.assignments.length > 0) {
			const hasUserOrgAssigned = zoneDetails.assignments.some(assignment => assignment.organizationId === userOrgId);

			// Can't apply if user's org already has an assignment
			if (hasUserOrgAssigned) {
				return false;
			}
		}

		return true;
	};

	const handleApplyClick = () => {
		setShowApplicationModal(true);
		setApplicationStatus(null);
	};

	const handleApplicationSubmit = async (formData, evidenceFiles) => {
		try {
			// Submit assignment request
			const response = await assignmentService.submitRequest({
				zoneId: zone.id,
				proposedTeamSize: parseInt(formData.proposedTeamSize),
				estimatedDuration: formData.estimatedDuration,
				capabilities: formData.capabilities,
				resources: formData.resources || undefined,
				notes: formData.notes || undefined,
			});

			console.log('Assignment request response:', response);

			// Upload evidence files if any
			if (evidenceFiles && evidenceFiles.length > 0) {
				// Backend returns: { success: true, data: { request: {...}, message: "..." } }
				// API interceptor already unwraps response.data, so we get the data object directly
				const requestId = response?.data?.request?.id || response?.request?.id;
				console.log('Extracted requestId:', requestId);

				if (requestId) {
					const uploadFormData = new FormData();
					evidenceFiles.forEach(file => {
						uploadFormData.append('files', file);
					});
					uploadFormData.append('requestId', requestId);

					console.log('Uploading evidence files:', evidenceFiles.length);
					// Upload evidence
					await assignmentService.uploadEvidence(uploadFormData);
				} else {
					console.error('No request ID found in response:', response);
				}
			}

			setApplicationStatus('success');
			setShowApplicationModal(false);

			// Refresh zone data to show assigned team
			if (onZoneUpdate) {
				onZoneUpdate();
			}

			// Show success message
			setTimeout(() => {
				setApplicationStatus(null);
			}, 5000);
		} catch (error) {
			console.error('Error submitting application:', error);
			// Better error message extraction
			const errorMessage = error?.message || error?.error?.message || 'Failed to submit application';
			throw new Error(errorMessage);
		}
	};

	if (!zoneDetails) {
		return (
			<div className={styles.panel}>
				<div className={styles.header}>
					<h2>Zone Details</h2>
					<button className={styles.closeBtn} onClick={onClose}>
						✕
					</button>
				</div>
				<div className={styles.content}>
					<p className={styles.noData}>No details available for this zone</p>
				</div>
			</div>
		);
	}

	return (
		<div className={styles.panel}>
			<div className={styles.header}>
				<div>
					<h2>{zone.name}</h2>
					<p className={styles.location}>{zone.location}</p>
				</div>
				<button className={styles.closeBtn} onClick={onClose}>
					✕
				</button>
			</div>

			<div className={styles.content}>
				<div className={styles.statsGrid}>
					<div className={styles.statItem}>
						<span className={styles.statLabel}>Severity</span>
						<div className={`${styles.badge} ${styles[zone.severity]}`}>
							{zone.severity === 'critical' && '🔴 Critical'}
							{zone.severity === 'high' && '🟠 High'}
							{zone.severity === 'moderate' && '🟡 Moderate'}
							{zone.severity === 'low' && '🔵 Low'}
							{zone.severity === 'safe' && '🟢 Safe'}
						</div>
					</div>
					<div className={styles.statItem}>
						<span className={styles.statLabel}>Population</span>
						<span className={styles.statValue}>{zone.population?.toLocaleString() || 'N/A'}</span>
					</div>
					<div className={styles.statItem}>
						<span className={styles.statLabel}>Affected</span>
						<span className={styles.statValue}>{zone.affectedPeople?.toLocaleString() || '0'}</span>
					</div>
					<div className={styles.statItem}>
						<span className={styles.statLabel}>Team Status</span>
						<span className={styles.statValue}>{zone.hasAssignedTeam ? '✓ Assigned' : '⚠ Unassigned'}</span>
					</div>
				</div>

				<div className={styles.description}>
					<p>{zone.description || 'No description available'}</p>
				</div>

				{zoneDetails.assignments && zoneDetails.assignments.length > 0 && (
					<div className={styles.assignmentSection}>
						<h3 className={styles.sectionTitle}>Assigned Team</h3>
						{zoneDetails.assignments.map((assignment, index) => (
							<div key={`${assignment.id}-${index}`} className={styles.assignmentCard}>
								<div className={styles.assignmentHeader}>
									<div>
										<h4 className={styles.teamName}>🏢 {assignment.organization?.name || 'Unknown Team'}</h4>
										<p className={styles.teamMembers}>👥 {assignment.teamSize} members</p>
									</div>
									<span className={`${styles.statusBadge} ${styles[assignment.completionStatus]}`}>
										{assignment.completionStatus === 'in_progress' && '🔄 Active'}
										{assignment.completionStatus === 'completed' && '✅ Completed'}
										{assignment.completionStatus === 'pending' && '⏳ Pending'}
									</span>
								</div>
								{assignment.notes && <p className={styles.assignmentNotes}>{assignment.notes}</p>}
								<div className={styles.assignmentDates}>
									<span>📅 Started: {new Date(assignment.startDate).toLocaleDateString()}</span>
									{assignment.estimatedEndDate && (
										<span>🎯 Est. End: {new Date(assignment.estimatedEndDate).toLocaleDateString()}</span>
									)}
								</div>
							</div>
						))}
					</div>
				)}

				<h3 className={styles.sectionTitle}>Relief Needs</h3>
				<div className={styles.needsContainer}>
					<NeedsList reliefNeeds={zoneDetails.reliefNeeds} />
				</div>
			</div>

			{applicationStatus === 'success' && (
				<div className={styles.successMessage}>
					✅ Application submitted successfully! The admin will review your request.
				</div>
			)}

			{canApplyForAssignment() && (
				<div className={styles.footer}>
					<button className={styles.applyBtn} onClick={handleApplyClick}>
						Apply for Assignment
					</button>
				</div>
			)}

			{showApplicationModal && (
				<AssignmentApplicationModal
					zone={zone}
					onClose={() => setShowApplicationModal(false)}
					onSubmit={handleApplicationSubmit}
				/>
			)}
		</div>
	);
};

export default ReliefNeedsPanel;
