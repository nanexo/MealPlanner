import React from 'react';
import Entry from './Entry';
import { mealStore } from './MealStore';

function FoodCard(props) {
	const callback = (name, value) => mealStore.updateFood(props.food.id, name, value);
	const inflateRow = (name, index) => <div><Entry key={index} id={name} title={name} amount={props.food[name]} onAmountChanged={callback} /></div>;

	return ['protein', 'carbs', 'fat', 'amount'].map(inflateRow);
}
export default FoodCard;
