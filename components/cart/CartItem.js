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
				<p className='text-xl'>{name}</p>
			</div>
			<div className='flex flex-col justify-center'>
				<p className='text-xs font-bold text-gray-600 mb-2'>Update quantity</p>
				<input
					className='p-1 w-2/5 self-start text-center rounded-md bg-white cursor-pointer'
					type='number'
					name='quantity'
					value={quantity}
					onChange={onChange}
				/>
			</div>
			<div className='flex flex-col mr-10 items-start'>
				<p className='text-xs font-bold text-gray-600 mb-2'>Price</p>
				<p className='text-xl'>{price}</p>
			</div>
			<div className='x-icon' onClick={onClick}>
				<Image src='/x-icon.svg' height={25} width={25} />
			</div>
		</div>
	);
};
