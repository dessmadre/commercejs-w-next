import {
	CAPTURE_ORDER_SUCCESS,
	GENERATE_CHECKOUT_TOKEN,
	GET_SHIPPING_OPTIONS,
	REMOVE_SHIPPING_OPTIONS,
	UPDATE_CHECKOUT_LIVE_OBJECT,
	ABORT_CHECKOUT,
} from '../types';

export default (state, action) => {
	switch (action.type) {
		case GENERATE_CHECKOUT_TOKEN:
			return {
				...state,
				checkout: {
					...state.checkout,
					checkoutToken: action.payload,
				},
			};
		case GET_SHIPPING_OPTIONS:
			return {
				...state,
				checkout: {
					...state.checkout,
					shippingOptions: action.payload,
				},
			};
		case REMOVE_SHIPPING_OPTIONS:
			return {
				...state,
				checkout: {
					...state.checkout,
					shippingOptions: [],
				},
			};
		case UPDATE_CHECKOUT_LIVE_OBJECT:
			return {
				...state,
				checkout: {
					...state.checkout,
					live: action.payload,
				},
			};
		case ABORT_CHECKOUT:
			return {
				...state,
				checkout: state.checkout,
			};
		case CAPTURE_ORDER_SUCCESS:
			return {
				...state,
				checkout: state.checkout,
				orderReceipt: action.payload,
			};

		default:
			return state;
	}
};
