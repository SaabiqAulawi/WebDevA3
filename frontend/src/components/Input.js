const Input = ({ icon: Icon, ...props }) => {
	return (
		<div className="tw-relative tw-mb-6">
			<div className="tw-absolute tw-inset-y-0 tw-left-0 tw-flex tw-items-center tw-pl-3 tw-pointer-events-none">
				<Icon className="tw-size-5 tw-text-green-500" />
			</div>
			<input
				{...props}
				className="tw-w-full tw-pl-10 tw-pr-3 tw-py-2 tw-bg-gray-800 tw-bg-opacity-50 tw-rounded-lg tw-border tw-border-gray-700 focus:tw-border-green-500 focus:tw-ring-2 focus:tw-ring-green-500 tw-text-white tw-placeholder-gray-400 tw-transition tw-duration-200"
			/>
		</div>
	);
};

export default Input;
