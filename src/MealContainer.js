import React from 'react';
import MealCard from './MealCard';

import { Grid, Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';


function MealContainer(props) {

	const mealCards = props.items.map((item, index) => <Grid item key={item.id}><MealCard title={item.title} id={item.id} items={item.meals} /></Grid>)
	
	return (
			<Grid container spacing={2} justify="center">
				{mealCards}
			</Grid>
	);
}

export default MealContainer;