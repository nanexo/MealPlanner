import React from 'react';

import ViewRoot from './components/ViewRoot';
import ViewRootMobile from './components/mobile/ViewRoot';

import { CssBaseline, useMediaQuery, useTheme } from '@material-ui/core';

export default function App() {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('xs'));

	const viewRoot = isMobile ? <ViewRootMobile /> : <ViewRoot />;

	return (
		<React.Fragment>
			<CssBaseline />
			{viewRoot}
		</React.Fragment>
	);
};