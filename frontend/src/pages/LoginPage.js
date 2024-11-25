import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, Loader } from "lucide-react";
import { Link } from "react-router-dom";
import Input from "../components/Input";
import { useAuthStore } from "../store/authStore";
import FloatingShape from "../components/FloatingShape";

const LoginPage = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const { login, isLoading, error } = useAuthStore();

	const handleLogin = async (e) => {
		e.preventDefault();
		await login(email, password);
	};

	return (
		<div
			className='tw-min-h-screen tw-bg-gradient-to-br
    tw-from-gray-900 tw-via-green-900 tw-to-emerald-900 tw-flex tw-items-center tw-justify-center tw-relative tw-overflow-hidden'
		>
			<FloatingShape color='tw-bg-green-500' size='tw-w-64 tw-h-64' top='-5%' left='10%' delay={0} />
			<FloatingShape color='tw-bg-emerald-500' size='tw-w-48 tw-h-48' top='70%' left='80%' delay={5} />
			<FloatingShape color='tw-bg-lime-500' size='tw-w-32 tw-h-32' top='40%' left='-10%' delay={2} />
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
				className="tw-max-w-md tw-w-full tw-bg-gray-800 tw-bg-opacity-50 tw-backdrop-filter tw-backdrop-blur-xl tw-rounded-2xl tw-shadow-xl tw-overflow-hidden"
			>
				<div className="tw-p-8">
					<h2 className="tw-text-3xl tw-font-bold tw-mb-6 tw-text-center tw-bg-gradient-to-r tw-from-green-400 tw-to-emerald-500 tw-text-transparent tw-bg-clip-text">
						Welcome Back
					</h2>

					<form onSubmit={handleLogin}>
						<Input
							icon={Mail}
							type="email"
							placeholder="Email Address"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>

						<Input
							icon={Lock}
							type="password"
							placeholder="Password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>

						<div className="tw-flex tw-items-center tw-mb-6">
							<Link to="/forgot-password" className="tw-text-sm tw-text-green-400 hover:tw-underline">
								Forgot password?
							</Link>
						</div>
						{error && <p className="tw-text-red-500 tw-font-semibold tw-mb-2">{error}</p>}

						<motion.button
							whileHover={{ scale: 1.02 }}
							whileTap={{ scale: 0.98 }}
							className="tw-w-full tw-py-3 tw-px-4 tw-bg-gradient-to-r tw-from-green-500 tw-to-emerald-600 tw-text-white tw-font-bold tw-rounded-lg tw-shadow-lg hover:tw-from-green-600 hover:tw-to-emerald-700 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-green-500 focus:tw-ring-offset-2 focus:tw-ring-offset-gray-900 tw-transition tw-duration-200"
							type="submit"
							disabled={isLoading}
						>
							{isLoading ? <Loader className="tw-w-6 tw-h-6 tw-animate-spin tw-mx-auto" /> : "Login"}
						</motion.button>
					</form>
				</div>
				<div className="tw-px-8 tw-py-4 tw-bg-gray-900 tw-bg-opacity-50 tw-flex tw-justify-center">
					<p className="tw-text-sm tw-text-gray-400">
						Don't have an account?{" "}
						<Link to="/signup" className="tw-text-green-400 hover:tw-underline">
							Sign up
						</Link>
					</p>
				</div>
			</motion.div>
		</div>
	);
};

export default LoginPage;
