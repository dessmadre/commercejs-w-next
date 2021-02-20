import { motion } from 'framer-motion';
import Link from 'next/link';

export const CartActions = ({ onClick }) => {
	return (
		<div className='w-full flex justify-end mt-10'>
			<Link href='/checkout'>
				<motion.a
					onClick={onClick}
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.95 }}
					className='w-2/5 text-center bg-green-200 hover:bg-green-300 py-2 px-5 font-semibold border-gray-600 border-2 text-gray-600'>
					Checkout
				</motion.a>
			</Link>
		</div>
	);
};
