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

	const onSave = () => {
		dispatch({type: 'saveMeal', meal: tempMeal});
		onClose();
	};
	const onDelete = () => {
		dispatch({type: 'deleteMeal', mealId: props.meal.id})
		onClose();
	};
	const onClose = () => dispatch({type: 'closeMealDialog'});

	const onChangeTitle = event => setTempMeal({...tempMeal, title: event.target.value});
	const isNew = () => (props.meal || {}).isNew;

	const createCheckHandler = food => () => {
		const foodIndex = tempMeal.meals.findIndex(mealEntry => mealEntry.foodId === food.id);
		let newMealList = Array.from(tempMeal.meals);
		if(foodIndex !== -1) {
			newMealList.splice(foodIndex, 1);
		} else {
			newMealList.push({foodId: food.id, amount: food.amount});
		}
		setTempMeal({...tempMeal, meals: newMealList});
	};

	const createAmountChangedHandler = food => amount => {
		const foodIndex = tempMeal.meals.findIndex(mealEntry => mealEntry.foodId === food.id);
		const fAmount = parseFloat(amount);
		if(foodIndex === -1) {
			throw Error(`no mealEntry found for food: ${food.id}`)
		}
		if(isNaN(fAmount)) {
			throw Error('amount is not a float');
		}
		const newMealList = Array.from(tempMeal.meals);
		newMealList.splice(foodIndex, 1, {...tempMeal.meals[foodIndex], amount: fAmount});
		setTempMeal({...tempMeal, meals: newMealList});
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
			<DialogTitle id="form-dialog-title">{isNew() ? 'New Meal' : 'Edit Meal'}</DialogTitle>
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
				{!isNew() ? <Button onClick={onDelete} color="secondary">Delete</Button> : null}
				<Button onClick={onSave} color="primary">Save</Button>
			</DialogActions>
		</Dialog>
		);
}

export default MealDialog;