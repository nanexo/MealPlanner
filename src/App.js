import React from 'react';
import { DEMO_DATA } from './DemoData';
import MealContainer from './MealContainer';
import FoodDatabase from './FoodDatabase';
import MealDialog from './MealDialog';
import { DispatchProvider, appReducer } from './State'

import { AppBar, CssBaseline, Toolbar, Button, Tabs, Tab } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import './App.css';

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
		flexGrow: 1
	},

	tabContent: {
		maxHeight: 'calc(100vh - 112px - 2em)',
		padding: '1em 0',
	}

}));

function logAppReducer(state, action) {
	console.log('old', state);
	const newState = appReducer(state, action);
	console.log('new', newState);
	return newState;
}

function App() {
	const classes = useStyles();
	const initialState = {
		...DEMO_DATA,
		selectedTab: 1,
		nextFoodId: 100,
		nextMealId: 100,
		mealDialogItem: null
	};

	const [state, dispatch] = React.useReducer(logAppReducer, initialState);

	const handleTabChange = (e, newValue) => dispatch({type: 'selectTab', value: newValue});

	const onFoodAddClicked = () => dispatch({type: 'addFood'});
	const onMealAddClicked = () => dispatch({type: 'addMeal'});

	const dialogOpen = Boolean(state.mealDialogItem)

	const renderedContent = state.selectedTab === 0 ?
		<FoodDatabase items={state.foods} className={classes.tabContent} /> :
		<MealContainer items={state.meals} className={classes.tabContent} />;

	const primaryButton = state.selectedTab === 0 ?
		<Button variant="contained" color="primary" onClick={onFoodAddClicked}>ADD FOOD</Button> :
		<Button variant="contained" color="primary" onClick={onMealAddClicked}>ADD MEAL</Button>;

	return (
		<DispatchProvider dispatch={dispatch}>
			<React.Fragment>
				<CssBaseline />
				<div className="wrapper">
					<AppBar position="static" color="default" elevation={0} className={classes.appBar}>
						<Toolbar variant="dense" className={classes.toolbar}>
							<Tabs
								value={state.selectedTab}
								onChange={handleTabChange}
								indicatorColor="primary"
								textColor="primary"
								className={classes.tabs}
							>
								<Tab label="Database" />
								<Tab label="Meals" />
							</Tabs>
							{primaryButton}
						</Toolbar>
					</AppBar>
					<div className="tab-content">
						{renderedContent}
					</div>
				</div>
				{/*key is needed here to redo the state of the component based on new props - any id will do that cant be a normal id*/}
				<MealDialog open={dialogOpen} meal={state.mealDialogItem} foodList={state.foods} key={(state.mealDialogItem || {id: -11}).id} />
			</React.Fragment>
		</DispatchProvider>
	);
}

export default App;
