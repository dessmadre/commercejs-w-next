import { useRouter } from 'next/router';
import { ProductImage, ProductDetails } from 'components/products';

export const ProductCard = ({
	permalink,
	image,
	name,
	description,
	price,
	onClick,
	cols = 1,
}) => {
	const router = useRouter();
	const shouldShow = router.pathname;

	return (
		<div className={`col-span-${cols} px-4 py-8`}>
			<div
				className={`flex w-full m-5 ${
					shouldShow === '/' ? 'hover:shadow-xl' : ''
				}  p-2 overflow:hidden pb-8`}>
				<ProductImage image={image} permalink={permalink} />
				<ProductDetails
					name={name}
					description={description}
					price={price}
					permalink={permalink}
					onClick={onClick}
				/>
			</div>
		</div>
	);
};
