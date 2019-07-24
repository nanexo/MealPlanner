import React from 'react';
import { connect } from 'react-redux';
import { closeItem, saveItem, deleteItem } from '../reducers/detailReducer';
import MealDetailPanel from './MealDetailPanel';
import FoodDetailPanel from './FoodDetailPanel';

import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
	dialogRoot: {
		maxheight: 600
	}
}));

function DetailDialog(props) {
	const classes = useStyles();
	const { item, title, itemType, size, isNew, closeItem, saveItem, deleteItem } = props;

	if(!item) return null;

	const onClose = () => closeItem();
	const onSave = () => saveItem({item: item, type: itemType, persist: true});
	const onDelete = () => deleteItem({id: item.id, type: itemType, persist: true});
	return (
		<Dialog open={Boolean(item)} onClose={onClose} aria-labelledby="form-dialog-title" maxWidth={size} fullWidth>
			<DialogTitle id="form-dialog-title">{title}</DialogTitle>
			<DialogContent dividers className={classes.dialogRoot}>
				{itemType === 'food' ? <FoodDetailPanel /> : <MealDetailPanel />}
			</DialogContent>
			<DialogActions>
				<Button onClick={onClose}>Close</Button>
				{!isNew && <Button onClick={onDelete} color="secondary">Delete</Button>}
				<Button onClick={onSave} color="primary">Save</Button>
			</DialogActions>
		</Dialog>
	);
}

const mapStateToProps = state => {
	const sharedState = {
		item: state.detail.item,
		isNew: state.detail.isNew,
		itemType: state.detail.itemType
	};
	if(state.detail.itemType === 'food') {
		return {
			...sharedState,
			size: 'xs',
			title: (state.detail.isNew ? 'Add' : 'Edit') + ' Food'
		}
	}
	return {
		...sharedState,
		size: 'sm',
		title: (state.detail.isNew ? 'Add' : 'Edit') + ' Meal'
	};
};

export default connect(mapStateToProps, { closeItem, saveItem, deleteItem })(DetailDialog);