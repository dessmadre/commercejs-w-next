import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

export const ProductImage = ({ image, permalink }) => {
	return (
		<div className='p-2 w-3/5 h-96 flex items-center justify-center cursor-pointer'>
			<Link href={`/${permalink}`}>
				<motion.div
					className='relative w-full h-full'
					whileHover={{ scale: 1.05 }}>
					<Image
						className='absolute overflow-hidden'
						src={`${image}`}
						layout='fill'
						objectFit='contain'
					/>
				</motion.div>
			</Link>
		</div>
	);
};
