import CTASection from '../../Components/CTASection/CTASection/CTASection';
import FeatureGrid from '../../Components/FeatureGrid/FeatureGrid/FeatureGrid';
import Hero from '../../Components/Hero/Hero/Hero';
import styles from './Home.module.css';

const Home = () => {
	return (
		<main className={styles.main}>
			<Hero />
			<FeatureGrid />
			<CTASection />
		</main>
	);
};
export default Home;
