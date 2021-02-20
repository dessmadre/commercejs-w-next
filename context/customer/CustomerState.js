import { useReducer } from 'react';

import { client } from 'lib/commerce';
import CustomerContext from './customerContext';
import CustomerReducer from './customerReducer';
import { SET_CUSTOMER, CLEAR_CUSTOMER } from '../types';

const CustomerState = ({ children }) => {
	const initialState = {
		customer: null,
	};

	const [state, dispatch] = useReducer(CustomerReducer, initialState);

	// Customer Actions

	// check to see if the customer is logged in
	const setCustomer = async () => {
		const isLoggedIn = await client.customer.isLoggedIn();
		if (!isLoggedIn || isLoggedIn === false) {
			return;
		}
		const customer = await client.customer.about();
		dispatch({
			type: SET_CUSTOMER,
			payload: customer.data,
		});
	};

	const clearCustomer = () => {
		dispatch({
			type: CLEAR_CUSTOMER,
		});
	};

	return (
		<CustomerContext.Provider
			value={{ customer: state.customer, setCustomer, clearCustomer }}>
			{children}
		</CustomerContext.Provider>
	);
};

export default CustomerState;
