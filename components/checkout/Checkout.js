import { useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';

import ccFormat from 'utils/ccFormat';
import usePrev from 'utils/usePrev';
import { client } from 'lib/commerce';
import { ShippingInfo, OrderReview } from 'components/checkout';
import CartContext from 'context/cart/cartContext';
import CheckoutContext from 'context/checkout/checkoutContext';
import { PaymentDetails } from './PaymentDetails';

export const Checkout = () => {
	const router = useRouter();
	const cartContext = useContext(CartContext);
	const checkoutContext = useContext(CheckoutContext);

	const { cart } = cartContext;
	const {
		generateCheckoutTokenFromCart,
		setShippingOptionInCheckout,
		getShippingOptionsForCheckout,
		captureOrder,
		checkoutToken,
		shippingOptions,
		live,
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
		cardNum: ccFormat('4242424242424242'),
		expMonth: '11',
		expYear: '24',
		cvc: '123',
		billingZipCode: '91402',
	});

	// Fullfillment and Shipping data
	const [fulfill, setFulfill] = useState({
		fulfillCountries: {},
		fulfillSubdivisions: {},
		fulfillOption: '',
	});

	const { fName, lName, email } = customer;
	const {
		deliveryCountry,
		deliveryRegion,
		shippingStreet,
		shippingCity,
		shippingStateProvince,
		shippingZipcode,
		shippingCountry,
	} = shipping;
	const { cardNum, expMonth, expYear, cvc } = payment;
	const { fulfillCountries, fulfillSubdivisions, fulfillOption } = fulfill;

	useEffect(() => {
		if (cart && cart.total_items === 0) {
			redirectOutOfCheckout();
		}

		generateToken();

		if (fulfillOption !== '') {
			if (prevShipMethod !== fulfillOption) {
				setShippingOptionInCheckout(
					checkoutToken.id,
					fulfillOption,
					deliveryCountry,
					shippingStateProvince,
				);
			}
		}
	}, [fulfillOption]);

	const prevShipMethod = usePrev(fulfillOption);

	const redirectOutOfCheckout = () => {
		router.push('/');
	};

	const generateToken = () => {
		if (typeof cart.id === 'undefined') {
			return;
		}

		if (cart.id) {
			return generateCheckoutTokenFromCart(cart.id).then(checkoutToken => {
				fetchShippingCountries(checkoutToken.id);
				return getShippingOptionsForCheckout(
					checkoutToken.id,
					deliveryCountry,
					deliveryRegion,
				);
			});
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

	const handleShippingCountryChange = e => {
		const currentValue = e.target.value;
		fetchSubdivisions(currentValue);
	};

	const handleSubdivisionChange = e => {
		const currentValue = e.target.value;
		getShippingOptionsForCheckout(
			checkoutToken.id,
			shippingCountry,
			currentValue,
		);
	};

	const handleCaptureSuccess = result => {
		router.push('/checkout/confirm');
	};

	const captureOrderFromCheckout = e => {
		e.preventDefault();

		const newOrder = {
			line_items: live.line_items,
			customer: {
				firstname: fName,
				lastname: lName,
				email: email,
			},
			shipping: {
				name: `${fName} ${lName}`,
				country: shippingCountry,
				street: shippingStreet,
				town_city: shippingCity,
				county_state: shippingStateProvince,
				postal_zip_code: shippingZipcode,
			},
			fulfillment: {
				shipping_method: fulfillOption,
			},
			payment: {
				gateway: 'test_gateway',
				card: {
					number: cardNum,
					expiry_month: expMonth,
					expiry_year: expYear,
					cvc: cvc,
					postal_zip_code: shippingZipcode,
				},
			},
		};

		captureOrder(checkoutToken.id, newOrder)
			.then(handleCaptureSuccess)
			.catch(err => {
				console.log('There was an error capturing the order', err);
			});
	};

	return (
		<main className='grid grid-cols-1 grid-rows-2 lg:grid-cols-2 gap-5'>
			<div className='w-full row-span-full p-5'>
				<form className='w-full' onChange={onFormChange}>
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
						shippingOptions={shippingOptions}
						fulfillOption={fulfillOption}
						handleShippingCountryChange={handleShippingCountryChange}
						handleSubdivisionChange={handleSubdivisionChange}
						onFormChange={onFormChange}
						prevShipMethod={prevShipMethod}
					/>
					{/* Shippinpg Details Ends + Payment Method Starts */}
					{/* Component will be imported from stripe */}

					<PaymentDetails
						cardNum={cardNum}
						expMonth={expMonth}
						expYear={expYear}
						cvc={cvc}
					/>
					{/* Shipping Method Ends + Order Completion starts */}
					<div className='md:flex md:items-center'>
						<div className='w-3/5'>
							<motion.button
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
								className='text-center bg-indigo-300 hover:bg-indigo-400 py-2 px-5 font-semibold border-gray-600 border-2 text-gray-600'
								type='submit'
								onClick={captureOrderFromCheckout}>
								Make payment
							</motion.button>
						</div>
					</div>
				</form>
			</div>
			<div className='row-span-1 bg-green-50 w-full p-5'>
				<OrderReview fulfillOption={fulfillOption} />
			</div>
		</main>
	);
};
