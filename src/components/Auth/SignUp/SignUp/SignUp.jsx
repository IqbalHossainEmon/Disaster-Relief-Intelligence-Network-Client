import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './SignUp.module.css';
import ProgressIndicator from '../components/ProgressIndicator/ProgressIndicator';
import Step1BasicInfo from '../components/Step1BasicInfo/Step1BasicInfo';
import Step2RoleSelection from '../components/Step2RoleSelection/Step2RoleSelection';
import Step3OrganizationSetup from '../components/Step3OrganizationSetup/Step3OrganizationSetup';
import Step3JoinOrganization from '../components/Step3JoinOrganization/Step3JoinOrganization';

function SignUp() {
	const [currentStep, setCurrentStep] = useState(1);
	const [formData, setFormData] = useState({
		// Step 1: Basic Info
		fullName: '',
		email: '',
		password: '',
		confirmPassword: '',
		// Step 2: Role
		role: '',
		// Step 3a: Organization Details (for Group Leader)
		organizationName: '',
		organizationType: '',
		organizationDescription: '',
		organizationPhone: '',
		organizationAddress: '',
		// NGO specific
		registrationNumber: '',
		website: '',
		// Volunteer specific
		volunteerCount: '',
		establishedYear: '',
		expertise: '',
		// Government specific
		department: '',
		officialId: '',
		// Step 3b: Join Organization (for Team Member)
		organizationCode: '',
		// Terms
		agreeToTerms: false,
	});

	const handleChange = e => {
		const { name, value, type, checked } = e.target;
		setFormData({
			...formData,
			[name]: type === 'checkbox' ? checked : value,
		});
	};

	const handleNext = e => {
		e.preventDefault();
		if (currentStep < 3) {
			setCurrentStep(currentStep + 1);
		}
	};

	const handleBack = () => {
		if (currentStep > 1) {
			setCurrentStep(currentStep - 1);
		}
	};

	const handleSubmit = e => {
		e.preventDefault();
		// Handle sign up logic here
		console.log('Sign up attempt:', formData);
	};

	const getSubtitle = () => {
		if (currentStep === 1) return 'Join the disaster relief intelligence network';
		if (currentStep === 2) return 'Choose your role in the organization';
		if (currentStep === 3 && formData.role === 'leader') return 'Set up your organization';
		if (currentStep === 3 && formData.role === 'member') return 'Join an organization';
		return '';
	};

	return (
		<div className={styles.signUpPage}>
			<div className={styles.background} aria-hidden />
			<div className={styles.container}>
				<div className={styles.card}>
					<div className={styles.header}>
						<h1 className={styles.logo}>DRIN</h1>
						<h2 className={styles.title}>Create Your Account</h2>
						<p className={styles.subtitle}>{getSubtitle()}</p>
					</div>

					<ProgressIndicator currentStep={currentStep} />

					<form className={styles.form} onSubmit={currentStep === 3 ? handleSubmit : handleNext}>
						{currentStep === 1 && <Step1BasicInfo formData={formData} handleChange={handleChange} />}

						{currentStep === 2 && <Step2RoleSelection formData={formData} handleChange={handleChange} />}

						{currentStep === 3 && formData.role === 'leader' && (
							<Step3OrganizationSetup formData={formData} handleChange={handleChange} />
						)}

						{currentStep === 3 && formData.role === 'member' && (
							<Step3JoinOrganization formData={formData} handleChange={handleChange} />
						)}

						<div className={styles.buttonGroup}>
							{currentStep > 1 && (
								<button type='button' onClick={handleBack} className={`${styles.btn} ${styles.btnSecondary}`}>
									Back
								</button>
							)}
							<button type='submit' className={`${styles.btn} ${styles.btnPrimary}`}>
								{currentStep < 3 ? 'Continue' : 'Create Account'}
							</button>
						</div>
					</form>

					{currentStep === 1 && (
						<>
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
						</>
					)}

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
