import React from 'react';
import Entry from './Entry';
import GridContainer from './layout/GridContainer';
import { mealStore } from './MealStore';

function FoodCard(props) {
	const valueChanged = (field, value) => mealStore.updateFood(props.food.id, field, value);
	const inflateEntries = (name, index) => <Entry key={index} field={name} label={name} value={props.food[name]} onValueChanged={valueChanged} />;

	const entries = ['protein', 'carbs', 'fat', 'amount'].map(inflateEntries);

	return (
		<GridContainer columns={2}>
			{entries}
		</GridContainer>
	)
}

export default FoodCard;
