import Image from 'next/image';

export const CartItem = ({
	name,
	price,
	image,
	quantity,
	onClick,
	onChange,
}) => {
	return (
		<div className='flex justify-between items-center'>
			<div className='relative h-20 w-20'>
				<Image
					className='absolute'
					src={image}
					layout='fill'
					objectFit='contain'
					objectPosition='center'
				/>
			</div>
			<div className='flex flex-col items-start w-2/5 ml-5	'>
				<p className='text-xs font-bold text-gray-600 mb-2'>Name</p>
				<p className='text-md lg:text-xl'>{name}</p>
			</div>
			<div className='flex flex-col justify-center mr-3'>
				<p className='text-xs font-bold self-center md:self-start text-gray-600 mb-2'>
					Update quantity
				</p>
				<input
					className='p-1 w-2/5 self-center md:self-start text-center rounded-md bg-white cursor-pointer'
					type='number'
					name='quantity'
					value={quantity}
					onChange={onChange}
				/>
			</div>
			<div className='md:flex flex-col mr-10 items-start hidden'>
				<p className='text-xs font-bold text-gray-600 mb-2'>Price</p>
				<p className='text-xl'>{price}</p>
			</div>
			<div className='flex justify-end items-end'>
				<div className='x-icon relative h-5 w-5 ' onClick={onClick}>
					<Image src='/x-icon.svg' layout='fill' />
				</div>
			</div>
		</div>
	);
};
