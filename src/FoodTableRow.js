import React from 'react';
import FoodTableRowCell from './FoodTableRowCell';


function FoodTableRow(props) {
	const foodRowCells = props.trackedData.map((data, index) => <FoodTableRowCell key={index} food={props.food} data={data} />);

	return (
		<tr>
			{foodRowCells}
		</tr>
	);
}

export default FoodTableRow;
