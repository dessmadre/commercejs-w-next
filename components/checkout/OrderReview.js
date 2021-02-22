import { useContext } from 'react';
import { OrderItems, OrderItem } from 'components/checkout';
import { CartDivider } from 'components/cart';

import CheckoutContext from 'context/checkout/checkoutContext';

export const OrderReview = () => {
	const checkoutContext = useContext(CheckoutContext);
	const { checkoutToken } = checkoutContext;

	return (
		<div>
			<div className='flex justify-between item-center flex-wrap'>
				<h3 className='text-3xl font-bold'>Your items:</h3>
				<CartDivider />
				<OrderItems>
					{checkoutToken.live?.line_items.map(product => {
						return (
							<OrderItem
								key={product.id}
								name={product.name}
								price={product.price.formatted_with_symbol}
								image={product.media.source}
								quantity={product.quantity}
								value={''}
							/>
						);
					})}
				</OrderItems>
				<CartDivider />
				<h3 className='text-2xl font-bold'>Items: </h3>
				<span className='text-xl'>
					{checkoutToken.live?.subtotal.formatted_with_symbol}
				</span>
				<h3 className='text-2xl font-bold'>Shipping: </h3>
				<span className='text-xl'>
					{checkoutToken.live?.subtotal.formatted_with_symbol}
				</span>
			</div>
			{/* <pre>{JSON.stringify(checkoutToken, null, 2)}</pre> */}
		</div>
	);
};
