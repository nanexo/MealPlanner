import React from 'react';
import { AppBar, Toolbar, Tabs, Tab, Button, Typography, IconButton } from '@material-ui/core';
import { ArrowBack } from '@material-ui/icons';
import { Switch, BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Redirect } from 'react-router'

import { makeStyles } from '@material-ui/core/styles';

import FoodPanel from './FoodPanel';
import FoodDetailPanel from './FoodDetailPanel';
import MealDetailPanel from './MealDetailPanel';
import MealContainer from './MealContainer';
import SettingsPanel from './SettingsPanel';
import DemoDataNotice from './DemoDataNotice';
import { ReactComponent as Arrow } from '../vectors/arrow.svg';

const basePath = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_BASE_PATH : '';

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

const routes = [
	{
		path: '/database',
		label: 'Database',
		component: FoodPanel,
		detailRoute: {
			path: '/database/local/:id',
			component: FoodDetailPanel
		}
	},
	{
		path: '/meals',
		label: 'Meals',
		component: MealContainer,
		detailRoute: {
			path: '/meals/:id',
			component: MealDetailPanel
		}
	},
	{
		path: '/settings',
		label: 'Settings',
		component: SettingsPanel
	}
];

function RootToolbarContent(props) {
	const {location, className} = props;
	return (
		<Tabs
			value={location.pathname}
			indicatorColor="primary"
			textColor="primary"
			className={className}
		>
			{routes.map(route => <Tab component={Link} label={route.label} value={route.path} to={route.path} key={route.path} />)}
		</Tabs>
	);
}

function DetailToolbarContent(props) {
	const { backPath } = props;
	const [goBack, setGoBack] = React.useState(false);
	const onBack = () => setGoBack(true);
	return (
		<React.Fragment>
			<IconButton onClick={onBack}><ArrowBack /></IconButton>
			<Typography variant="h6" component="h1" className={props.className}></Typography>
			{ goBack && <Redirect to={backPath} /> }
		</React.Fragment>
	);
}


function ViewRoot(props) {
	const classes = useStyles();

	const renderRootToolbar = (props) => <RootToolbarContent className={classes.toolbarContent} {...props} />;
	const renderDetailToolbar = backPath => props => <DetailToolbarContent className={classes.toolbarContent} backPath={backPath} {...props} />;

	return (
		<Router basename={basePath}>
			<Route exact path="/" render={() => <Redirect to="/database" />} />
			<AppBar position="static" color="default" elevation={0} className={classes.appBar}>
				<Toolbar variant="dense" className={classes.toolbar} disableGutters>
					{
						routes.map(route => (
							<Switch key={route.path}>
								{ route.detailRoute && <Route path={route.detailRoute.path} render={renderDetailToolbar(route.path)} /> }
								<Route path={route.path} render={renderRootToolbar} />
							</Switch>
						))
					}
					<Route path="/database" render={() => <Button component={Link} to="/database/local/new" variant="contained" color="primary">ADD FOOD</Button>} />
					<Route path="/meals" render={() => <Button component={Link} to="/meals/new" variant="contained" color="primary">ADD MEAL</Button>} />
				</Toolbar>
			</AppBar>
			<div className={classes.scrollContainer}>
				<div className={classes.tabContentWrapper}>
					<div className={classes.tabContent}>
						{
							routes.map(route => (
								<Switch key={route.path}>
									{ route.detailRoute && <Route path={route.detailRoute.path} render={props => <route.detailRoute.component backPath={route.path} {...props} />} /> }
									<Route path={route.path} component={route.component} />
								</Switch>
							))
						}
					</div>
				</div>
			</div>
			<DemoDataNotice />
		</Router>
	);
}

export default ViewRoot;