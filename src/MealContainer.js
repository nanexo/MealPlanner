import React from 'react';
import MealCard from './MealCard';

import { Grid } from '@material-ui/core';

function MealContainer(props) {
	const mealCards = props.items.map((item, index) => <Grid item key={item.id}><MealCard meal={item} /></Grid>)
	return (
		<div>
			<Grid container spacing={2} justify="center">
				{mealCards}
			</Grid>
		</div>
	);
}

export default MealContainer;