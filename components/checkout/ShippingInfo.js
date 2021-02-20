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
	fulfillOptions,
	fulfillOption,
	handleShippingCountryChange,
	handleSubdivisionChange,
}) => {
	return (
		<>
			<div className='flex flex-wrap -mx-3 mb-6'>
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
						placeholder='Jane'
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
						placeholder='S'
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
						type='text'
						placeholder='Doe'
					/>
				</div>
			</div>

			<div className='flex flex-wrap -mx-3 mb-6'>
				<div className='checkout__form-group-half'>
					<label className='checkout__form-label' htmlFor='country'>
						Country
					</label>
					<select
						className='checkout__form-input'
						id='country'
						value={shippingCountry}
						onChange={handleShippingCountryChange}>
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
						<option disabled>State/Province</option>
						{Object.entries(subdivisions).map(([code, name]) => {
							return (
								<option
									className='checkout__form-input'
									value={code}
									key={code}>
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
						value={fulfillOption.id}>
						<option disabled>Shipping Method</option>
						{fulfillOptions.map((method, index) => {
							<option value={method.id} key={index}>
								{`${method.description} - ${method.price.formatted_with_symbol}`}
							</option>;
						})}
					</select>
				</div>
			</div>
		</>
	);
};
