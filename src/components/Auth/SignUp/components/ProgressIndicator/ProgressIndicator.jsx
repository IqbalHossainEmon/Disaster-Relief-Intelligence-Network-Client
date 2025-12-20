import styles from './ProgressIndicator.module.css';

function ProgressIndicator({ currentStep, totalSteps = 3 }) {
	return (
		<div className={styles.progressContainer}>
			<div className={styles.progressBar}>
				<div className={styles.progressFill} style={{ width: `${(currentStep / totalSteps) * 100}%` }} />
			</div>
			<div className={styles.stepIndicators}>
				{Array.from({ length: totalSteps }, (_, i) => i + 1).map(step => (
					<div key={step} className={`${styles.stepDot} ${currentStep >= step ? styles.active : ''}`}>
						{step}
					</div>
				))}
			</div>
		</div>
	);
}

export default ProgressIndicator;
