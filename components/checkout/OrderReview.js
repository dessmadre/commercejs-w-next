import { useContext } from 'react';
import { OrderItems, OrderItem } from 'components/checkout';
import { CartDivider } from 'components/cart';

import CheckoutContext from 'context/checkout/checkoutContext';

export const OrderReview = () => {
	const checkoutContext = useContext(CheckoutContext);
	const { checkoutToken, live } = checkoutContext;

	return (
		<div className='flex justify-between h-full item-center flex-wrap'>
			<div className='flex justify-between w-full'>
				<h3 className='text-3xl font-bold'>Items in your cart</h3>
				<span className='text-3xl font-bold'>
					{checkoutToken.live?.line_items.length}
				</span>
			</div>
			<div className='flex flex-col justify-between w-full'>
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
			</div>
			<div className='flex justify-between items-end w-full'>
				<h3 className='text-3xl font-bold'>Subtotal: </h3>
				<span className='text-3xl font-bold'>
					{live.total_with_tax?.formatted_with_symbol}
				</span>
			</div>
		</div>
	);
};
