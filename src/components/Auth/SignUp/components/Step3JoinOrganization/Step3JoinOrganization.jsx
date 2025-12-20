import styles from './Step3JoinOrganization.module.css';

function Step3JoinOrganization({ formData, handleChange }) {
	return (
		<>
			<div className={styles.joinOrgContainer}>
				<div className={styles.infoBox}>
					<svg className={styles.infoIcon} viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
						<circle cx='12' cy='12' r='10' />
						<path d='M12 16v-4' />
						<path d='M12 8h.01' />
					</svg>
					<p className={styles.infoText}>Ask your organization leader for an invitation code to join their team</p>
				</div>

				<div className={styles.formGroup}>
					<label htmlFor='organizationCode' className={styles.label}>
						Organization Code
					</label>
					<input
						type='text'
						id='organizationCode'
						name='organizationCode'
						value={formData.organizationCode}
						onChange={handleChange}
						placeholder='Enter 6-digit code'
						className={styles.input}
						maxLength='6'
						pattern='[A-Za-z0-9]{6}'
						required
					/>
					<span className={styles.inputHint}>Example: ABC123 (6 characters, case-insensitive)</span>
				</div>
			</div>

			<div className={styles.checkboxGroup}>
				<label className={styles.checkboxLabel}>
					<input
						type='checkbox'
						name='agreeToTerms'
						checked={formData.agreeToTerms}
						onChange={handleChange}
						className={styles.checkbox}
						required
					/>
					<span className={styles.checkboxText}>
						I agree to the
						<a href='#' className={styles.link}>
							Terms of Service
						</a>
						and
						<a href='#' className={styles.link}>
							Privacy Policy
						</a>
					</span>
				</label>
			</div>
		</>
	);
}

export default Step3JoinOrganization;
