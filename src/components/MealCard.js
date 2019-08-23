import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { Paper, Grid, Divider, List, ListItem, ListItemText, Typography, Button, Collapse, Box, ButtonBase } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import MacrosPanel from './MacrosPanel';

const useStyles = makeStyles(theme => ({
	cardPadding: {
		padding: '1rem'
	},
	cardActionArea: {
		padding: '0.5em'
	}
}));


function MealCard(props) {
	const [expanded, setExpanded] = React.useState(false);
	const classes = useStyles();

	const { meal, macroTotals, getTitle, getAmountLabel } = props;

	const mealEntries = meal.meals.map((mealEntry, index) => {
		return (
			<ListItem key={index}>
				<ListItemText primary={getTitle(mealEntry)} secondary={mealEntry.amount + getAmountLabel(mealEntry)} />
			</ListItem>
			);
	});

	const onExpandClicked = () => setExpanded(!expanded);

	return (
		<Paper>
			<Grid container direction="column">
				<Grid item>
					<Typography variant="h6" component="h2" className={classes.cardPadding}>{meal.title}</Typography>
				</Grid>
				<Grid item>
					<ButtonBase component={Link} to={'/meals/'+meal.id}>
						<Grid container direction="column">
							<Grid item className={classes.cardPadding}>
								<MacrosPanel data={macroTotals} size={200} />
							</Grid>
							<Grid item>
								<Collapse in={expanded} timeout="auto" unmountOnExit>
									<List>
										{mealEntries}
									</List>
								</Collapse>
							</Grid>
						</Grid>
					</ButtonBase>
				</Grid>
			</Grid>
			<Divider/>
			<Box className={classes.cardActionArea}>
				<Button className={classes.button} onClick={onExpandClicked}>{expanded ? 'COLLAPSE' : 'EXPAND'}</Button>
			</Box>
		</Paper>
	);
}



const mapStateToProps = (state, ownProps) => {
	const getFoodItem = id => {
		let [db, foodId] = id.split('-');
		foodId = parseInt(foodId);
		return state.foods[db].find(food => food.id === foodId);
	}
	const getServingSize = food => {
		let servingSize = state.servingSizes.find(size => size.id === food.servingSizeId);
		if(!servingSize) {
			// default to first
			servingSize = state.servingSizes[0];
		}
		return servingSize;
		
	}
	
	const sumFunc = name => {
		return (agg, item) => {
			const food = getFoodItem(item.foodId);
			return agg + (food[name] * (item.amount / getServingSize(food).value));
		};
	};

	const getMacroTotals = meal => {
		return {
			protein: meal.meals.reduce(sumFunc('protein'), 0),
			carbs: meal.meals.reduce(sumFunc('carbs'), 0),
			fat: meal.meals.reduce(sumFunc('fat'), 0)
		}
	};

	const { meal } = ownProps;

	return {
		macroTotals: getMacroTotals(meal),
		getTitle: mealEntry => getFoodItem(mealEntry.foodId).title,
		getAmountLabel: mealEntry => getServingSize(getFoodItem(mealEntry.foodId)).valueLabel
	};
}


export default connect(mapStateToProps)(MealCard);
