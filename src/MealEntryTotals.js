import React from 'react';
import { mealStore } from './MealStore';

function MealEntryTotals(props) {
	const sumFunc = function(name) {
		return function(agg, item) {
			const food = mealStore.getFood(item.foodId);
			return agg + (food[name] * (item.amount / food.amount));
		};
	};

	const proteinTotals = props.items.reduce(sumFunc('protein'), 0);
	const carbTotals = props.items.reduce(sumFunc('carbs'), 0);
	const fatTotals = props.items.reduce(sumFunc('fat'), 0);

	return (
		<>
			<span>Protein:</span><span>{proteinTotals.toFixed(1)}g</span>
			<span>Carbs:</span><span>{carbTotals.toFixed(1)}g</span>
			<span>Fat:</span><span>{fatTotals.toFixed(1)}g</span>
		</>
	);
}

export default MealEntryTotals;