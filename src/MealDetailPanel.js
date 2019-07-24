import React from 'react';
import { connect } from 'react-redux';
import { TextField, Grid } from '@material-ui/core';

import MealEntryCard from './MealEntryCard';
import { updateItem } from './detailReducer';

function MealDetailPanel(props) {
	const { item, foodList, updateItem } = props;

	if(!item) return null;

	const isSelected = food => Boolean(item.meals.find(mealEntry => mealEntry.foodId === food.id));
	const getAmount = food => ((item.meals.find(mealEntry => mealEntry.foodId === food.id) || {}).amount || 0);
	const foodCardItems = foodList.map(food => ({...food, selected: isSelected(food), amount: getAmount(food)}));

	const onChangeTitle = event => updateItem({field: 'title', value: event.target.value});

	const update = () => {
		const mealEntries = foodCardItems.filter(item => item.selected).map(item => ({amount: item.amount, foodId: item.id}));
		updateItem({field: 'meals', value: mealEntries})
	}

	const createCheckHandler = index => () => {
		foodCardItems[index].selected = !foodCardItems[index].selected;
		update();
	};

	const createAmountChangedHandler = index => amount => {
		const fAmount = parseFloat(amount);
		if(isNaN(fAmount)) {
			throw Error('amount is not a float');
		}
		foodCardItems[index].amount = fAmount;
		update();
	};

	const mealEntryCards = foodCardItems.map((item, index) => {
		return (
			<Grid item key={item.id}>
				<MealEntryCard
					title={item.title}
					amountLabel={item.amountLabel}
					amount={item.amount}
					checked={item.selected}
					onChecked={createCheckHandler(index)}
					onAmountChanged={createAmountChangedHandler(index)}
				/>
			</Grid>)
	});

	return (
		<Grid container spacing={2} direction="column">
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
			<Grid item container xs spacing={2} justify="center">
				{mealEntryCards}
			</Grid>
		</Grid>
	);
}

const mapStateToProps = state => {
	const getServingSize = food => state.servingSizes.find(size => size.id === food.servingSizeId);
	return {
		foodList: state.foods.map(food => ({...food, amountLabel: getServingSize(food).valueLabel})),
		item: state.detail.item,
	};
};

export default connect(mapStateToProps, { updateItem })(MealDetailPanel);