import { useState, useEffect } from 'react';
import { assignmentService } from '../../../../services';
import styles from './RequestDetailsModal.module.css';

function RequestDetailsModal({ request, onClose, onApprove, onReject }) {
	const [currentImageIndex, setCurrentImageIndex] = useState(0);
	const [isClosing, setIsClosing] = useState(false);
	const [isImageViewerOpen, setIsImageViewerOpen] = useState(false);
	const [isImageLoading, setIsImageLoading] = useState(true);
	const [showRejectModal, setShowRejectModal] = useState(false);
	const [rejectReason, setRejectReason] = useState('');
	const [requestDetails, setRequestDetails] = useState(null);
	const [loading, setLoading] = useState(true);

	// Fetch full request details including evidence
	useEffect(() => {
		const fetchRequestDetails = async () => {
			try {
				setLoading(true);
				const response = await assignmentService.getRequestDetails(request.id);
				console.log('Full request details:', response);
				setRequestDetails(response.data || response);
			} catch (err) {
				console.error('Error fetching request details:', err);
				// Fallback to the request object passed as prop
				setRequestDetails(null);
			} finally {
				setLoading(false);
			}
		};

		fetchRequestDetails();
	}, [request.id]);

	// Extract evidence URLs from the fetched details
	const evidenceUrls = requestDetails?.evidence?.map(ev => ev.fileUrl).filter(Boolean) || [];

	// Extract team members from the fetched details or fallback to request prop
	const teamMembers = requestDetails?.members || request.teamMembers || request.members || [];

	// Use fetched details or fallback to request prop
	const displayData = requestDetails || request;

	useEffect(() => {
		// Calculate scrollbar width and prevent layout shift
		const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

		// Prevent body scroll when modal is open
		document.body.style.overflow = 'hidden';
		document.body.style.paddingRight = `${scrollbarWidth}px`;

		return () => {
			document.body.style.overflow = 'unset';
			document.body.style.paddingRight = '0px';
		};
	}, []);

	const handlePrevImage = () => {
		setIsImageLoading(true);
		setCurrentImageIndex(prev => (prev === 0 ? evidenceUrls.length - 1 : prev - 1));
	};

	const handleNextImage = () => {
		setIsImageLoading(true);
		setCurrentImageIndex(prev => (prev === evidenceUrls.length - 1 ? 0 : prev + 1));
	};

	const handleClose = () => {
		setIsClosing(true);
		// Restore body scroll immediately when closing starts
		document.body.style.overflow = 'unset';
		document.body.style.paddingRight = '0px';
		setTimeout(() => {
			onClose();
		}, 300); // Match animation duration
	};

	const handleBackdropClick = e => {
		if (e.target === e.currentTarget) {
			handleClose();
		}
	};

	const handleRejectClick = () => {
		setShowRejectModal(true);
	};

	const handleRejectConfirm = () => {
		if (rejectReason.trim()) {
			setIsClosing(true);
			setShowRejectModal(false);
			// Restore body scroll immediately
			document.body.style.overflow = 'unset';
			document.body.style.paddingRight = '0px';
			setTimeout(() => onReject(request._id || request.id, rejectReason), 300);
		}
	};

	const handleRejectCancel = () => {
		setShowRejectModal(false);
		setRejectReason('');
	};

	const handleApproveClick = () => {
		setIsClosing(true);
		// Restore body scroll immediately
		document.body.style.overflow = 'unset';
		document.body.style.paddingRight = '0px';
		setTimeout(() => onApprove(request._id || request.id), 300);
	};

	return (
		<div className={`${styles.modalBackdrop} ${isClosing ? styles.closing : ''}`} onClick={handleBackdropClick}>
			<div className={`${styles.modalContent} ${isClosing ? styles.closing : ''}`}>
				<button className={styles.closeBtn} onClick={handleClose}>
					<svg width='24' height='24' viewBox='0 0 24 24' fill='none'>
						<path
							d='M18 6L6 18M6 6l12 12'
							stroke='currentColor'
							strokeWidth='2'
							strokeLinecap='round'
							strokeLinejoin='round'
						/>
					</svg>
				</button>

				<h2 className={styles.modalTitle}>Assignment Request Details</h2>

				{loading ? (
					<div className={styles.loadingContainer}>
						<div className={styles.spinner}></div>
						<p>Loading request details...</p>
					</div>
				) : (
					<>
						<div className={styles.detailsGrid}>
							<div className={styles.leftColumn}>
								<div className={styles.infoGroup}>
									<p className={styles.infoLabel}>Group Leader Name:</p>
									<p className={styles.infoValue}>
										{displayData.requestedByName ||
											displayData.requestedBy?.fullName ||
											request.requestedByName ||
											'N/A'}
									</p>
								</div>

								<div className={styles.infoGroup}>
									<p className={styles.infoLabel}>Team Name:</p>
									<p className={styles.infoValue}>
										{displayData.organizationName ||
											displayData.organization?.name ||
											request.organizationName ||
											'N/A'}
									</p>
								</div>

								<div className={styles.infoGroup}>
									<p className={styles.infoLabel}>Zone Requested:</p>
									<p className={styles.infoValue}>
										{displayData.zoneName || displayData.zone?.name || request.zoneName || 'N/A'}
									</p>
								</div>

								<div className={styles.infoGroup}>
									<p className={styles.infoLabel}>Submission Date:</p>
									<p className={styles.infoValue}>
										{displayData.createdAt || request.createdAt
											? new Date(displayData.createdAt || request.createdAt).toLocaleDateString()
											: 'N/A'}
									</p>
								</div>
							</div>

							<div className={styles.rightColumn}>
								<h3 className={styles.teamMembersTitle}>Team Members</h3>
								<ol className={styles.teamMembersList}>
									{teamMembers.map((member, index) => (
										<li key={index} className={styles.teamMember}>
											{member.fullName || member.full_name || member.name || 'N/A'} — {member.role || 'Team Member'}
										</li>
									))}
								</ol>
								{teamMembers.length === 0 && <p className={styles.noMembers}>No team members listed</p>}
							</div>
						</div>

						{/* Evidence Section */}
						<div className={styles.evidenceSection}>
							<h3 className={styles.evidenceTitle}>Evidences</h3>

							{evidenceUrls && evidenceUrls.length > 0 ? (
								<div className={styles.imageCarousel}>
									<button
										className={`${styles.carouselBtn} ${styles.prevBtn}`}
										onClick={handlePrevImage}
										disabled={evidenceUrls.length <= 1}
									>
										<svg width='32' height='32' viewBox='0 0 24 24' fill='none'>
											<path
												d='M15 18l-6-6 6-6'
												stroke='currentColor'
												strokeWidth='2'
												strokeLinecap='round'
												strokeLinejoin='round'
											/>
										</svg>
									</button>

									<div className={styles.imageContainer}>
										{isImageLoading && (
											<div className={styles.imageLoader}>
												<div className={styles.spinner}></div>
											</div>
										)}
										<img
											src={evidenceUrls[currentImageIndex]}
											alt={`Evidence ${currentImageIndex + 1}`}
											className={styles.evidenceImage}
											onClick={() => setIsImageViewerOpen(true)}
											onLoad={() => setIsImageLoading(false)}
											style={{
												cursor: 'pointer',
												opacity: isImageLoading ? 0 : 1,
												transition: 'opacity 0.3s ease',
											}}
										/>
										{evidenceUrls.length > 1 && (
											<div className={styles.imageCounter}>
												{currentImageIndex + 1} / {evidenceUrls.length}
											</div>
										)}
									</div>

									<button
										className={`${styles.carouselBtn} ${styles.nextBtn}`}
										onClick={handleNextImage}
										disabled={evidenceUrls.length <= 1}
									>
										<svg width='32' height='32' viewBox='0 0 24 24' fill='none'>
											<path
												d='M9 18l6-6-6-6'
												stroke='currentColor'
												strokeWidth='2'
												strokeLinecap='round'
												strokeLinejoin='round'
											/>
										</svg>
									</button>
								</div>
							) : (
								<p className={styles.noEvidence}>No evidence files uploaded</p>
							)}
						</div>

						{/* Action Buttons */}
						<div className={styles.actionButtons}>
							<button className={styles.rejectBtn} onClick={handleRejectClick}>
								Reject
							</button>
							<button className={styles.approveBtn} onClick={handleApproveClick}>
								Approve
							</button>
						</div>
					</>
				)}
			</div>

			{/* Reject Reason Modal */}
			{showRejectModal && (
				<div className={styles.rejectModalBackdrop} onClick={e => e.target === e.currentTarget && handleRejectCancel()}>
					<div className={styles.rejectModalContent}>
						<h3 className={styles.rejectModalTitle}>Reject Request</h3>
						<p className={styles.rejectModalDescription}>Please provide a reason for rejection:</p>
						<textarea
							className={styles.rejectTextarea}
							value={rejectReason}
							onChange={e => setRejectReason(e.target.value)}
							placeholder='Enter rejection reason...'
							rows={4}
							autoFocus
						/>
						<div className={styles.rejectModalButtons}>
							<button className={styles.rejectModalCancelBtn} onClick={handleRejectCancel}>
								Cancel
							</button>
							<button
								className={styles.rejectModalConfirmBtn}
								onClick={handleRejectConfirm}
								disabled={!rejectReason.trim()}
							>
								Confirm Rejection
							</button>
						</div>
					</div>
				</div>
			)}

			{/* Image Viewer Modal */}
			{isImageViewerOpen && (
				<div className={styles.imageViewerBackdrop} onClick={() => setIsImageViewerOpen(false)}>
					<button className={styles.imageViewerClose} onClick={() => setIsImageViewerOpen(false)}>
						<svg width='32' height='32' viewBox='0 0 24 24' fill='none'>
							<path
								d='M18 6L6 18M6 6l12 12'
								stroke='currentColor'
								strokeWidth='2.5'
								strokeLinecap='round'
								strokeLinejoin='round'
							/>
						</svg>
					</button>
					<img
						src={evidenceUrls[currentImageIndex]}
						alt={`Evidence ${currentImageIndex + 1}`}
						className={styles.imageViewerImage}
						onClick={e => e.stopPropagation()}
					/>
				</div>
			)}
		</div>
	);
}

export default RequestDetailsModal;
