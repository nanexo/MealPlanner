import React from 'react';
import { connect } from 'react-redux';
import { IconButton, Snackbar, Typography } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import { Link } from 'react-router-dom'

import { dismissDemoDataNotice } from '../reducers/settingsReducer';

import store from '../applicationStore';

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
	const { open, dismissDemoDataNotice } = props;
	const classes = useStyles({placeAboveFab: props.placeAboveFab});

	const onClose = async () => {
		try {
			await store.settings.dismissDemoDataNotice()
			dismissDemoDataNotice();
		} catch {}
	};

	const settingsLink = <Typography component={Link} variant="body2" color="secondary" onClick={onClose} to="/settings">Settings</Typography>;
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

export default connect(mapStateToProps, { dismissDemoDataNotice })(DemoDataNotice);