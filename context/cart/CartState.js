import { client } from 'lib/commerce';
import { useReducer } from 'react';

import CartContext from './cartContext';
import CartReducer from './cartReducer';
import {
	RETRIEVE_CART_SUCCESS,
	RETRIEVE_CART_ERROR,
	ADD_TO_CART_SUCCESS,
	ADD_TO_CART_ERROR,
	UPDATE_CART_ITEM_SUCCESS,
	UPDATE_CART_ITEM_ERROR,
	REMOVE_FROM_CART_SUCCESS,
	REMOVE_FROM_CART_ERROR,
	REFRESH_CART_SUCCESS,
	REFRESH_CART_ERROR,
} from '../types';

const CartState = props => {
	/** 
   Initial state 
  */

	const initialState = {
		cart: {},
		loading: false,
	};

	const [state, dispatch] = useReducer(CartReducer, initialState);

	/**
	 * Cart Actions
	 */

	// Retrieve Cart
	const retrieveCart = () => {
		return client.cart
			.retrieve()
			.then(cart => {
				dispatch({
					type: RETRIEVE_CART_SUCCESS,
					payload: cart,
				});
			})
			.catch(err => {
				console.log('Error retrieving art', err);
				dispatch({
					type: RETRIEVE_CART_ERROR,
				});
			});
	};

	// Add to Cart
	const addToCart = (productId, quantity) => {
		return client.cart
			.add(productId, quantity)
			.then(product => {
				dispatch({
					type: ADD_TO_CART_SUCCESS,
					payload: product,
				});
			})
			.catch(err => {
				console.log('Error adding product to cart', err);
				dispatch({
					type: ADD_TO_CART_ERROR,
				});
			});
	};

	// Update Cart
	const updateCartItem = (lineItemId, quantity) => {
		return client.cart
			.update(lineItemId, { quantity })
			.then(item => {
				dispatch({
					type: UPDATE_CART_ITEM_SUCCESS,
					payload: item,
				});
			})
			.catch(err => {
				console.log('Error updating cart', err);
				dispatch({
					type: UPDATE_CART_ITEM_ERROR,
				});
			});
	};

	//Remove From Cart
	const removeFromCart = lineItemId => {
		return client.cart
			.remove(lineItemId)
			.then(res => {
				dispatch({
					type: REMOVE_FROM_CART_SUCCESS,
					payload: res,
				});
			})
			.catch(err => {
				console.log('Error removing from cart', err);
				return {
					type: REMOVE_FROM_CART_ERROR,
				};
			});
	};

	// Refesh Cart
	const refreshCart = async () => {
		return client.cart
			.refresh()
			.then(cart => {
				dispatch({
					type: REFRESH_CART_SUCCESS,
					payload: cart,
				});
			})
			.catch(err => {
				console.log('Error refreshing cart', err);
				dispatch({
					type: REFRESH_CART_ERROR,
				});
			});
	};

	return (
		<CartContext.Provider
			value={{
				cart: state.cart,
				loading: state.loading,
				retrieveCart,
				addToCart,
				updateCartItem,
				removeFromCart,
				refreshCart,
			}}>
			{props.children}
		</CartContext.Provider>
	);
};

export default CartState;
