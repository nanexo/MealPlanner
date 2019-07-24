import React from 'react';
import { connect } from 'react-redux';
import { Link, IconButton, Snackbar } from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';

import { selectTab } from '../reducers/viewReducer';
import { dismissDemoDataNotice } from '../reducers/settingsReducer';

function DemoDataNotice(props) {
	const { open, selectTab, dismissDemoDataNotice } = props;

	const onClose = () => dismissDemoDataNotice({persist: true});

	const settingsLink = <Link component="button" variant="body2" onClick={() => selectTab(1)}>Settings</Link>;
	const messageBody = <span>We've added some demo data! If you want to clear it, go to {settingsLink}.</span>;
	const actions = [<IconButton key="close" color="inherit" onClick={onClose}><CloseIcon /></IconButton>];

	return open && (
		<Snackbar
			anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
			key="demoDataNotice"
			open={open}
			onClose={onClose}
			message={messageBody}
			action={actions}
		/>
	);
}


const mapStateToProps = state => ({ open: state.settings.showDemoDataNotice });

export default connect(mapStateToProps, { selectTab, dismissDemoDataNotice })(DemoDataNotice);