import React from 'react';
import { connect } from 'react-redux';
import { Link, IconButton, Snackbar } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';

import { selectTab } from '../reducers/viewReducer';
import { dismissDemoDataNotice } from '../reducers/settingsReducer';

const useStyles = makeStyles(theme => ({
	'snackbar': {
		bottom: props => {
			if(props.placeAboveFab)
				return 'calc(2em + 55px + 56px)';
			return 'calc(1em + 55px)';
		}
	}
}));

function DemoDataNotice(props) {
	const { open, selectTab, dismissDemoDataNotice } = props;
	const classes = useStyles({placeAboveFab: props.placeAboveFab});

	const onClose = (event, reason) => {
		if(reason === 'clickaway')
			return;

		dismissDemoDataNotice({persist: true});
	};

	const onClickLink = () => {
		// selects settings tab
		selectTab(2);
		onClose();
	}

	const settingsLink = <Link component="button" variant="body2" color="secondary" onClick={onClickLink}>Settings</Link>;
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
			className={classes.snackbar}
		/>
	);
}


const mapStateToProps = state => ({ open: state.settings.showDemoDataNotice });

export default connect(mapStateToProps, { selectTab, dismissDemoDataNotice })(DemoDataNotice);