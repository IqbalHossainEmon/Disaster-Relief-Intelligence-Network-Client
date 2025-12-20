import styles from './Step2RoleSelection.module.css';

function Step2RoleSelection({ formData, handleChange }) {
	return (
		<div className={styles.roleSelection}>
			<div className={styles.roleCards}>
				<label className={styles.roleCard}>
					<input
						type='radio'
						name='role'
						value='leader'
						checked={formData.role === 'leader'}
						onChange={handleChange}
						className={styles.roleRadio}
						required
					/>
					<div className={styles.roleCardContent}>
						<div className={styles.roleIcon}>
							<svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
								<path d='M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2' />
								<circle cx='9' cy='7' r='4' />
								<path d='M23 21v-2a4 4 0 0 0-3-3.87' />
								<path d='M16 3.13a4 4 0 0 1 0 7.75' />
							</svg>
						</div>
						<h3 className={styles.roleTitle}>Group Leader</h3>
						<p className={styles.roleDescription}>
							Create and manage your organization, coordinate teams, and submit assignment requests
						</p>
						<ul className={styles.roleFeatures}>
							<li>Create organization profile</li>
							<li>Manage team members</li>
							<li>Submit assignment requests</li>
							<li>View contribution history</li>
						</ul>
					</div>
				</label>

				<label className={styles.roleCard}>
					<input
						type='radio'
						name='role'
						value='member'
						checked={formData.role === 'member'}
						onChange={handleChange}
						className={styles.roleRadio}
						required
					/>
					<div className={styles.roleCardContent}>
						<div className={styles.roleIcon}>
							<svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
								<path d='M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2' />
								<circle cx='8.5' cy='7' r='4' />
								<path d='M20 8v6M23 11h-6' />
							</svg>
						</div>
						<h3 className={styles.roleTitle}>Team Member</h3>
						<p className={styles.roleDescription}>Join an existing organization and participate in relief operations</p>
						<ul className={styles.roleFeatures}>
							<li>Join organization with code</li>
							<li>View assigned locations</li>
							<li>Participate in operations</li>
							<li>Access team resources</li>
						</ul>
					</div>
				</label>
			</div>
		</div>
	);
}

export default Step2RoleSelection;
