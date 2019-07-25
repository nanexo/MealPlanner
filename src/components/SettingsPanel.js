import React from 'react';
import { connect } from 'react-redux';

import { Paper, List, ListItem, ListItemText, Button } from '@material-ui/core';
import { clearData } from '../reducers/settingsReducer';

function SettingsPanel(props) {

	const { clearData } = props;

	const onClearData = () => clearData({persist: true});

	return (
		<Paper elevation={props.elevation}>
			<List disablePadding>
				<ListItem>
					<ListItemText primary="Clear Data" />
					<Button variant="outlined" color="secondary" onClick={onClearData}>Clear</Button>
				</ListItem>
			</List>
		</Paper>
	);
}

export default connect(null, { clearData })(SettingsPanel);