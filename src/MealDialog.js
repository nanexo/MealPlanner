import React from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import MealEntryCard from './MealEntryCard';
import { useDispatch } from './State';

const useStyles = makeStyles(theme => ({
	dialogRoot: {
		height: '500px'
	},
	mainContent: {
		height: '100%'
	}
}));

const clone = (obj) => {
	return JSON.parse(JSON.stringify(obj));
}

function MealDialog(props) {
	const classes = useStyles();
	const dispatch = useDispatch();

	const [tempMeal, setTempMeal] = React.useState(props.meal ? clone(props.meal) : {meals: []});

	const dialogTitle = Boolean(props.meal) ? 'Edit Meal' : 'New Meal';
	
	const onSave = () => {
		console.log('onSave', tempMeal)
		dispatch({type: 'saveMeal', meal: tempMeal});
		onClose();
	};
	const onClose = () => dispatch({type: 'closeMealDialog'});

	const onChangeTitle = event => {
		const t = {...tempMeal};
		t.title = event.target.value;
		setTempMeal(t);
	}

	const createCheckHandler = food => () => {
		const t = {...tempMeal};
		const foodIndex = t.meals.findIndex(mealEntry => mealEntry.foodId === food.id);
		if(foodIndex !== -1) {
			t.meals.splice(foodIndex, 1);
		} else {
			t.meals.push({foodId: food.id, amount: food.amount});
		}
		setTempMeal(t);
	};

	const createAmountChangedHandler = food => amount => {
		const t = {...tempMeal};
		const foodIndex = t.meals.findIndex(mealEntry => mealEntry.foodId === food.id);
		if(foodIndex !== -1) {
			t.meals[foodIndex].amount = amount;
		} else {
			throw Error(`no mealEntry found for food: ${food.id}`)
		}
		setTempMeal(t);
	};

	const isChecked = food => {
		return tempMeal.meals.find(mealEntry => mealEntry.foodId === food.id);
	}

	const getAmount = food => {
		return (tempMeal.meals.find(mealEntry => mealEntry.foodId === food.id) || food).amount;
	}

	const mealEntryCards = props.foodList.map(item => {
		return (
			<Grid item key={item.id}>
				<MealEntryCard
					title={item.title}
					amount={getAmount(item)}
					checked={isChecked(item)}
					onChecked={createCheckHandler(item)}
					onAmountChanged={createAmountChangedHandler(item)} 
				/>
			</Grid>)
	});

	return (
		<Dialog open={props.open} onClose={onClose} aria-labelledby="form-dialog-title" maxWidth="sm" fullWidth>
			<DialogTitle id="form-dialog-title">{dialogTitle}</DialogTitle>
			<DialogContent dividers className={classes.dialogRoot}>
				<Grid container spacing={2} direction="column">
					<Grid item>
						<TextField
							autoFocus
							fullWidth
							id="title"
							label="Title"
							value={tempMeal.title}
							onChange={onChangeTitle}
							/>
					</Grid>
					<Grid item container xs spacing={2} justify="space-between">
						{mealEntryCards}
					</Grid>
				</Grid>
			</DialogContent>
			<DialogActions>
				<Button onClick={onClose}>Close</Button>
				<Button onClick={onSave} color="primary">Save</Button>
			</DialogActions>
		</Dialog>
		);
}

export default MealDialog;