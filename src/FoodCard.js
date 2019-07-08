import React from 'react';
import Entry from './Entry';
import CalorieDisplay from './CalorieDisplay';
import { mealStore } from './MealStore';
import './FoodCard.css';

function FoodCard(props) {
	const onMacroChanged = (field, value) => mealStore.updateFood(props.food.id, field, value);

	return (
		<div className="food-card-wrapper">
			<div className="food-card-cals-display"><CalorieDisplay data={props.food} size={160} /></div>
			<div className="food-card-protein-input">
				<Entry field="protein" value={props.food.protein} appearance="foodentry" autoWidth={true} onValueChanged={onMacroChanged} />
				<span>g</span>
			</div>
			<div className="food-card-protein-label">Protein</div>
			<div className="food-card-carbs-input">
				<Entry field="carbs" value={props.food.carbs} appearance="foodentry" autoWidth={true} onValueChanged={onMacroChanged} />
				<span>g</span>
			</div>
			<div className="food-card-carbs-label">Carbs</div>
			<div className="food-card-fat-input">
				<Entry field="fat" value={props.food.fat} appearance="foodentry" autoWidth={true} onValueChanged={onMacroChanged} />
				<span>g</span>
			</div>
			<div className="food-card-fat-label">Fat</div>
		</div>
	)
}

export default FoodCard;
