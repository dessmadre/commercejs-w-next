import { SET_CUSTOMER, CLEAR_CUSTOMER } from '../types';

export default (state, action) => {
	switch (action.type) {
		case SET_CUSTOMER:
			return {
				...state,
				customer: action.payload,
			};
		case CLEAR_CUSTOMER:
			return {
				...state,
				customer: null,
			};
		default:
			return state;
	}
};
