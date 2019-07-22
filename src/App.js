import React from 'react';
import ViewRoot from './ViewRoot';
import ViewRootMobile from './mobile/ViewRoot';
import { DispatchProvider, appReducer, INITIAL_STATE } from './State'

import { CssBaseline, useMediaQuery, useTheme } from '@material-ui/core';
import { Storage, Fastfood } from '@material-ui/icons';

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
		icon: <Fastfood />
	}
];

export default function App() {
	const [state, dispatch] = React.useReducer(appReducer, INITIAL_STATE);
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('xs'));

	const viewRoot = isMobile ? <ViewRootMobile views={views} state={state} /> : <ViewRoot views={views} state={state} />;

	return (
		<DispatchProvider dispatch={dispatch}>
			<React.Fragment>
				<CssBaseline />
				{viewRoot}
			</React.Fragment>
		</DispatchProvider>
	);
}