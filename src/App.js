import React from 'react';
import { DispatchProvider, appReducer, INITIAL_STATE } from './State'


import { CssBaseline } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
// import useMediaQuery from '@material-ui/core/useMediaQuery';
// import { useTheme } from '@material-ui/core/styles';

import Theme from './Style';
import getView from './ViewFactory';

import './App.css';

const useStyles = makeStyles(Theme);


function logReducer(state, action) {
	console.log('oldState', state);
	const newState = appReducer(state, action);
	console.log('newState', newState);
	return newState;
}

function App() {
	const classes = useStyles();
	// const theme = useTheme();
	// const isMobile = useMediaQuery(theme.breakpoints.down('xs'));

	const [state, dispatch] = React.useReducer(logReducer, INITIAL_STATE);
	return (
		<DispatchProvider dispatch={dispatch}>
			<React.Fragment>
				<CssBaseline />
				{getView('root', state, dispatch, classes)}
			</React.Fragment>
		</DispatchProvider>
	);
}

export default App;
