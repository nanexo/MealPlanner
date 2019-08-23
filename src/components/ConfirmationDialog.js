import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@material-ui/core';

export default function DetailDialog(props) {
	const { title, message, open, onClose, onConfirm } = props;
	return (
		<Dialog open={open} onClose={onClose}>
			<DialogTitle>{title}</DialogTitle>
			<DialogContent>
				<DialogContentText>
					{message}
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button onClick={onClose}>Cancel</Button>
				<Button onClick={onConfirm} color="primary">Confirm</Button>
			</DialogActions>
		</Dialog>
	);
}
