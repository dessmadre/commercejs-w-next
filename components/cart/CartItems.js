export const CartItems = ({ children }) => {
	return (
		<div className='bg-gray-200 w-full p-5 grid grid-cols-1 gap-5 justify-between '>
			{children}
		</div>
	);
};
