import React, { useState } from 'react';
import {mealStore} from './MealStore';
import MealContainer from './MealContainer';
import FoodDatabase from './FoodDatabase';


import { AppBar, CssBaseline, Toolbar, Typography, Button, Tabs, Tab, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({

	appBar: {
		borderBottom: `1px solid ${theme.palette.divider}`,
		alignItems: 'center'
	},

	toolbar: {
		maxWidth: 768,
		width: '100vw'
	},

	toolbarTitle: {
		flexGrow: 1
	},

	tabs: {
		marginBottom: '2em'
	},

	tabContent: {
		maxHeight: 'calc(100vh - 112px - 2em)',
		padding: '1em 0',
	}

}));


function App() {
	const classes = useStyles();
	const [state, setState] = useState({
		selectedTab: 0,
		foods: mealStore.getFoods(),
		meals: mealStore.getMeals()
	});

	const handleTabChange = (e, newValue) => setState({...state, selectedTab: newValue});

	const onFoodPropertyChanged = (foodId, field, value) => {
		mealStore.updateFood(foodId, field, value)
		setState({...state, foods: mealStore.getFoods()});
	};

	const onFoodAdded = () => {
		mealStore.addFood();
		var updatedFoods = mealStore.getFoods()
		setState({...state, foods: updatedFoods})
	}

	const renderedContent = state.selectedTab === 0 ?
		<FoodDatabase onFoodPropertyChanged={onFoodPropertyChanged} items={state.foods} onFoodAdded={onFoodAdded} className={classes.tabContent} /> :
		<MealContainer items={state.meals} className={classes.tabContent} />;

	return (
		<React.Fragment>
			<CssBaseline />
			<AppBar position="static" color="default" elevation={0} className={classes.appBar}>
				<Toolbar className={classes.toolbar}>
					<Typography variant="h6" color="inherit" className={classes.toolbarTitle}>Meal Planner</Typography>
					<Button href="#" color="primary" variant="outlined">New</Button>
				</Toolbar>
			</AppBar>
			<Tabs
				value={state.selectedTab}
				onChange={handleTabChange}
				indicatorColor="primary"
				textColor="primary"
				centered
			>
				<Tab label="Database" />
				<Tab label="Meals" />
			</Tabs>
			<Box className={classes.tabContent}>
				{renderedContent}
			</Box>
		</React.Fragment>
	);
}

export default App;
