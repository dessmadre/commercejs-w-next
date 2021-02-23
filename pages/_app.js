import '../styles/globals.css';

import CartState from 'context/cart/CartState';
import CheckoutState from 'context/checkout/CheckoutState';

function MyApp({ Component, pageProps }) {
	return (
		<CheckoutState>
			<CartState>
				<Component {...pageProps} />
			</CartState>
		</CheckoutState>
	);
}

export default MyApp;
