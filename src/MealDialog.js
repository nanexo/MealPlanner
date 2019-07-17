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

function MealDialog(props) {
	const classes = useStyles();
	const dispatch = useDispatch();

	const meal = (props.meal || {meals: []});

	const isSelected = food => Boolean(meal.meals.find(mealEntry => mealEntry.foodId === food.id));
	const getAmount = food => ((meal.meals.find(mealEntry => mealEntry.foodId === food.id) || {}).amount || 0);
	const foodCardItems = props.foodList.map(food => ({...food, selected: isSelected(food), amount: getAmount(food)}));

	const [items, setItems] = React.useState(foodCardItems);
	const [title, setTitle] = React.useState(meal.title);

	const onSave = () => {
		const mealEntries = items.filter(item => item.selected).map(item => ({amount: item.amount, foodId: item.id}));
		dispatch({type: 'saveMeal', meal: {...props.meal, title: title, meals: mealEntries}});
		onClose();
	};
	const onDelete = () => {
		dispatch({type: 'deleteMeal', mealId: props.meal.id})
		onClose();
	};
	const onClose = () => dispatch({type: 'closeMealDialog'});

	const onChangeTitle = event => setTitle(event.target.value);
	const isNew = () => (props.meal || {}).isNew;


	const updateFoodItem = food => {
		const foodIndex = items.findIndex(item => item.id === food.id);
		if(foodIndex === -1) {
			throw Error(`no mealEntry found for food: ${food.id}`)
		}
		const newItemList = [...items];
		newItemList.splice(foodIndex, 1, food);
		setItems(newItemList);
	}

	const createCheckHandler = food => () => {
		updateFoodItem({...food, selected: !food.selected});
	};

	const createAmountChangedHandler = food => amount => {
		const fAmount = parseFloat(amount);
		if(isNaN(fAmount)) {
			throw Error('amount is not a float');
		}
		updateFoodItem({...food, amount: fAmount});
	};

	const mealEntryCards = items.map(item => {
		return (
			<Grid item key={item.id}>
				<MealEntryCard
					title={item.title}
					amountLabel={item.amountLabel}
					amount={item.amount}
					checked={item.selected}
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
							value={title}
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