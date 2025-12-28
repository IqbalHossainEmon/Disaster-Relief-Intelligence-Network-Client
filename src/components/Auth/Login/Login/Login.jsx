import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../../../../services';
import styles from './Login.module.css';

function Login() {
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);

	const handleChange = e => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
		// Clear error when user types
		if (error) setError('');
	};

	const handleSubmit = async e => {
		e.preventDefault();
		setError('');
		setLoading(true);

		try {
			const response = await authService.login(formData.email, formData.password);
			console.log('Login successful:', response);

			// Redirect based on user role
			const user = response.user;
			if (user.role === 'admin') {
				navigate('/admin');
			} else {
				// Leader and Member both go to disaster map
				navigate('/disaster-map');
			}
		} catch (err) {
			console.error('Login error:', err);
			setError(err.message || 'Invalid email or password');
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className={styles.loginPage}>
			<div className={styles.background} aria-hidden />
			<div className={styles.container}>
				<div className={styles.card}>
					<div className={styles.header}>
						<h1 className={styles.logo}>DRIN</h1>
						<h2 className={styles.title}>Welcome Back</h2>
						<p className={styles.subtitle}>Log in to access your disaster relief dashboard</p>
					</div>

					<form className={styles.form} onSubmit={handleSubmit}>
						{error && <div className={styles.errorMessage}>{error}</div>}

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
								disabled={loading}
							/>
						</div>

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
								placeholder='Enter your password'
								className={styles.input}
								required
								disabled={loading}
							/>
						</div>

						<div className={styles.forgotPassword}>
							<a href='#' className={styles.link}>
								Forgot password?
							</a>
						</div>

						<button type='submit' className={`${styles.btn} ${styles.btnPrimary}`} disabled={loading}>
							{loading ? 'Logging in...' : 'Log In'}
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
							Don't have an account?{' '}
							<Link to='/signup' className={styles.link}>
								Sign up
							</Link>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Login;
