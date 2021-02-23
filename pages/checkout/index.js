import { Checkout, CheckoutBreadcrumbs } from 'components/checkout';

const CheckoutPage = () => {
	return (
		<div className='pt-12 p-6 md:px-24 bg-gray-50'>
			<CheckoutBreadcrumbs />
			<Checkout />
		</div>
	);
};

export default CheckoutPage;
