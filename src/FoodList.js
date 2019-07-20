import React from 'react';

import { Paper, List, ListItem, ListItemText } from '@material-ui/core';
import { useDispatch } from './State';

function FoodList(props) {
	const dispatch = useDispatch();

	const onItemClicked = (event, index) => dispatch({type: 'showDetail', screen: 'foodDetail', context: props.items[index]});

	const listItems = props.items.map((item, index) => {
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

export default FoodList;