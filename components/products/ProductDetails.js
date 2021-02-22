import { ProductActions } from 'components/products';
import { useRouter } from 'next/router';

export const ProductDetails = ({
	name,
	description,
	price,
	permalink,
	onClick,
}) => {
	const router = useRouter();
	const active = router.pathname;
	return (
		<div className='ml-5 pl-5 p-2 w-2/5  flex flex-col h-96 justify-between'>
			<h3 className='text-4xl font-semibold text-gray-800'>{name}</h3>
			<div
				className={`${
					active === '/[permalink]' ? 'block' : 'hidden'
				} lg:text-lg lg:text-gray-400`}
				dangerouslySetInnerHTML={{ __html: description }}
			/>
			<p className='mt-5 text-3xl font-bold text-gray-700'>{price}</p>
			<ProductActions permalink={permalink} onClick={onClick} />
		</div>
	);
};
