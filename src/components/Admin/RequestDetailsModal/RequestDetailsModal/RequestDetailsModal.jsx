import { useState, useEffect } from 'react';
import styles from './RequestDetailsModal.module.css';

function RequestDetailsModal({ request, onClose, onApprove, onReject }) {
	const [currentImageIndex, setCurrentImageIndex] = useState(0);
	const [isClosing, setIsClosing] = useState(false);
	const [isImageViewerOpen, setIsImageViewerOpen] = useState(false);
	const [isImageLoading, setIsImageLoading] = useState(true);

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
		setCurrentImageIndex(prev => (prev === 0 ? request.evidences.length - 1 : prev - 1));
	};

	const handleNextImage = () => {
		setIsImageLoading(true);
		setCurrentImageIndex(prev => (prev === request.evidences.length - 1 ? 0 : prev + 1));
	};

	const handleClose = () => {
		setIsClosing(true);
		setTimeout(() => {
			onClose();
		}, 300); // Match animation duration
	};

	const handleBackdropClick = e => {
		if (e.target === e.currentTarget) {
			handleClose();
		}
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

				<div className={styles.detailsGrid}>
					<div className={styles.leftColumn}>
						<div className={styles.infoGroup}>
							<p className={styles.infoLabel}>Group Leader Name:</p>
							<p className={styles.infoValue}>{request.groupLeader}</p>
						</div>

						<div className={styles.infoGroup}>
							<p className={styles.infoLabel}>Team Name:</p>
							<p className={styles.infoValue}>{request.teamName}</p>
						</div>

						<div className={styles.infoGroup}>
							<p className={styles.infoLabel}>Zone Requested:</p>
							<p className={styles.infoValue}>{request.zoneRequested}</p>
						</div>

						<div className={styles.infoGroup}>
							<p className={styles.infoLabel}>Submission Date:</p>
							<p className={styles.infoValue}>{request.submissionDate}</p>
						</div>
					</div>

					<div className={styles.rightColumn}>
						<h3 className={styles.teamMembersTitle}>Team Members</h3>
						<ol className={styles.teamMembersList}>
							{request.teamMembers.map((member, index) => (
								<li key={index} className={styles.teamMember}>
									{member.name} — {member.role}
								</li>
							))}
						</ol>
					</div>
				</div>

				{/* Evidence Section */}
				<div className={styles.evidenceSection}>
					<h3 className={styles.evidenceTitle}>Evidences</h3>

					<div className={styles.imageCarousel}>
						<button
							className={`${styles.carouselBtn} ${styles.prevBtn}`}
							onClick={handlePrevImage}
							disabled={request.evidences.length <= 1}
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
								src={request.evidences[currentImageIndex]}
								alt={`Evidence ${currentImageIndex + 1}`}
								className={styles.evidenceImage}
								onClick={() => setIsImageViewerOpen(true)}
								onLoad={() => setIsImageLoading(false)}
								style={{ cursor: 'pointer', opacity: isImageLoading ? 0 : 1, transition: 'opacity 0.3s ease' }}
							/>
							{request.evidences.length > 1 && (
								<div className={styles.imageCounter}>
									{currentImageIndex + 1} / {request.evidences.length}
								</div>
							)}
						</div>

						<button
							className={`${styles.carouselBtn} ${styles.nextBtn}`}
							onClick={handleNextImage}
							disabled={request.evidences.length <= 1}
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
				</div>

				{/* Action Buttons */}
				<div className={styles.actionButtons}>
					<button
						className={styles.rejectBtn}
						onClick={() => {
							setIsClosing(true);
							setTimeout(() => onReject(request.id), 300);
						}}
					>
						Reject
					</button>
					<button
						className={styles.approveBtn}
						onClick={() => {
							setIsClosing(true);
							setTimeout(() => onApprove(request.id), 300);
						}}
					>
						Approve
					</button>
				</div>
			</div>

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
						src={request.evidences[currentImageIndex]}
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
