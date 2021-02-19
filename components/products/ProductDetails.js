import { ProductActions } from 'components/products';

export const ProductDetails = ({
	name,
	description,
	price,
	permalink,
	onClick,
}) => {
	return (
		<div className='ml-5 pl-5 p-2 w-2/5  flex flex-col h-96 justify-between'>
			<h3 className='text-2xl font-semibold text-gray-800'>{name}</h3>
			<div
				className='text-sm text-gray-400'
				dangerouslySetInnerHTML={{ __html: description }}
			/>
			<p className='mt-5 text-2xl font-bold text-gray-700'>{price}</p>
			<ProductActions permalink={permalink} onClick={onClick} />
		</div>
	);
};
