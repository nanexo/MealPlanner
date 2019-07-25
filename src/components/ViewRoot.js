import React from 'react';
import { connect } from 'react-redux';
import { AppBar, Toolbar, Tabs, Tab, Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';


import { selectTab } from '../reducers/viewReducer';
import { newItem } from '../reducers/detailReducer';
import views from '../screenDefinitions';
import FoodList from './FoodList';
import MealContainer from './MealContainer';
import DetailDialog from './DetailDialog';
import SettingsPanel from './SettingsPanel';
import DemoDataNotice from './DemoDataNotice';
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
		},
		emptyContent: {
			width: '100%',
			display: 'flex',
			color: '#ddd',
			justifyContent: 'flex-end',
			paddingRight: '3.5em',
			height: 133
		},
		emptyContentText: {
			alignSelf: 'flex-end',
			paddingRight: '0.5em'
		}
	}
});

function emptyContent(text, classes) {
	return (
		<div className={classes.emptyContent}>
			<Typography variant="h3" component="span" color="inherit" className={classes.emptyContentText}>{text}</Typography>
			<Arrow fill="currentColor"/>
		</div>
	);
}

const viewMap = {
	'food': <FoodList elevation={1} />,
	'meal': <MealContainer />,
	'settings': <SettingsPanel />
}

function ViewRoot(props) {
	const classes = useStyles();

	const { contentEmpty, selectedTab, selectedView, buttonLabel, emptyText, selectTab, newItem } = props;

	const contentView = contentEmpty ? emptyContent(emptyText, classes) : viewMap[selectedView];

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
					{ views[selectedTab].showNewButton && <Button variant="contained" color="primary" onClick={() => newItem(selectedView)}>{buttonLabel}</Button> }
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
			<DemoDataNotice />
		</React.Fragment>
	);
}

const mapStateToProps = state => {
	const selectedTab = state.view.selectedTab;
	const selectedView = views[selectedTab].view;

	let contentEmpty = false;
	if(selectedView === 'food') {
		contentEmpty = state.foods.length === 0;
	}
	if(selectedView === 'meal') {
		contentEmpty = state.meals.length === 0;
	}

	return {
		contentEmpty: contentEmpty,
		selectedTab: selectedTab,
		selectedView: views[selectedTab].view,
		buttonLabel: views[selectedTab].buttonLabel,
		emptyText: views[selectedTab].emptyText
	};
}

export default connect(mapStateToProps, { selectTab, newItem })(ViewRoot);