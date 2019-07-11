import React from 'react';
import { Paper, Grid, Divider, List, ListItem, ListItemText, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';


import {mealStore} from './MealStore';
import MacrosPanel from './MacrosPanel';

const useStyles = makeStyles(theme => ({

	card: {
		width: 310
	},

	title: {
		padding: '1em'
	},

	divider: {
		marginTop: '1.2em'
	}

}));

function MealCard(props) {

	const classes = useStyles();

	const mealEntries = props.items.map((mealEntry, index) => {
		const foodLabel = mealStore.getFood(mealEntry.foodId).title;
		return (
			<ListItem key={mealEntry.id}>
				<ListItemText primary={foodLabel} secondary={mealEntry.amount + 'g'} />
			</ListItem>
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
		<Paper className={classes.card}>
			<Grid container direction="column">
				<Grid item>
					<Typography variant="h6" className={classes.title}>{props.title}</Typography>
				</Grid>
				<Grid item>
					<MacrosPanel data={data} />
				</Grid>
			</Grid>
			<Divider className={classes.divider}/>
			<List component="nav" >
				{mealEntries}
			</List>
		</Paper>
	);
}

export default MealCard;
