import React from 'react';
import Entry from './Entry';
import Card from './Card';
import MacrosPanel from './MacrosPanel';
import { mealStore } from './MealStore';

import './MealCard.css';


function MealCard(props) {
		const mealEntries = props.items.map((mealEntry, index) => {
			const valueChanged = (field, value) => mealStore.updateMealAmount(props.id, mealEntry.id, value);
			const foodLabel = mealStore.getFood(mealEntry.foodId).title;
			return (
				<div className={`meal-card-line ${index % 2 === 1 ? 'meal-line-odd' : ''}`}>
					<span className="meal-card-food-label">{foodLabel}</span>
					<div className="meal-card-food-amount">
						<Entry key={mealEntry.id} value={mealEntry.amount} appearance="foodentry" autoWidth onValueChanged={valueChanged} /><span>g</span>
					</div>
				</div>
				);
		});

		const sumFunc = (name) => {
			return (agg, item) => {
				const food = mealStore.getFood(item.foodId);
				return agg + (food[name] * (item.amount / food.amount));
			};
		};


		const data = {
			protein: props.items.reduce(sumFunc('protein'), 0),
			carbs:  props.items.reduce(sumFunc('carbs'), 0),
			fat:  props.items.reduce(sumFunc('fat'), 0)
		};

		return (
			<Card title={props.title} editableTitle={true}>
				<div className="meal-card-wrapper">
					<div className="meal-card-macro-panel"><MacrosPanel data={data} /></div>
					<div className="meal-card-divider"></div>
					<div className="meal-card-items">
						{mealEntries}
					</div>
				</div>
			</Card>
		);
}

export default MealCard;
