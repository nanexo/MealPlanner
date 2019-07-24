import React from 'react';
import { connect } from 'react-redux';
import { Dialog, AppBar, Toolbar, IconButton, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { ArrowBack, Delete, Save } from '@material-ui/icons';

import MealDetailPanel from '../MealDetailPanel';
import FoodDetailPanel from '../FoodDetailPanel';
import { closeItem, saveItem, deleteItem } from '../../reducers/detailReducer';

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

function DetailDialog(props) {
	const classes = useStyles();
	const { item, title, itemType, isNew, closeItem, saveItem, deleteItem } = props;

	if(!item) return null;

	const onClose = () => closeItem();
	const onSave = () => saveItem({item: item, type: itemType});
	const onDelete = () => deleteItem({id: item.id, type: itemType});
	return (
		<Dialog open={Boolean(item)} onClose={onClose} aria-labelledby="form-dialog-title" fullScreen>
			<AppBar position="relative" color="default" elevation={0} className={classes.appBar}>
				<Toolbar disableGutters>
					<IconButton onClick={onClose}><ArrowBack /></IconButton>
					<Typography variant="h6" component="h1" className={classes.appBarTitle}>{title}</Typography>
					{!isNew && <IconButton color="secondary" onClick={onDelete}><Delete /></IconButton>}
					<IconButton onClick={onSave} color="primary"><Save /></IconButton>
				</Toolbar>
			</AppBar>
			<div className={classes.scrollContainer}>
				{itemType === 'food' ? <FoodDetailPanel /> : <MealDetailPanel />}
			</div>
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
			title: (state.detail.isNew ? 'Add' : 'Edit') + ' Food'
		}
	}
	return {
		...sharedState,
		title: (state.detail.isNew ? 'Add' : 'Edit') + ' Meal'
	};
};

export default connect(mapStateToProps, { closeItem, saveItem, deleteItem })(DetailDialog);