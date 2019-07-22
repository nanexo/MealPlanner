import React from 'react';
import { useDispatch } from './State';

import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
	dialogRoot: {
		maxheight: 600
	}
}));

export default function DetailDialog(props) {
	const dispatch = useDispatch();
	const classes = useStyles();
	const { item, size, children } = props;

	if(!item) return null;

	const onClose = () => dispatch({type: 'closeDetail'});
	const onSave = () => dispatch({type: 'persistDetail'});
	const onDelete = () => dispatch({type: 'deleteDetail'});
	return (
		<Dialog open={Boolean(item)} onClose={onClose} aria-labelledby="form-dialog-title" maxWidth={size} fullWidth>
			<DialogTitle id="form-dialog-title">{item.title}</DialogTitle>
			<DialogContent dividers className={classes.dialogRoot}>
				{children}
			</DialogContent>
			<DialogActions>
				<Button onClick={onClose}>Close</Button>
				{!item.object.isNew && <Button onClick={onDelete} color="secondary">Delete</Button>}
				<Button onClick={onSave} color="primary">Save</Button>
			</DialogActions>
		</Dialog>
	);
}