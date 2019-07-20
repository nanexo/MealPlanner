import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Button, BottomNavigation, BottomNavigationAction, Tab, Tabs, Fab, Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';
import { Add, ArrowBack, Storage, Fastfood } from '@material-ui/icons';


import FoodList from './FoodList';
import FoodDetailPanel from './FoodDetailPanel';
import MealContainer from './MealContainer';
import MealDetailPanel from './MealDetailPanel';
import { ReactComponent as Arrow } from './arrow.svg';

const views = [
	{
		label: 'Database',
		view: 'food',
		buttonLabel: 'ADD FOOD',
		icon: <Storage />
	},
	{
		label: 'Meals',
		view: 'meal',
		buttonLabel: 'ADD MEAL',
		Icon: <Fastfood />
	}
];

function emptyContent(text) {
	return (
		<div className="empty-container">
			<Typography variant="h3" component="span" color="inherit">{text}</Typography>
			<Arrow fill="currentColor"/>
		</div>
	);
}
export default function getView(view, state, dispatch, classes) {
	switch(view) {
		case 'food': {
			return state.foods.length === 0 ? emptyContent('Add new foods here!') :
				<FoodList elevation={state.isMobile ? 0 : 1} items={state.foods} servingSizes={state.settings.servingSizes} />;
		}
		case 'foodDetail': {
			return <FoodDetailPanel item={state.detail.object} servingSizes={state.settings.servingSizes} />
		}
		case 'meal': {
			return state.meals.length === 0 ? emptyContent('Add new meals here!') : <MealContainer items={state.meals} classes={classes}/>;
		}
		case 'mealDetail': {
			return <MealDetailPanel foodList={state.foods} item={state.detail.object} classes={classes} />;
		}
		case 'root': {
			let contentView = 'contentWrapper';
			if(state.isMobile && state.detail) {
				contentView = 'mobileDetail';
			}
			return (
				<React.Fragment>
					{getView('appBar', state, dispatch, classes)}
					{getView(contentView, state, dispatch, classes)}
					{!state.isMobile && getView('desktopDetail', state, dispatch, classes)}
				</React.Fragment>
			);
		}
		case 'fab': {
			const onPrimaryAction = () => dispatch({type: 'primaryAction'});
			return state.isMobile && <Fab color="primary" aria-label="Add" className={classes.fab} onClick={onPrimaryAction}><Add /></Fab>;
		}
		case 'bottomNavigation': {
			const onTabChange = (e, newValue) => dispatch({type: 'selectTab', value: newValue});
			return state.isMobile && (
				<BottomNavigation
					value={state.selectedTab}
					onChange={onTabChange}
					showLabels
					className={classes.bottomBar}
				>
					{views.map(view => <BottomNavigationAction label={view.label} icon={view.icon} key={'bottomNav-' + view.view} />)}
				</BottomNavigation>
			);
		}
		case 'tabNavigation': {
			const onTabChange = (e, newValue) => dispatch({type: 'selectTab', value: newValue});
			return (
				<Tabs
					value={state.selectedTab}
					onChange={onTabChange}
					indicatorColor="primary"
					textColor="primary"
					className={classes.toolbarContent}
				>
					{views.map(view => <Tab label={view.label} key={'tabs-' + view.view} />)}
				</Tabs>
			);
		}
		case 'appBar': {
			const barContentView = state.isMobile ? 'appBarTitle' : 'tabNavigation';

			const onPrimaryAction = () => dispatch({type: 'primaryAction'});
			const buttons = !state.isMobile && <Button variant="contained" color="primary" onClick={onPrimaryAction}>{views[state.selectedTab].buttonLabel}</Button>; 
			return (
				<AppBar position="static" color="default" elevation={0} className={classes.appBar}>
					<Toolbar variant="dense" className={classes.toolbar} disableGutters>
						{getView(barContentView, state, dispatch, classes)}
						{buttons}
					</Toolbar>
				</AppBar>
			);
		}
		case 'appBarTitle': {
			const showBackButton = Boolean(state.detailScreen);
			const onBack = () => dispatch({type: 'closeDetail'});
			return (
				<React.Fragment>
					{showBackButton && <IconButton onClick={onBack}><ArrowBack /></IconButton>}
					{state.title && <Typography variant="h6" component="h1" className={classes.toolbarContent}>{state.detail ? state.detail.text : 'Meal Planner'}</Typography>}
				</React.Fragment>
			);
		}
		case 'contentWrapper': {
			return (
				<React.Fragment>
					<div className={classes.contentWrapper}>
						<div className={classes.scrollContainer}>
							<div className={!state.isMobile && classes.tabContent}>
								{getView(views[state.selectedTab].view, state, dispatch, classes)}
							</div>
						</div>
						{getView('fab', state, dispatch, classes)}
					</div>
					{getView('bottomNavigation', state, dispatch, classes)}
				</React.Fragment>
			);
		}
		case 'desktopDetail': {
			if(!state.detail) return null;

			const onClose = () => dispatch({type: 'closeDetail'});
			const onSave = () => dispatch({type: 'persistDetail'});
			const onDelete = () => dispatch({type: 'deleteDetail'});
			const dialogWidth = state.selectedTab === 0 ? 'xs' : 'sm';
			return (
				<Dialog open={Boolean(state.detail)} onClose={onClose} aria-labelledby="form-dialog-title" maxWidth={dialogWidth} fullWidth>
					<DialogTitle id="form-dialog-title">{state.detail.title}</DialogTitle>
					<DialogContent dividers className={classes.dialogRoot}>
						{getView(state.detail.screen, state, dispatch, classes)}
					</DialogContent>
					<DialogActions>
						<Button onClick={onClose}>Close</Button>
						{!state.detail.object.isNew && <Button onClick={onDelete} color="secondary">Delete</Button>}
						<Button onClick={onSave} color="primary">Save</Button>
					</DialogActions>
				</Dialog>
			);
		}
		case 'mobileDetail': {
			return (
				<div className="content-wrapper">
					<div className="scroll-container">
						{getView(state.detail.screen, state, dispatch, classes)}
					</div>
				</div>
			);
		}
		default: {
			throw new Error(`no view found for: ${view}`);
		}
	}
}