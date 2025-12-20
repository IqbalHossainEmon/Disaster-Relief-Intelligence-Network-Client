import styles from './Step1BasicInfo.module.css';

function Step1BasicInfo({ formData, handleChange }) {
	return (
		<>
			<div className={styles.formGroup}>
				<label htmlFor='fullName' className={styles.label}>
					Full Name
				</label>
				<input
					type='text'
					id='fullName'
					name='fullName'
					value={formData.fullName}
					onChange={handleChange}
					placeholder='John Doe'
					className={styles.input}
					required
				/>
			</div>

			<div className={styles.formGroup}>
				<label htmlFor='email' className={styles.label}>
					Email Address
				</label>
				<input
					type='email'
					id='email'
					name='email'
					value={formData.email}
					onChange={handleChange}
					placeholder='you@example.com'
					className={styles.input}
					required
				/>
			</div>

			<div className={styles.formRow}>
				<div className={styles.formGroup}>
					<label htmlFor='password' className={styles.label}>
						Password
					</label>
					<input
						type='password'
						id='password'
						name='password'
						value={formData.password}
						onChange={handleChange}
						placeholder='Min. 8 characters'
						className={styles.input}
						required
						minLength={8}
					/>
				</div>

				<div className={styles.formGroup}>
					<label htmlFor='confirmPassword' className={styles.label}>
						Confirm Password
					</label>
					<input
						type='password'
						id='confirmPassword'
						name='confirmPassword'
						value={formData.confirmPassword}
						onChange={handleChange}
						placeholder='Re-enter password'
						className={styles.input}
						required
					/>
				</div>
			</div>
		</>
	);
}

export default Step1BasicInfo;
