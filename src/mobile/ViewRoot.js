import React from 'react';
import { useDispatch } from '../State'


import { AppBar, Toolbar, BottomNavigation, BottomNavigationAction, Fab, Typography } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';

import FoodList from '../FoodList';
import MealContainer from '../MealContainer';
import FoodDetailPanel from '../FoodDetailPanel';
import MealDetailPanel from '../MealDetailPanel';
import DetailDialog from './DetailDialog'
import { ReactComponent as Arrow } from '../arrow.svg';

const useStyles = makeStyles(theme => ({
	appBar: {
		borderBottom: `1px solid ${theme.palette.divider}`,
		alignItems: 'center',
		flex: 'none'
	},

	bottomBar: {
		borderTop: `1px solid ${theme.palette.divider}`,
		flex: 'none'
	},
	toolbar: {
		width: '100%'
	},
	appBarTitle: {
		flex: 1
	},
	fab: {
		position: 'fixed',
		bottom: 'calc(1em + 56px)',
		right: '1em'
	},
	scrollContainer: {
		overflow: 'hidden auto',
		flex: 1,
	},
}));

function emptyContent(text) {
	return (
		<div className="empty-container">
			<Typography variant="h3" component="span" color="inherit">{text}</Typography>
			<Arrow fill="currentColor"/>
		</div>
	);
}

export default function ViewRoot(props) {
	const classes = useStyles();
	const dispatch = useDispatch();

	const { views, state } = props;

	const foodView = state.foods.length === 0 ? emptyContent('Add new foods here!') :
		<FoodList elevation={0} items={state.foods} servingSizes={state.settings.servingSizes} />;

	const mealView = state.meals.length === 0 ? emptyContent('Add new meals here!') : <MealContainer items={state.meals}/>;

	let detailContent = null;
	if(state.detail) {
		detailContent = state.selectedTab === 0 ?
			<FoodDetailPanel item={state.detail.object} servingSizes={state.settings.servingSizes} /> :
			<MealDetailPanel foodList={state.foods} item={state.detail.object} />
	}


	const onTabChange = (e, newValue) => dispatch({type: 'selectTab', value: newValue});
	const onPrimaryAction = () => dispatch({type: 'primaryAction'});
	return (
		<React.Fragment>
			<AppBar position="static" color="default" elevation={0} className={classes.appBar}>
				<Toolbar className={classes.toolbar}>
					<Typography variant="h6" component="h1" className={classes.appBarTitle}>Meal Planner</Typography>
				</Toolbar>
			</AppBar>
			<div className={classes.scrollContainer}>
				{state.selectedTab === 0 ? foodView : mealView}
			</div>
			<BottomNavigation
				value={state.selectedTab}
				onChange={onTabChange}
				showLabels
				className={classes.bottomBar}
			>
				{views.map(view => <BottomNavigationAction label={view.label} icon={view.icon} key={'bottomNav-' + view.view} />)}
			</BottomNavigation>
			<Fab color="primary" aria-label="Add" className={classes.fab} onClick={onPrimaryAction}><Add /></Fab>
			<DetailDialog item={state.detail}>
				{detailContent}
			</DetailDialog>
		</React.Fragment>
	);
}