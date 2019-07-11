import React, { useState } from 'react';
import {mealStore} from './MealStore';
import MealContainer from './MealContainer';
import FoodDatabase from './FoodDatabase';


import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({

	appBar: {
		borderBottom: `1px solid ${theme.palette.divider}`
	},

	toolbar: {
		flexWrap: 'wrap'
	},

	toolbarTitle: {
		flexGrow: 1
	},

	tabs: {
		marginBottom: '2em'
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

	const renderedContent = state.selectedTab === 0 ?
		<FoodDatabase onFoodPropertyChanged={onFoodPropertyChanged} items={state.foods} /> :
		<MealContainer />;

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
				className={classes.tabs}
			>
				<Tab label="Database" />
				<Tab label="Meals" />
			</Tabs>
			{renderedContent}
		</React.Fragment>
	);
}

export default App;
