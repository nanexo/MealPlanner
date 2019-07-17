import React from 'react';

import { List, ListItem, ListItemText } from '@material-ui/core';

import './FoodList.css';

function FoodList(props) {

	const onItemClicked = (event, index) => props.onSelectedIndexChanged(index);

	const listItems = props.items.map((item, index) => {
		const listItemText = !!item.title ?
			<ListItemText primary={item.title} /> :
			<ListItemText primary="No Title" primaryTypographyProps={{component: 'i'}} />

		const isSelected = props.selectedIndex === index;
		const scrollRefIntoView = ref => ref && isSelected && ref.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });

		return (
			<ListItem button selected={isSelected} ref={scrollRefIntoView} onClick={event => onItemClicked(event, index)} key={index}>
				{listItemText}
			</ListItem>
			);
	});

	return (
		<div className="food-list-wrapper">
			<List className="food-list">
				{listItems}
			</List>
		</div>
	);
}

export default FoodList;