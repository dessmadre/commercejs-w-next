import usePrev from 'utils/usePrev';

export const ShippingInfo = ({
	fName,
	lName,
	email,
	shippingStreet,
	shippingCity,
	shippingZipcode,
	shippingCountry,
	countries = {},
	shippingStateProvince,
	subdivisions = {},
	shippingOptions,
	fulfillOption,
	handleShippingCountryChange,
	handleSubdivisionChange,
	onFormChange,
}) => {
	return (
		<>
			<div className='flex flex-wrap -mx-3 mb-6'>
				<h4 className='w-full px-3 mb-5 text-2xl font-semibold'>
					Customer Information
				</h4>
				<div className='checkout__form-group-2'>
					<label className='checkout__form-label' htmlFor='fName'>
						First Name
					</label>
					<input
						className='checkout__form-input'
						id='fName'
						name='fName'
						value={fName}
						type='text'
						onChange={onFormChange}
						placeholder=''
					/>
				</div>
				<div className='checkout__form-group-1'>
					<label className='checkout__form-label' htmlFor='mInitial'>
						M.I.
					</label>
					<input
						className='checkout__form-input'
						id='mInitial'
						type='text'
						placeholder=''
					/>
				</div>
				<div className='w-full md:w-2/5 px-3'>
					<label className='checkout__form-label' htmlFor='lName'>
						Last Name
					</label>
					<input
						className='checkout__form-input'
						id='lName'
						name='lName'
						value={lName}
						onChange={onFormChange}
						type='text'
						placeholder=''
					/>
				</div>
			</div>

			<div className='flex flex-wrap -mx-3 mb-6'>
				<h4 className='w-full px-3 mb-5 text-2xl font-semibold'>
					Shipping Information
				</h4>
				<div className='checkout__form-group-half'>
					<label className='checkout__form-label' htmlFor='country'>
						Country
					</label>
					<select
						className='checkout__form-input'
						id='country'
						name='shippingCountry'
						value={shippingCountry}
						onChange={handleShippingCountryChange}>
						<option>Country</option>
						{Object.entries(countries).map(([code, name]) => {
							return (
								<option value={code} key={code}>
									{name}
								</option>
							);
						})}
					</select>
				</div>
				<div className='checkout__form-group-half'>
					<label className='checkout__form-label' htmlFor='city'>
						City
					</label>
					<input
						className='checkout__form-input'
						id='city'
						name='shippingCity'
						onChange={onFormChange}
						value={shippingCity}
						type='text'
					/>
				</div>
				<div className='checkout__form-group-half'>
					<label className='checkout__form-label' htmlFor='address-1'>
						Address Line 1*
					</label>
					<input
						className='checkout__form-input'
						id='address-1'
						name='shippingStreet'
						onChange={onFormChange}
						value={shippingStreet}
						type='text'
					/>
				</div>
				<div className='checkout__form-group-half'>
					<label className='checkout__form-label' htmlFor='address-2'>
						Address Line 2(optional)
					</label>
					<input className='checkout__form-input' id='address-2' type='text' />
				</div>
				<div className='checkout__form-group-half'>
					<label className='checkout__form-label' htmlFor='state'>
						State/Province/Region
					</label>
					<select
						className='checkout__form-input'
						id='state'
						name='shippingStateProvince'
						onChange={handleSubdivisionChange}
						value={shippingStateProvince}>
						<option>State/Province</option>
						{Object.entries(subdivisions).map(([code, name]) => {
							return (
								<option value={code} key={code}>
									{name}
								</option>
							);
						})}
					</select>
				</div>
				<div className='checkout__form-group-half'>
					<label className='checkout__form-label' htmlFor='zip'>
						Postal Code
					</label>
					<input
						className='checkout__form-input'
						id='zip'
						name='shippingZipcode'
						value={shippingZipcode}
						onChange={onFormChange}
						type='text'
					/>
				</div>
				<div className='checkout__form-group-half'>
					<label className='checkout__form-label' htmlFor='phone'>
						Telephone
					</label>
					<input className='checkout__form-input' id='phone' type='text' />
				</div>
				<div className='checkout__form-group-half'>
					<label className='checkout__form-label' htmlFor='email'>
						Email Address
					</label>
					<input
						className='checkout__form-input'
						id='email'
						name='email'
						value={email}
						onChange={onFormChange}
						type='email'
					/>
				</div>
				<div className='checkout__form-group-full'>
					<label className='checkout__form-label' htmlFor='shippingMethod'>
						Shipping Method
					</label>
					<select
						className='checkout__form-input'
						id='shippingMethod'
						name='fulfillOption'
						value={fulfillOption}
						onChange={onFormChange}>
						<option>Select a Shipping Method</option>
						{shippingOptions.map((method, index) => {
							return (
								<option
									className='checkout__form-input'
									value={method.id}
									key={
										index
									}>{`${method.description}-${method.price.formatted_with_code}`}</option>
							);
						})}
					</select>
				</div>
			</div>
		</>
	);
};
