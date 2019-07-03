import React from 'react';

function FoodTableHeader(props) {
	const foodRowCells = props.trackedData.map((data, index) => <th key={index}>{data}</th>);
	return (
		<tr>
			{foodRowCells}
		</tr>
	);
}

export default FoodTableHeader;
