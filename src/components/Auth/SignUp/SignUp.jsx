import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './SignUp.module.css';

function SignUp() {
	const [formData, setFormData] = useState({
		fullName: '',
		email: '',
		password: '',
		confirmPassword: '',
		role: '',
		organizationType: '',
		agreeToTerms: false,
	});

	const handleChange = e => {
		const { name, value, type, checked } = e.target;
		setFormData({
			...formData,
			[name]: type === 'checkbox' ? checked : value,
		});
	};

	const handleSubmit = e => {
		e.preventDefault();
		// Handle sign up logic here
		console.log('Sign up attempt:', formData);
	};

	return (
		<div className={styles.signUpPage}>
			<div className={styles.background} aria-hidden />
			<div className={styles.container}>
				<div className={styles.card}>
					<div className={styles.header}>
						<h1 className={styles.logo}>DRIN</h1>
						<h2 className={styles.title}>Create Your Account</h2>
						<p className={styles.subtitle}>Join the disaster relief intelligence network</p>
					</div>

					<form className={styles.form} onSubmit={handleSubmit}>
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

						<div className={styles.formGroup}>
							<label htmlFor='role' className={styles.label}>
								Role
							</label>
							<select
								id='role'
								name='role'
								value={formData.role}
								onChange={handleChange}
								className={styles.select}
								required
							>
								<option value='' disabled>
									Select your role
								</option>
								<option value='leader'>Leader</option>
								<option value='team-member'>Team Member</option>
							</select>
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
							</select>
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

						<button type='submit' className={`${styles.btn} ${styles.btnPrimary}`}>
							Create Account
						</button>
					</form>

					<div className={styles.divider}>
						<span className={styles.dividerText}>or</span>
					</div>

					<div className={styles.socialButtons}>
						<button type='button' className={`${styles.btn} ${styles.btnSocial}`}>
							<svg className={styles.icon} viewBox='0 0 24 24' fill='currentColor'>
								<path d='M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z' />
								<path d='M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z' />
								<path d='M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z' />
								<path d='M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z' />
							</svg>
							Continue with Google
						</button>
					</div>

					<div className={styles.footer}>
						<p className={styles.footerText}>
							Already have an account?
							<Link to='/login' className={styles.link}>
								Log in
							</Link>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}

export default SignUp;
