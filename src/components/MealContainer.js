import React from 'react';
import { connect } from 'react-redux';

import MealCard from './MealCard';

import { Grid } from '@material-ui/core';

function MealContainer(props) {
	const mealCards = props.items.map((item, index) => <Grid item key={item.id}><MealCard meal={item} /></Grid>)
	return (
		<Grid container spacing={2} justify="center">
			{mealCards}
		</Grid>
	);
}

const mapStateToProps = state => {
	return {
		items: state.meals
	};
}

export default connect(mapStateToProps)(MealContainer);