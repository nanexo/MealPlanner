import React, { useState, useEffect } from 'react';
import MealCard from './MealCard';
import { mealStore } from './MealStore';
import './MealContainer.css';

import Grid from '@material-ui/core/Grid';


function MealContainer(props) {
	const [state, setState] = useState({meals: mealStore.getMeals()});

	useEffect(() => {
		let onUpdate = () => setState({meals: mealStore.getMeals()});
		mealStore.addUpdateListener(onUpdate);
		return () => mealStore.removeUpdateListener(onUpdate);
	}, []);

	const mealCards = state.meals.map((meal, index) => <Grid item key={meal.id}><MealCard title={meal.title} id={meal.id} items={meal.meals} /></Grid>)
	
	return (
		<Grid container spacing={2} justify="center">
			{mealCards}
		</Grid>
	);
}

export default MealContainer;