import React from 'react';
import { connect } from 'react-redux';
import { AppBar, Toolbar, Tabs, Tab, Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';


import { selectTab } from '../reducers/viewReducer';
import { newItem } from '../reducers/detailReducer';
import FoodList from '../components/FoodList';
import views from '../screenDefinitions';
import MealContainer from '../components/MealContainer';
import DetailDialog from '../components/DetailDialog';
import { ReactComponent as Arrow } from '../vectors/arrow.svg';

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

const viewMap = {
	'food': <FoodList elevation={1} />,
	'meal': <MealContainer />
}

function ViewRoot(props) {
	const classes = useStyles();

	const { contentEmpty, selectedTab, selectedView, buttonLabel, emptyText, selectTab, newItem } = props;

	const contentView = contentEmpty ? emptyContent(emptyText) : viewMap[selectedView];

	const onTabChange = (e, newValue) => selectTab(newValue);
	return (
		<React.Fragment>
			<AppBar position="static" color="default" elevation={0} className={classes.appBar}>
				<Toolbar variant="dense" className={classes.toolbar} disableGutters>
					<Tabs
						value={selectedTab}
						onChange={onTabChange}
						indicatorColor="primary"
						textColor="primary"
						className={classes.toolbarContent}
					>
						{views.map(view => <Tab label={view.label} key={'tabs-' + view.view} />)}
					</Tabs>
					<Button variant="contained" color="primary" onClick={() => newItem(selectedView)}>{buttonLabel}</Button>
				</Toolbar>
			</AppBar>
			<div className={classes.scrollContainer}>
				<div className={classes.tabContentWrapper}>
					<div className={classes.tabContent}>
						{contentView}
					</div>
				</div>
			</div>
			<DetailDialog />
		</React.Fragment>
	);
}

const mapStateToProps = state => {
	const selectedTab = state.view.selectedTab;
	return {
		contentEmpty: (state.view.selectedTab === 0 ? state.foods : state.meals).length === 0,
		selectedTab: selectedTab,
		selectedView: views[selectedTab].view,
		buttonLabel: views[selectedTab].buttonLabel,
		emptyText: views[selectedTab].emptyText
	};
}

export default connect(mapStateToProps, { selectTab, newItem })(ViewRoot);