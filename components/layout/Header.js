import { useContext, useEffect, useState } from 'react';

import Link from 'next/link';
import Image from 'next/image';
import CartContext from 'context/cart/cartContext';

import { Cart } from 'components/cart';

export default function Header() {
	const cartContext = useContext(CartContext);
	const { cart, retrieveCart } = cartContext;
	const [open, setOpen] = useState(false);

	useEffect(() => {
		retrieveCart();
	}, []);

	const handleSideBar = () => {
		setOpen(prev => !prev);
	};

	return (
		<nav className='px-24 flex items-center flex-1 bg-gray-100 w-screen fixed z-50'>
			<div className='flex-1'>
				<Link href='/'>
					<div className='relative w-10 h-10 cursor-pointer'>
						<Image src='/flame.gif' className='absolue' layout='fill' />
					</div>
				</Link>
			</div>
			<div
				className='relative h-20 w-20 cursor-pointer overflow-hidden item-end justify-self-end'
				onClick={handleSideBar}>
				<Image
					src='/cart-icon.svg'
					className='absolute'
					layout='fill'
					alt='cart icon that displays how many items are in your cart'
				/>
				{cart.total_items > 0 && (
					<div
						onClick={handleSideBar}
						className=' bg-indigo-400 w-5 h-5 p-3 text-center top-2 text-xs right-0 rounded-full absolute'>
						<span
							className={`top-1  ${
								cart.total_items > 9 ? 'left-1' : 'left-2'
							} absolute text-white`}>
							{cart.total_items}
						</span>
					</div>
				)}
			</div>
			<Cart
				className={`${
					open ? 'top-0 opacity-100' : 'menu-closed opacity-0'
				} absolute w-2/5 py-5 px-6 bg-gray-100 right-24 mt-20 z-20 shadow-xl transition-all ease-in duration-700`}
			/>
		</nav>
	);
}
