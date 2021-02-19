import '../styles/globals.css';
import Header from 'components/layout/Header';
import CartState from 'context/cart/CartState';
import CheckoutState from 'context/checkout/CheckoutState';
import CustomerState from 'context/customer/CustomerState';

function MyApp({ Component, pageProps }) {
	return (
		<CheckoutState>
			<CartState>
				<Header />
				<Component {...pageProps} />
			</CartState>
		</CheckoutState>
	);
}

export default MyApp;
