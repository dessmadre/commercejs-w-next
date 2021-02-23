import { useContext } from 'react';

import { client } from 'lib/commerce';
import { ProductFeed, ProductCard } from 'components/products';
import CartContext from 'context/cart/cartContext';
import Header from 'components/layout/Header';

export default function Index({ products }) {
	const cartContext = useContext(CartContext);
	const { addToCart } = cartContext;
	const featured = products[0];
	const restProducts = products.slice(1);

	return (
		<>
			<Header />
			<main className='bg-gray-50 px-6 md:px-24 pt-20'>
				<ProductFeed>
					<ProductCard
						cols={'full'}
						name={featured.name}
						description={featured.description}
						image={featured.media.source}
						price={featured.price.formatted_with_symbol}
						permalink={featured.permalink}
						onClick={() => addToCart(featured.id, 1)}
					/>
					{restProducts.map((product, i) => {
						return (
							<ProductCard
								key={i}
								name={product.name}
								description={product.description}
								image={product.media.source}
								permalink={product.permalink}
								price={product.price.formatted_with_symbol}
								permalink={product.permalink}
								onClick={() => addToCart(product.id, 1)}
							/>
						);
					})}
				</ProductFeed>
			</main>
		</>
	);
}

export async function getStaticProps() {
	const { data: products } = await client.products.list();

	return {
		props: {
			products,
		},
	};
}
