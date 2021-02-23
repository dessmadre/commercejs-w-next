import { CardElement } from '@stripe/react-stripe-js';

export const PaymentDetails = ({
	cardNum,
	expMonth,
	expYear,
	cvc,
	onFormChange,
}) => {
	return (
		<div className='flex flex-wrap -mx-3 mb-6'>
			<h4 className='w-full px-3 mb-5 text-2xl font-semibold'>
				Payment Information
			</h4>
			<div className='checkout__form-group-full'>
				<label className='checkout__form-label' htmlFor='cardNum'>
					Credit/debit card
				</label>
				<input
					className='checkout__form-input no-resize'
					id='cardNum'
					name='cardNum'
					value={cardNum}
					onChange={onFormChange}
				/>
			</div>
			<div className='checkout__form-group-2'>
				<label className='checkout__form-label' htmlFor='cardNum'>
					Exp. Month
				</label>
				<input
					className='checkout__form-input no-resize'
					id='expMonth'
					name='expMonth'
					value={expMonth}
					onChange={onFormChange}
				/>
			</div>
			<div className='checkout__form-group-2'>
				<label className='checkout__form-label' htmlFor='cardNum'>
					Exp. Year
				</label>
				<input
					className='checkout__form-input no-resize'
					id='expYear'
					name='expYear'
					value={expYear}
					onChange={onFormChange}
				/>
			</div>
			<div className='checkout__form-group-1'>
				<label className='checkout__form-label' htmlFor='cardNum'>
					CVC
				</label>
				<input
					className='checkout__form-input no-resize'
					id='ccv'
					name='cvc'
					value={cvc}
					onChange={onFormChange}
				/>
			</div>
		</div>
	);
};
