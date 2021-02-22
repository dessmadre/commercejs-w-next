import Image from 'next/image';

export const OrderItem = ({
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
				<p className='text-2xl font-semibold'>{name}</p>
			</div>
			<div className='flex flex-col justify-center'>
				<input
					className='p-1 w-2/5 self-start text-center rounded-md bg-white cursor-pointer'
					type='text'
					disabled
					name='quantity'
					value={quantity}
					onChange={onChange}
				/>
			</div>
			<div className='flex flex-col mr-10 items-start'>
				<p className='text-xl font-semibold'>{price}</p>
			</div>
		</div>
	);
};
