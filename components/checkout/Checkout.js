import { useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import { client } from 'lib/commerce';
import { ShippingInfo, PaymentDetails } from 'components/checkout';
import CartContext from 'context/cart/cartContext';
import CheckoutContext from 'context/checkout/checkoutContext';

export const Checkout = () => {
	const router = useRouter();
	const cartContext = useContext(CartContext);
	const checkoutContext = useContext(CheckoutContext);

	const { cart, refreshCart, retrieveCart } = cartContext;
	const {
		generateCheckoutTokenFromCart,
		getShippingOptionsForCheckout,
		setShippingOptionInCheckout,
		captureOrder,
		checkoutToken,
		shippingOptions,
		orderReceipt,
	} = checkoutContext;

	// Customer Details
	const [customer, setCustomer] = useState({
		fName: '',
		lName: '',
		email: '',
	});

	// Shipping Details
	const [shipping, setShipping] = useState({
		deliveryCountry: 'US',
		deliveryRegion: 'CA',
		shippingStreet: '',
		shippingCity: '',
		shippingStateProvince: '',
		shippingZipcode: '',
		shippingCountry: '',
	});

	// Payment Details
	const [payment, setPayment] = useState({
		cardNum: '',
		expMonth: '',
		expYear: '',
		ccv: '',
		billingZipCode: '',
	});

	// Fullfillment and Shipping data
	const [fulfill, setFulfill] = useState({
		fulfillCountries: {},
		fulfillSubdivisions: {},
		fulfillOptions: [],
		fulfillOption: '',
	});

	const { fName, lName, email } = customer;
	const {
		shippingName,
		shippingStreet,
		shippingCity,
		shippingStateProvince,
		shippingZipcode,
		shippingCountry,
	} = shipping;
	const { cardNum, expMonth, expYear, ccv, billingZipCode } = payment;
	const {
		fulfillCountries,
		fulfillSubdivisions,
		fulfillOptions,
		fulfillOption,
	} = fulfill;

	useEffect(() => {
		generateToken();
	}, []);

	const generateToken = () => {
		if (typeof cart.id === 'undefined') {
			return;
		}

		if (cart) {
			return generateCheckoutTokenFromCart(cart.id).then(() =>
				fetchShippingCountries(checkoutToken.id),
			);
		}
	};

	const onFormChange = e => {
		setCustomer({
			...customer,
			[e.target.name]: e.target.value,
		});
		setShipping({
			...shipping,
			[e.target.name]: e.target.value,
		});
		setPayment({
			...payment,
			[e.target.name]: e.target.value,
		});
		setFulfill({
			...fulfill,
			[e.target.name]: e.target.value,
		});
	};

	const handleShippingCountryChange = e => {
		const currentValue = e.target.value;
		fetchSubdivisions(currentValue);
	};

	const handleSubdivisionChange = e => {
		const currentValue = e.target.value;
		fetchShipingOptions(checkoutToken.id, shippingCountry, currentValue);
	};

	// fetch all available countries for shipping
	const fetchShippingCountries = checkoutTokenId => {
		client.services
			.localeListShippingCountries(checkoutTokenId)
			.then(countries => {
				setFulfill({
					...fulfill,
					fulfillCountries: countries.countries,
				});
			})
			.catch(error => {
				console.log(
					'There was an error fetching list of shipping countries',
					error,
				);
			});
	};

	// Fetch available shipping regions for the chosen country
	const fetchSubdivisions = countryCode => {
		client.services
			.localeListSubdivisions(countryCode)
			.then(subdivisions => {
				setFulfill({
					...fulfill,
					fulfillSubdivisions: subdivisions.subdivisions,
				});
			})
			.catch(error => {
				console.log('There was an error fetching the subdivisions', error);
			});
	};

	const fetchShipingOptions = () => {
		const { deliveryCountry: country, deliveryRegion: region } = shipping;
		client.checkout
			.getShippingOptions(checkoutToken.id, { country, region })
			.then(options => {
				const shippingOption = option[0] || null;
				setFulfill({
					...fulfill,
					fulfillOptions: options,
					fulfillOption: shippingOption,
				});
			})
			.catch(err => {
				console.log('There was an error fetching the shipping methods', err);
			});
	};

	return (
		<main className='grid grid-cols-1 md:grid-cols-2 gap-5'>
			<div className='h-min-screen bg-yellow-300 w-full p-5'>
				<form className='w-full max-w-lg' onChange={onFormChange}>
					<ShippingInfo
						fName={fName}
						lName={lName}
						email={email}
						shippingStreet={shippingStreet}
						shippingCity={shippingCity}
						shippingZipcode={shippingZipcode}
						shippingCountry={shippingCountry}
						countries={fulfillCountries}
						shippingStateProvince={shippingStateProvince}
						subdivisions={fulfillSubdivisions}
						fulfillOptions={fulfillOptions}
						fulfillOption={fulfillOption}
						handleShippingCountryChange={handleShippingCountryChange}
						handleSubdivisionChange={handleSubdivisionChange}
					/>
					{/* Shippinpg Details Ends + Payment Method Starts */}
					{/* Component will be imported from stripe */}
					<PaymentDetails />

					{/* Shipping Method Ends + Order Completion starts */}
					<div className='md:flex md:items-center'>
						<div className='w-23/5'>
							<button
								className='shadow bg-teal-400 hover:bg-teal-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded'
								type='button'>
								Make payment
							</button>
						</div>
					</div>
				</form>
			</div>
			<div className='h-screen bg-yellow-300 w-full p-5'>Order Review</div>
		</main>
	);
};
