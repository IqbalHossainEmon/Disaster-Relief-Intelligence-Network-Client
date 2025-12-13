import styles from './App.module.css';
import CTASection from './components/Home/Components/CTASection/CTASection';
import FeatureGrid from './components/Home/Components/FeatureGrid/FeatureGrid';
import Footer from './components/Shared/Footer/Footer';
import Hero from './components/Home/Components/Hero/Hero';
import Navbar from './components/Shared/Navbar/Navbar';
import Home from './components/Home/Home/Home';

function App() {
	return (
		<div className={styles.page}>
			<Navbar />
			<Home />
			<Footer />
		</div>
	);
}

export default App;
