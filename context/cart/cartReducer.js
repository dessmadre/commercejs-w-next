import {
	RETRIEVE_CART_SUCCESS,
	ADD_TO_CART_SUCCESS,
	UPDATE_CART_ITEM_SUCCESS,
	REMOVE_FROM_CART_SUCCESS,
	REFRESH_CART_SUCCESS,
} from '../types';

export default (state, action) => {
	switch (action.type) {
		case RETRIEVE_CART_SUCCESS:
			return {
				...state,
				cart: action.payload,
			};
		case ADD_TO_CART_SUCCESS:
			return {
				...state,
				cart: action.payload.cart,
			};
		case UPDATE_CART_ITEM_SUCCESS:
			return {
				...state,
				cart: action.payload.cart,
			};
		case REMOVE_FROM_CART_SUCCESS:
			return {
				...state,
				cart: action.payload.cart,
			};
		case REFRESH_CART_SUCCESS:
			return {
				...state,
				cart: action.payload,
			};
		default:
			return state;
	}
};
