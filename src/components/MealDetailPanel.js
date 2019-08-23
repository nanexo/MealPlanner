import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Grid, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Button, Snackbar } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import { Redirect } from 'react-router'

import AddFoodMask from './AddFoodMask';
import ConfirmationDialog from './ConfirmationDialog';
import applicationStore from '../applicationStore';
import { putMeal, deleteMeal } from '../reducers/mealReducer';
import { putFood } from '../reducers/foodReducer';

const useStyles = makeStyles(theme => {
	return {
		root: {
			margin: 'auto',
			maxWidth: theme.breakpoints.values.sm
		},
		buttonContainer: {
			alignContent: 'flex-end'
		}
	};
});

function MealDetailPanel(props) {
	const { getTitle, getAmountLabel, backPath, putMeal, deleteMeal, putFood } = props;
	const [item, setItem] = React.useState({...props.item});
	const [statusMessage, setStatusMessage] = React.useState(null);
	const [requestedDeletion, setRequestedDeletion] = React.useState(false);
	const [navigate, setNavigate] = React.useState(null);
	const classes = useStyles();

	if(!item) return null;

	if(props.item && (item.id !== props.item.id)) {
		setItem({...props.item});
	}
	const isNew = item.id === undefined;


	const onChangeTitle = event => setItem({...item, title: event.target.value});
	const onAddFood = async (food, source, amount) => {
		const mealEntries = [...item.meals, {foodId: `${source}-${food.id}`, amount: amount}];
		if(source === 'sfcd') {
			const newItem = await applicationStore.sfcdFoodCache.saveItem(food);
			putFood({item: newItem, source: 'sfcd'});
		}
		setItem({...item, meals: mealEntries});
	};

	const createRemoveMealEntryHandler = mealEntry => () => {
		setItem({...item, meals: item.meals.filter(entry => entry !== mealEntry)});
	};


	const onSave = async () => {
		try {
			const newItem = await applicationStore.meals.saveItem(item);
			// adds meal to application state
			putMeal(newItem);
			// update state of this component
			setNavigate('/meals/' + newItem.id);
			setStatusMessage('Saved successfully.');
		} catch {
			setStatusMessage('Error occurred.');
		}
	};

	const onDelete = async () => {
		setRequestedDeletion(false);
		try {
			await applicationStore.meals.deleteItem(item);
			deleteMeal(item);
			setNavigate(backPath)
		} catch {
			setStatusMessage('Error occurred');
		}
	};

	return (
		<React.Fragment>
			<Grid container spacing={2} direction="column" className={classes.root}>
				<Grid item>
					<TextField
						autoFocus
						fullWidth
						id="title"
						label="Title"
						value={item.title}
						onChange={onChangeTitle}
						/>
				</Grid>
				<Grid item>
					<AddFoodMask onAddFood={onAddFood}/>
				</Grid>
				<Grid item>
					<List>
						{
							item.meals.map((mealEntry, index) => {
								return (
									<ListItem key={index} disableGutters>
										<ListItemText primary={getTitle(mealEntry)} secondary={mealEntry.amount + getAmountLabel(mealEntry)} />
										<ListItemSecondaryAction>
											<IconButton edge="end" onClick={createRemoveMealEntryHandler(mealEntry)}>
												<Delete />
											</IconButton>
										</ListItemSecondaryAction>
									</ListItem>
								);
							})
						}
					</List>
				</Grid>
				<Grid item className={classes.buttonContainer}>
					<Grid container spacing={2} justify="flex-end">
						<Grid item>
							{ !isNew && <Button color="secondary" onClick={() => setRequestedDeletion(true)}>Delete</Button> }
						</Grid>
						<Grid item>
							<Button variant="contained" color="primary" onClick={onSave}>Save</Button>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
			<Snackbar open={Boolean(statusMessage)} message={<span>{statusMessage}</span>} autoHideDuration={3000} onClose={() => setStatusMessage(null)}/>
			<ConfirmationDialog 
				open={Boolean(requestedDeletion)} 
				title="Confirm"
				message="Are you sure you want to delete this item?"
				onClose={() => setRequestedDeletion(false)}
				onConfirm={onDelete} 
				/>
			{ navigate && <Redirect to={navigate} replace /> }
		</React.Fragment>
	);
}

const mapStateToProps = (state, { match }) => {
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

	const mealId = parseInt(match.params.id);
	let item = isNaN(mealId) ?
		{title: '', meals: []} :
		state.meals.find(meal => meal.id === mealId);

	return {
		getTitle: mealEntry => getFoodItem(mealEntry.foodId).title,
		getAmountLabel: mealEntry => getServingSize(getFoodItem(mealEntry.foodId)).valueLabel,
		item: item,
	};
};

export default connect(mapStateToProps, { putMeal, deleteMeal, putFood })(MealDetailPanel);