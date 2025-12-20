import { useState } from 'react';
import Login from '../../Login/Login/Login';
import SignUp from '../../SignUp/SignUp/SignUp';

function Auth() {
	const [isLogin, setIsLogin] = useState(true);

	return (
		<>
			{isLogin ? (
				<Login onSwitchToSignUp={() => setIsLogin(false)} />
			) : (
				<SignUp onSwitchToLogin={() => setIsLogin(true)} />
			)}
		</>
	);
}

export default Auth;
