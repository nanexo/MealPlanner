import React, { useState, useEffect } from 'react';
import MealCard from './MealCard';
import Card from './Card';
import DockContainer from './layout/DockContainer';
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
	const mealContainer = <div className="meal-container">{mealCards}</div>;

	const onNewClickHandler = () => mealStore.addMeal();

	const newMealCard = <Card title="New" onClickHandler={onNewClickHandler} />
	return (
		<DockContainer
			left={mealContainer}
			center={newMealCard}
			/>
	);
}

export default MealContainer;