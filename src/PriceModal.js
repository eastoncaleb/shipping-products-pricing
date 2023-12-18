import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';

// Setting the app element for accessibility reasons
Modal.setAppElement('#root');

function PriceModal({ isOpen, toggleModal }) {
	// State hooks for storing regions, service levels, and temporary prices
	const [regions, setRegions] = useState([]);
	const [serviceLevels, setServiceLevels] = useState([]);
	const [tempPrices, setTempPrices] = useState({});

	// Fetching data from the server when the component mounts
	useEffect(() => {
		Promise.all([
			fetch('http://localhost:3001/regions').then(res => res.json()),
			fetch('http://localhost:3001/serviceLevels').then(res => res.json()),
			fetch('http://localhost:3001/prices').then(res => res.json()),
		]).then(([regionsData, serviceLevelsData, pricesData]) => {
			// Setting the fetched data to state
			setRegions(regionsData);
			setServiceLevels(serviceLevelsData);

			// Creating a map of prices for easy access
			const tempPricesMap = pricesData.reduce((acc, price) => {
				const key = `${price.regionId}-${price.serviceLevelId}`;
				acc[key] = { ...price, originalPrice: price.price };
				return acc;
			}, {});

			setTempPrices(tempPricesMap);
		});
	}, []);

	// Handler for individual price change in cells
	const handlePriceChange = (regionId, serviceLevelId, newPrice) => {
		const key = `${regionId}-${serviceLevelId}`;

		// Updating the temporary prices state
		setTempPrices(prev => ({
			...prev,
			[key]: {
				...prev[key],
				price: newPrice !== '' ? Number(newPrice) : prev[key].originalPrice,
			},
		}));
	};

	// Handler for mass price update in a column
	const updateColumnPrices = (regionId, newPrice) => {
		setTempPrices(prev => {
			const updatedPrices = { ...prev };
			serviceLevels.forEach(sl => {
				const key = `${regionId}-${sl.id}`;
				if (prev[key]) {
					updatedPrices[key] = {
						...prev[key],
						price: newPrice !== '' ? Number(newPrice) : prev[key].originalPrice,
					};
				}
			});
			return updatedPrices;
		});
	};

	// Handler for saving updated prices to the server
	const savePrices = () => {
		Object.entries(tempPrices).forEach(([key, data]) => {
			const { id, price, regionId, serviceLevelId } = data;

			// PUT request to update each price
			fetch(`http://localhost:3001/prices/${id}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					id,
					regionId,
					serviceLevelId,
					price: Number(price)
				}),
			});
		});

		// Closing the modal after saving
		toggleModal();
	};

	// Rendering the modal with a table of prices
	return (
		<Modal isOpen={isOpen} onRequestClose={toggleModal} style={{
			overlay: {
				backgroundColor: '#f2f2f2'
			},
			content: {
				color: '#504D4D'
			}
		}}>
			<table className='table-auto mx-auto'>
				<thead>
					<tr>
						<th></th>
						{regions.map(region => (
							<th key={region.id}>
								<span className="text-sm">{region.name}</span><br />
								<input
									type="number"
									placeholder={`Mass assign price`}
									className="text-center border text-sm py-2 shadow rounded-lg mb-2 mt-1"
									onChange={e => updateColumnPrices(region.id, e.target.value)}
								/>
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					{serviceLevels.map(serviceLevel => (
						<tr key={serviceLevel.id}>
							<td className='text-center px-4 font-bold'>{serviceLevel.name}</td>
							{regions.map(region => {
								const key = `${region.id}-${serviceLevel.id}`;
								return (
									<td key={key} className='text-center'>
										<input
											type="number"
											value={tempPrices[key] ? tempPrices[key].price : ''}
											className="bg-gray-100 text-sm p-2 rounded-lg"
											onChange={e => handlePriceChange(region.id, serviceLevel.id, e.target.value)}
										/>
									</td>
								);
							})}
						</tr>
					))}
				</tbody>
			</table>
			<button
				onClick={savePrices}
				className="flex text-lg bg-blue-500 rounded-lg border-b-4 border-blue-600 focus:border-t-4 focus:border-b-0 focus:shadow-inner mx-auto my-8 px-4 py-2 font-bold text-white hover:bg-blue-400"
			>
				Save Pricing
			</button>
		</Modal>
	);
}

export default PriceModal;
