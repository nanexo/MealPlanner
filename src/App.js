import React from 'react';

import ViewRoot from './components/ViewRoot';
import ViewRootMobile from './components/mobile/ViewRoot';
import useCheckMobile from './useCheckMobile';
import { CssBaseline } from '@material-ui/core';



export default function App() {
	const viewRoot = useCheckMobile() ? <ViewRootMobile /> : <ViewRoot />;

	return (
		<React.Fragment>
			<CssBaseline />
			{viewRoot}
		</React.Fragment>
	);
};