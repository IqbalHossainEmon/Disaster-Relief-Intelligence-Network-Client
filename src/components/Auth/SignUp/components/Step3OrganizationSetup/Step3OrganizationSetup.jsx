import styles from './Step3OrganizationSetup.module.css';

function Step3OrganizationSetup({ formData, handleChange }) {
	return (
		<>
			<div className={styles.formGroup}>
				<label htmlFor='organizationName' className={styles.label}>
					Organization Name
				</label>
				<input
					type='text'
					id='organizationName'
					name='organizationName'
					value={formData.organizationName}
					onChange={handleChange}
					placeholder='Enter organization name'
					className={styles.input}
					required
				/>
			</div>

			<div className={styles.formGroup}>
				<label htmlFor='organizationType' className={styles.label}>
					Organization Type
				</label>
				<select
					id='organizationType'
					name='organizationType'
					value={formData.organizationType}
					onChange={handleChange}
					className={styles.select}
					required
				>
					<option value='' disabled>
						Select organization type
					</option>
					<option value='ngo'>NGO / Non-Profit</option>
					<option value='government'>Government Agency</option>
					<option value='volunteer'>Volunteer Group</option>
					<option value='community'>Community Organization</option>
				</select>
			</div>

			{/* Additional fields based on organization type */}
			{formData.organizationType === 'ngo' && (
				<>
					<div className={styles.formRow}>
						<div className={styles.formGroup}>
							<label htmlFor='registrationNumber' className={styles.label}>
								Registration Number
							</label>
							<input
								type='text'
								id='registrationNumber'
								name='registrationNumber'
								value={formData.registrationNumber || ''}
								onChange={handleChange}
								placeholder='NGO Registration ID'
								className={styles.input}
								required
							/>
						</div>
						<div className={styles.formGroup}>
							<label htmlFor='website' className={styles.label}>
								Website <span className={styles.optional}>(Optional)</span>
							</label>
							<input
								type='url'
								id='website'
								name='website'
								value={formData.website || ''}
								onChange={handleChange}
								placeholder='https://example.org'
								className={styles.input}
							/>
						</div>
					</div>
				</>
			)}

			{formData.organizationType === 'volunteer' && (
				<>
					<div className={styles.formRow}>
						<div className={styles.formGroup}>
							<label htmlFor='volunteerCount' className={styles.label}>
								Number of Volunteers
							</label>
							<input
								type='number'
								id='volunteerCount'
								name='volunteerCount'
								value={formData.volunteerCount || ''}
								onChange={handleChange}
								placeholder='Approximate count'
								className={styles.input}
								min='1'
								required
							/>
						</div>
						<div className={styles.formGroup}>
							<label htmlFor='establishedYear' className={styles.label}>
								Established Year
							</label>
							<input
								type='number'
								id='establishedYear'
								name='establishedYear'
								value={formData.establishedYear || ''}
								onChange={handleChange}
								placeholder='2020'
								className={styles.input}
								min='1900'
								max={new Date().getFullYear()}
							/>
						</div>
					</div>
					<div className={styles.formGroup}>
						<label htmlFor='expertise' className={styles.label}>
							Areas of Expertise
						</label>
						<input
							type='text'
							id='expertise'
							name='expertise'
							value={formData.expertise || ''}
							onChange={handleChange}
							placeholder='e.g., Medical aid, Food distribution, Rescue operations'
							className={styles.input}
							required
						/>
					</div>
				</>
			)}

			{formData.organizationType === 'government' && (
				<>
					<div className={styles.formRow}>
						<div className={styles.formGroup}>
							<label htmlFor='department' className={styles.label}>
								Department
							</label>
							<input
								type='text'
								id='department'
								name='department'
								value={formData.department || ''}
								onChange={handleChange}
								placeholder='Department name'
								className={styles.input}
								required
							/>
						</div>
						<div className={styles.formGroup}>
							<label htmlFor='officialId' className={styles.label}>
								Official ID
							</label>
							<input
								type='text'
								id='officialId'
								name='officialId'
								value={formData.officialId || ''}
								onChange={handleChange}
								placeholder='Government ID/Code'
								className={styles.input}
								required
							/>
						</div>
					</div>
				</>
			)}

			<div className={styles.formGroup}>
				<label htmlFor='organizationDescription' className={styles.label}>
					Organization Description
				</label>
				<textarea
					id='organizationDescription'
					name='organizationDescription'
					value={formData.organizationDescription}
					onChange={handleChange}
					placeholder='Brief description of your organization and its mission...'
					className={styles.textarea}
					rows='4'
					required
				/>
			</div>

			<div className={styles.formRow}>
				<div className={styles.formGroup}>
					<label htmlFor='organizationPhone' className={styles.label}>
						Contact Phone
					</label>
					<input
						type='tel'
						id='organizationPhone'
						name='organizationPhone'
						value={formData.organizationPhone}
						onChange={handleChange}
						placeholder='+880 1234 567890'
						className={styles.input}
						required
					/>
				</div>

				<div className={styles.formGroup}>
					<label htmlFor='organizationAddress' className={styles.label}>
						Address
					</label>
					<input
						type='text'
						id='organizationAddress'
						name='organizationAddress'
						value={formData.organizationAddress}
						onChange={handleChange}
						placeholder='City, Country'
						className={styles.input}
						required
					/>
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

export default Step3OrganizationSetup;
