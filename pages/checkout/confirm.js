import { useContext } from 'react';

import { CheckoutBreadcrumbs } from 'components/checkout';
import CheckoutContext from 'context/checkout/checkoutContext';

export default function ConfirmPage() {
	const checkoutContext = useContext(CheckoutContext);
	const { orderReceipt } = checkoutContext;

	return (
		<div className='pt-12 px-24 bg-gray-50'>
			<CheckoutBreadcrumbs />
			<div className='flex justify-center items-center h-screen'>
				<h1 className='text-6xl font-bold'>Thanks for your purchase.</h1>
			</div>
		</div>
	);
}
