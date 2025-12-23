import { useState } from 'react';
import styles from './AssignmentApplicationModal.module.css';

const AssignmentApplicationModal = ({ zone, onClose, onSubmit }) => {
	const [formData, setFormData] = useState({
		proposedTeamSize: '',
		estimatedDuration: '',
		capabilities: '',
		resources: '',
		notes: '',
	});

	const [evidenceFiles, setEvidenceFiles] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');

	const handleChange = e => {
		const { name, value } = e.target;
		setFormData(prev => ({
			...prev,
			[name]: value,
		}));
	};

	const handleFileChange = e => {
		const files = Array.from(e.target.files);
		if (files.length + evidenceFiles.length > 50) {
			setError('Maximum 50 files allowed');
			return;
		}
		setEvidenceFiles(prev => [...prev, ...files]);
		setError('');
	};

	const removeFile = index => {
		setEvidenceFiles(prev => prev.filter((_, i) => i !== index));
	};

	const handleSubmit = async e => {
		e.preventDefault();
		setError('');

		// Validation - backend requires these fields
		if (!formData.proposedTeamSize || !formData.estimatedDuration || !formData.capabilities) {
			setError('Please fill in team size, estimated duration, and capabilities');
			return;
		}

		if (formData.proposedTeamSize < 1) {
			setError('Team size must be at least 1');
			return;
		}

		if (evidenceFiles.length === 0) {
			setError('Please upload at least one evidence file (photo or video)');
			return;
		}

		setLoading(true);
		try {
			await onSubmit(formData, evidenceFiles);
		} catch (err) {
			setError(err.message || 'Failed to submit application');
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className={styles.modalOverlay} onClick={onClose}>
			<div className={styles.modal} onClick={e => e.stopPropagation()}>
				<div className={styles.modalHeader}>
					<h2>Apply for Zone Assignment</h2>
					<button className={styles.closeBtn} onClick={onClose}>
						✕
					</button>
				</div>

				<div className={styles.zoneInfo}>
					<h3>{zone.name}</h3>
					<p className={styles.severity}>
						Severity: <span className={styles[zone.severity]}>{zone.severity}</span>
					</p>
					<p>Affected People: {zone.affectedPeople?.toLocaleString() || 0}</p>
				</div>

				<form className={styles.form} onSubmit={handleSubmit}>
					{error && <div className={styles.error}>{error}</div>}

					<div className={styles.infoBox}>
						<p>ℹ️ Your organization and team members will be automatically included in this request.</p>
					</div>

					<div className={styles.formGroup}>
						<label htmlFor='proposedTeamSize'>
							Proposed Team Size <span className={styles.required}>*</span>
						</label>
						<input
							type='number'
							id='proposedTeamSize'
							name='proposedTeamSize'
							value={formData.proposedTeamSize}
							onChange={handleChange}
							placeholder='Number of team members for this mission'
							min='1'
							required
						/>
					</div>

					<div className={styles.formGroup}>
						<label htmlFor='estimatedDuration'>
							Estimated Duration <span className={styles.required}>*</span>
						</label>
						<input
							type='text'
							id='estimatedDuration'
							name='estimatedDuration'
							value={formData.estimatedDuration}
							onChange={handleChange}
							placeholder='e.g., "7 days", "2 weeks", "10 days"'
							required
						/>
					</div>

					<div className={styles.formGroup}>
						<label htmlFor='capabilities'>
							Team Capabilities <span className={styles.required}>*</span>
						</label>
						<textarea
							id='capabilities'
							name='capabilities'
							value={formData.capabilities}
							onChange={handleChange}
							placeholder="Describe your team's skills (e.g., medical aid, food distribution, search & rescue)"
							rows='3'
							required
						/>
					</div>

					<div className={styles.formGroup}>
						<label htmlFor='resources'>Available Resources</label>
						<textarea
							id='resources'
							name='resources'
							value={formData.resources}
							onChange={handleChange}
							placeholder='Equipment and supplies (e.g., 2 ambulances, medical supplies, 500kg food)'
							rows='3'
						/>
					</div>

					<div className={styles.formGroup}>
						<label htmlFor='notes'>Additional Notes</label>
						<textarea
							id='notes'
							name='notes'
							value={formData.notes}
							onChange={handleChange}
							placeholder='Any additional information, experience, or special considerations'
							rows='3'
						/>
					</div>

					<div className={styles.formGroup}>
						<label htmlFor='evidence'>
							Upload Evidence (Photos/Videos) <span className={styles.required}>*</span>
							<span className={styles.optional}> - At least 1 file required, up to 50 files</span>
						</label>
						<input
							type='file'
							id='evidence'
							name='evidence'
							onChange={handleFileChange}
							multiple
							accept='image/*,video/*'
							className={styles.fileInput}
						/>
						<p className={styles.fileHelp}>
							📸 Images: JPEG, PNG, GIF, WEBP | 🎥 Videos: MP4, AVI, MOV, MKV, WEBM (Max 100MB per file)
						</p>
						{evidenceFiles.length > 0 && (
							<div className={styles.fileList}>
								<p className={styles.fileListHeader}>Selected Files ({evidenceFiles.length}/50):</p>
								{evidenceFiles.map((file, index) => (
									<div key={index} className={styles.fileItem}>
										<span className={styles.fileIcon}>{file.type.startsWith('image/') ? '📸' : '🎥'}</span>
										<span className={styles.fileName}>{file.name}</span>
										<span className={styles.fileSize}>({(file.size / 1024 / 1024).toFixed(2)} MB)</span>
										<button type='button' className={styles.removeFileBtn} onClick={() => removeFile(index)}>
											✕
										</button>
									</div>
								))}
							</div>
						)}
					</div>

					<div className={styles.formActions}>
						<button type='button' className={styles.cancelBtn} onClick={onClose} disabled={loading}>
							Cancel
						</button>
						<button type='submit' className={styles.submitBtn} disabled={loading}>
							{loading ? 'Submitting...' : 'Submit Application'}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default AssignmentApplicationModal;
