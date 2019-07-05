import React from 'react';

function FoodCard(props) {
	const inflateRow = (name) => <div><span>{name}:</span><span>{props.food[name]}</span></div>;

	return ['protein', 'carbs', 'fat', 'amount'].map(inflateRow);
}
export default FoodCard;
