import React from 'react';

import { AppBar, Toolbar, Tabs, Tab, Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import FoodList from './FoodList';
import MealContainer from './MealContainer';
import DetailDialog from './DetailDialog';
import FoodDetailPanel from './FoodDetailPanel';
import MealDetailPanel from './MealDetailPanel';
import { useDispatch } from './State';
import { ReactComponent as Arrow } from './arrow.svg';

const useStyles = makeStyles(theme => {
	const appDimensions = {
		width: `calc(100% - ${theme.spacing(2)}px)`,
		maxWidth: 968
	};
	return {
		appBar: {
			borderBottom: `1px solid ${theme.palette.divider}`,
			alignItems: 'center',
			flex: 'none'
		},
		toolbar: {
			...appDimensions
		},
		toolbarContent: {
			flex: 1
		},
		scrollContainer: {
			overflow: 'hidden auto',
			flex: 1
		},
		tabContentWrapper: {
			overflowX: 'hidden',
			marginRight: 'calc(100% - 100vw)'
		},
		tabContent: {
			...appDimensions,
			padding: '1em 0',
			height: '100%',
			margin: 'auto',
		}
	}
});

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
		<FoodList elevation={1} items={state.foods} servingSizes={state.settings.servingSizes} />;

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
				<Toolbar variant="dense" className={classes.toolbar} disableGutters>
					<Tabs
						value={state.selectedTab}
						onChange={onTabChange}
						indicatorColor="primary"
						textColor="primary"
						className={classes.toolbarContent}
					>
						{views.map(view => <Tab label={view.label} key={'tabs-' + view.view} />)}
					</Tabs>
					<Button variant="contained" color="primary" onClick={onPrimaryAction}>{views[state.selectedTab].buttonLabel}</Button>
				</Toolbar>
			</AppBar>
			<div className={classes.scrollContainer}>
				<div className={classes.tabContentWrapper}>
					<div className={classes.tabContent}>
						{state.selectedTab === 0 ? foodView : mealView}
					</div>
				</div>
			</div>
			<DetailDialog size={state.selectedTab === 0 ? 'xs' : 'sm'} item={state.detail}>
				{detailContent}
			</DetailDialog>
		</React.Fragment>
	);
}