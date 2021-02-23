import Link from 'next/link';
import { useRouter } from 'next/router';

export const CheckoutBreadcrumbs = () => {
	const router = useRouter();
	const current = router.pathname;

	return (
		<div className='w-1/3 px-6'>
			<div className='flex w-1/4 justify-between'>
				<Link href='/'>
					<a className='font-semibold text-xl text-gray-400 hover:text-black'>
						Home
					</a>
				</Link>

				<span className='text-xl font-semibold mx-2 cursor-default'>{'>'}</span>

				<p className={`font-semibold text-xl cursor-default`}>
					{current === '/checkout' ? 'Chekout' : 'Confirm'}
				</p>
			</div>
		</div>
	);
};
