import { Routes, Route, useLocation } from 'react-router-dom';
import styles from './App.module.css';
import CTASection from './components/Home/Components/CTASection/CTASection';
import FeatureGrid from './components/Home/Components/FeatureGrid/FeatureGrid';
import Footer from './components/Shared/Footer/Footer';
import Hero from './components/Home/Components/Hero/Hero';
import Navbar from './components/Shared/Navbar/Navbar';
import Home from './components/Home/Home/Home';
import Login from './components/Auth/Login/Login';
import SignUp from './components/Auth/SignUp/SignUp';

function App() {
	const location = useLocation();
	const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';

	return (
		<div className={styles.page}>
			<Navbar />
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/login' element={<Login />} />
				<Route path='/signup' element={<SignUp />} />
			</Routes>
			{!isAuthPage && <Footer />}
		</div>
	);
}

export default App;
