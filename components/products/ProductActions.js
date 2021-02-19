import Link from 'next/link';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';

export const ProductActions = ({ permalink, onClick }) => {
	const router = useRouter();

	const shouldShow = router.pathname;

	return (
		<div className='mt-10 flex flex-wrap'>
			<Link href={`/${permalink}`}>
				<motion.a
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.95 }}
					className={` ${
						shouldShow === '/[permalink]' ? 'hidden' : ''
					} w-4/5 text-center mb-5 bg-indigo-300 hover:bg-indigo-400 border-gray-600  py-2 px-5 border-2 font-semibold text-gray-600`}>
					View Product{' '}
				</motion.a>
			</Link>
			<motion.a
				onClick={onClick}
				whileHover={{ scale: 1.05 }}
				whileTap={{ scale: 0.95 }}
				className='w-4/5 text-center bg-green-200 hover:bg-green-300 py-2 px-5 font-semibold border-gray-600 border-2 text-gray-600'>
				Add To Cart
			</motion.a>
		</div>
	);
};
