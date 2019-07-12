import React from 'react';
import MealCard from './MealCard';

import { makeStyles } from '@material-ui/core/styles';
import { Grid, Box } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
	root: {
		maxWidth: `calc(100% - ${theme.spacing(2)}px)`,
		margin: 'auto'
	}
}));

function MealContainer(props) {
	const classes = useStyles();

	const mealCards = props.items.map((item, index) => <Grid item key={item.id}><MealCard title={item.title} id={item.id} items={item.meals} /></Grid>)
	
	return (
		<Box className={classes.root}>
			<Grid container spacing={2} justify="center">
				{mealCards}
			</Grid>
		</Box>
	);
}

export default MealContainer;