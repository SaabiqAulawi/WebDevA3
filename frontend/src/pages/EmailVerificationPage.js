import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuthStore } from "../store/authStore";
import toast from "react-hot-toast";
import FloatingShape from "../components/FloatingShape";

const EmailVerificationPage = () => {
	const [code, setCode] = useState(["", "", "", "", "", ""]);
	const inputRefs = useRef([]);
	const navigate = useNavigate();

	const { error, isLoading, verifyEmail } = useAuthStore();

	const handleChange = (index, value) => {
		const newCode = [...code];

		// Handle pasted content
		if (value.length > 1) {
			const pastedCode = value.slice(0, 6).split("");
			for (let i = 0; i < 6; i++) {
				newCode[i] = pastedCode[i] || "";
			}
			setCode(newCode);

			// Focus on the last non-empty input or the first empty one
			const lastFilledIndex = newCode.findLastIndex((digit) => digit !== "");
			const focusIndex = lastFilledIndex < 5 ? lastFilledIndex + 1 : 5;
			inputRefs.current[focusIndex].focus();
		} else {
			newCode[index] = value;
			setCode(newCode);

			// Move focus to the next input field if value is entered
			if (value && index < 5) {
				inputRefs.current[index + 1].focus();
			}
		}
	};

	const handleKeyDown = (index, e) => {
		if (e.key === "Backspace" && !code[index] && index > 0) {
			inputRefs.current[index - 1].focus();
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const verificationCode = code.join("");
		try {
			await verifyEmail(verificationCode);
			navigate("/");
			toast.success("Email verified successfully");
		} catch (error) {
			console.log(error);
		}
	};

	// Auto submit when all fields are filled
	useEffect(() => {
		if (code.every((digit) => digit !== "")) {
			handleSubmit(new Event("submit"));
		}
	}, [code]);

	return (
		<div
			className='tw-min-h-screen tw-bg-gradient-to-br
    tw-from-gray-900 tw-via-green-900 tw-to-emerald-900 tw-flex tw-items-center tw-justify-center tw-relative tw-overflow-hidden'
		>
			<FloatingShape color='tw-bg-green-500' size='tw-w-64 tw-h-64' top='-5%' left='10%' delay={0} />
			<FloatingShape color='tw-bg-emerald-500' size='tw-w-48 tw-h-48' top='70%' left='80%' delay={5} />
			<FloatingShape color='tw-bg-lime-500' size='tw-w-32 tw-h-32' top='40%' left='-10%' delay={2} />
			<div className="tw-max-w-md tw-w-full tw-bg-gray-800 tw-bg-opacity-50 tw-backdrop-filter tw-backdrop-blur-xl tw-rounded-2xl tw-shadow-xl tw-overflow-hidden">
				<motion.div
					initial={{ opacity: 0, y: -50 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
					className="tw-bg-gray-800 tw-bg-opacity-50 tw-backdrop-filter tw-backdrop-blur-xl tw-rounded-2xl tw-shadow-2xl tw-p-8 tw-w-full tw-max-w-md"
				>
					<h2 className="tw-text-3xl tw-font-bold tw-mb-6 tw-text-center tw-bg-gradient-to-r tw-from-green-400 tw-to-emerald-500 tw-text-transparent tw-bg-clip-text">
						Verify Your Email
					</h2>
					<p className="tw-text-center tw-text-gray-300 tw-mb-6">
						Enter the 6-digit code sent to your email address.
					</p>

					<form onSubmit={handleSubmit} className="tw-space-y-6">
						<div className="tw-flex tw-justify-between">
							{code.map((digit, index) => (
								<input
									key={index}
									ref={(el) => (inputRefs.current[index] = el)}
									type="text"
									maxLength="6"
									value={digit}
									onChange={(e) => handleChange(index, e.target.value)}
									onKeyDown={(e) => handleKeyDown(index, e)}
									className="tw-w-12 tw-h-12 tw-text-center tw-text-2xl tw-font-bold tw-bg-gray-700 tw-text-white tw-border-2 tw-border-gray-600 tw-rounded-lg focus:tw-border-green-500 focus:tw-outline-none"
								/>
							))}
						</div>
						{error && <p className="tw-text-red-500 tw-font-semibold tw-mt-2">{error}</p>}
						<motion.button
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
							type="submit"
							disabled={isLoading || code.some((digit) => !digit)}
							className="tw-w-full tw-bg-gradient-to-r tw-from-green-500 tw-to-emerald-600 tw-text-white tw-font-bold tw-py-3 tw-px-4 tw-rounded-lg tw-shadow-lg hover:tw-from-green-600 hover:tw-to-emerald-700 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-green-500 focus:tw-ring-opacity-50 disabled:tw-opacity-50"
						>
							{isLoading ? "Verifying..." : "Verify Email"}
						</motion.button>
					</form>
				</motion.div>
			</div>
		</div>
	);
};

export default EmailVerificationPage;
