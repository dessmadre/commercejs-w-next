import { useEffect, useContext } from 'react';
import { motion } from 'framer-motion';

import CartContext from 'context/cart/cartContext';
import { CartDivider, CartItem, CartItems, CartActions } from 'components/cart';

export const Cart = ({ className, onClick }) => {
	const cartContext = useContext(CartContext);
	const { cart, retrieveCart, updateCartItem, removeFromCart } = cartContext;

	useEffect(() => {
		retrieveCart();
	}, []);

	return (
		<motion.div className={className}>
			<div className='flex justify-between item-center flex-wrap'>
				<h3 className='text-3xl font-bold'>Items in cart:</h3>
				<span className='text-2xl '>{cart.total_items}</span>
				<CartDivider />
				{cart.total_items > 0 ? (
					<CartItems>
						{cart.line_items?.map(product => {
							return (
								<CartItem
									key={product.id}
									name={product.name}
									price={product.price.formatted_with_symbol}
									image={product.media.source}
									quantity={product.quantity}
									value={''}
									onClick={() => removeFromCart(product.id)}
									onChange={e => updateCartItem(product.id, e.target.value)}
								/>
							);
						})}
					</CartItems>
				) : (
					<>
						<p className='text-xl font-semibold'>Your cart is empty </p>
					</>
				)}
				<CartDivider />
				<h3 className='text-2xl font-bold'>Total: </h3>
				<span className='text-xl'>{cart.subtotal?.formatted_with_symbol}</span>
				<CartActions onClick={onClick} />
			</div>
		</motion.div>
	);
};
