import React, { useState, useEffect } from 'react';
import MealCard from './MealCard';
import { mealStore } from './MealStore';
import './MealContainer.css';

function MealContainer(props) {
	const [state, setState] = useState({meals: mealStore.getMeals()});

	useEffect(() => {
		let onUpdate = () => setState({meals: mealStore.getMeals()});
		mealStore.addUpdateListener(onUpdate);
		return () => mealStore.removeUpdateListener(onUpdate);
	}, []);

	const mealCards = state.meals.map((meal, index) => <MealCard key={meal.id} title={meal.title} id={meal.id} items={meal.meals} />)
	
	return (
		<div className="meal-container">
			<div className="meal-container-title">Meals</div>
			<div className="meal-container-list">{mealCards}</div>
		</div>
	);
}

export default MealContainer;