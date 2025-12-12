import './App.css';
import CTASection from './components/CTASection';
import FeatureGrid from './components/FeatureGrid';
import Footer from './components/Footer';
import Hero from './components/Hero';
import Navbar from './components/Navbar';

function App() {
	return (
		<div className='page'>
			<Navbar />
			<main className='main'>
				<Hero />
				<FeatureGrid />
				<CTASection />
			</main>
			<Footer />
		</div>
	);
}

export default App;
