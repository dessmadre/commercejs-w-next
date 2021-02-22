import { Checkout } from 'components/checkout';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe(
	'pk_test_51Hm4dKDbeKtY9x5nzaGLUAg8EQDJPuYwoH5gIGp5wGYaE1r0IRXoO4E6wvOA8f9NRadvNF9A52UhtaSCgPbG23LW00B6LhFB1Z',
);

const CheckoutPage = () => {
	return (
		<div className='pt-24 px-24'>
			<Elements stripe={stripePromise}>
				<Checkout />
			</Elements>
		</div>
	);
};

export default CheckoutPage;
