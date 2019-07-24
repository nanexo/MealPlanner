import React from 'react';
import { connect } from 'react-redux';
import { editItem } from '../reducers/detailReducer';

import { Paper, List, ListItem, ListItemText } from '@material-ui/core';

function FoodList(props) {

	const { items, editItem } = props;

	const onItemClicked = (event, index) => editItem({item: props.items[index], type: 'food'});

	const listItems = items.map((item, index) => {
		const listItemText = !!item.title ?
			<ListItemText primary={item.title} /> :
			<ListItemText primary="No Title" primaryTypographyProps={{component: 'i'}} />

		return (
			<ListItem button onClick={event => onItemClicked(event, index)} key={index}>
				{listItemText}
			</ListItem>
			);
	});

	return (
		<Paper elevation={props.elevation}>
			<List disablePadding>
				{listItems}
			</List>
		</Paper>
	);
}

const mapStateToProps = state => {
	return {
		items: state.foods
	};
}

export default connect(mapStateToProps, {editItem})(FoodList);