import React from 'react';
import { connect } from 'react-redux';

import { Paper, List, ListItem, ListItemText, Button } from '@material-ui/core';

import store from '../applicationStore';
import { clearFood } from '../reducers/foodReducer';
import { clearMeals } from '../reducers/mealReducer';

function SettingsPanel(props) {
	const { clearFood, clearMeals } = props;

	const onClearData = async () => {
		await store.localFood.clearItems();
		await store.meals.clearItems();
		await store.sfcdFoodCache.clearItems();
		clearMeals();
		clearFood();
	}

	return (
		<Paper elevation={props.elevation}>
			<List disablePadding>
				<ListItem>
					<ListItemText primary="Clear Data" />
					<Button variant="outlined" color="secondary" onClick={onClearData}>Clear</Button>
				</ListItem>
			</List>
		</Paper>
	);
}

export default connect(null, { clearFood, clearMeals })(SettingsPanel);