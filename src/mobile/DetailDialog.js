import React from 'react';
import { useDispatch } from '../State';

import { Dialog, AppBar, Toolbar, IconButton, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { ArrowBack, Delete, Save } from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
	appBar: {
		borderBottom: `1px solid ${theme.palette.divider}`,
		flex: 'none'
	},
	appBarTitle: {
		flex: 1
	},
	scrollContainer: {
		overflow: 'hidden auto',
		padding: '2em'
	}
}));

export default function DetailDialog(props) {
	const dispatch = useDispatch();
	const classes = useStyles();

	const { item, children } = props;

	if(!item) return null;

	const onClose = () => dispatch({type: 'closeDetail'});
	const onSave = () => dispatch({type: 'persistDetail'});
	const onDelete = () => dispatch({type: 'deleteDetail'});
	return (
		<Dialog open={Boolean(item)} onClose={onClose} aria-labelledby="form-dialog-title" fullScreen>
			<AppBar position="relative" color="default" elevation={0} className={classes.appBar}>
				<Toolbar disableGutters>
					<IconButton onClick={onClose}><ArrowBack /></IconButton>
					<Typography variant="h6" component="h1" className={classes.appBarTitle}>{item.title}</Typography>
					{!item.object.isNew && <IconButton color="secondary" onClick={onDelete}><Delete /></IconButton>}
					<IconButton onClick={onSave} color="primary"><Save /></IconButton>
				</Toolbar>
			</AppBar>
			<div className={classes.scrollContainer}>
				{children}
			</div>
		</Dialog>
	);
}