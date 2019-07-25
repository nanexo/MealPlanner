import React from 'react';
import { connect } from 'react-redux';
import { AppBar, Toolbar, BottomNavigation, BottomNavigationAction, Fab, Typography } from '@material-ui/core';
import { Add, Storage, Fastfood, Settings } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';


import { selectTab } from '../../reducers/viewReducer';
import { newItem } from '../../reducers/detailReducer';
import views from '../../screenDefinitions';
import FoodList from '../FoodList';
import MealContainer from '../MealContainer';
import DetailDialog from './DetailDialog'
import SettingsPanel from '../SettingsPanel';
import DemoDataNotice from '../DemoDataNotice';
import { ReactComponent as Arrow } from '../../vectors/arrow.svg';

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
		bottom: 'calc(1em + 55px)',
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


const viewMap = {
	'food': <FoodList elevation={0} />,
	'meal': <MealContainer />,
	'settings': <SettingsPanel elevation={0} />
}

const iconMap = {
	'storage': <Storage />,
	'fastfood': <Fastfood />,
	'settings': <Settings />
}

function ViewRoot(props) {
	const classes = useStyles();

	const { contentEmpty, selectedTab, selectedView, emptyText, selectTab, newItem } = props;

	const contentView = contentEmpty ? emptyContent(emptyText) : viewMap[selectedView];

	const onTabChange = (e, newValue) => selectTab(newValue);
	return (
		<React.Fragment>
			<AppBar position="static" color="default" elevation={0} className={classes.appBar}>
				<Toolbar className={classes.toolbar}>
					<Typography variant="h6" component="h1" className={classes.appBarTitle}>Meal Planner</Typography>
				</Toolbar>
			</AppBar>
			<div className={classes.scrollContainer}>
				{contentView}
			</div>
			<BottomNavigation
				value={selectedTab}
				onChange={onTabChange}
				showLabels
				className={classes.bottomBar}
			>
				{views.map(view => <BottomNavigationAction label={view.label} icon={iconMap[view.icon]} key={'bottomNav-' + view.view} />)}
			</BottomNavigation>
			{ views[selectedTab].showNewButton && <Fab color="primary" aria-label="Add" className={classes.fab} onClick={() => newItem(selectedView)}><Add /></Fab> }
			<DetailDialog />
			<DemoDataNotice placeAboveFab={views[selectedTab].showNewButton} />
		</React.Fragment>
	);
}

const mapStateToProps = state => {
	const selectedTab = state.view.selectedTab;
	return {
		contentEmpty: (state.view.selectedTab === 0 ? state.foods : state.meals).length === 0,
		selectedTab: selectedTab,
		selectedView: views[selectedTab].view,
		emptyText: views[selectedTab].emptyText
	};
}

export default connect(mapStateToProps, { selectTab, newItem })(ViewRoot);