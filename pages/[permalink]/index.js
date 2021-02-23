import { useContext } from 'react';

import { ProductCard } from 'components/products';

import { client } from 'lib/commerce';
import CartContext from 'context/cart/cartContext';
import Header from 'components/layout/Header';

const ProductPage = ({ product }) => {
	const cartContext = useContext(CartContext);
	const { addToCart } = cartContext;

	return (
		<div className='bg-gray-50 h-screen'>
			<Header />
			<div className='pt-24'>
				<ProductCard
					name={product.name}
					description={product.description}
					price={product.price.formatted_with_symbol}
					permalink={product.permalink}
					image={product.media.source}
					onClick={() => addToCart(product.id, 1)}
				/>
			</div>
		</div>
	);
};

export default ProductPage;

export async function getStaticProps({ params }) {
	const { permalink } = params;

	const product = await client.products.retrieve(permalink, {
		type: 'permalink',
	});

	return {
		props: {
			product,
		},
	};
}

export async function getStaticPaths() {
	const { data: products } = await client.products.list();

	return {
		paths: products.map(product => ({
			params: {
				permalink: product.permalink,
			},
		})),
		fallback: false,
	};
}
