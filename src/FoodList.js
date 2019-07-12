import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { List, ListItem, ListItemText, Grid, InputBase } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
	listContainer: {
		overflow: 'auto'
	},

	filter: {
		padding: '1em'
	}

}));



function FoodList(props) {
	const classes = useStyles();
	const [filter, setFilter] = useState('');

	const onFilterChanged = event => setFilter(event.target.value);
	const onItemClicked = (event, index) => props.onSelectedIndexChanged(index);

	let items = props.items;

	if(!!filter) {
		items = items.filter(item => item.title.toLowerCase().startsWith(filter.toLowerCase()));
	}

	const listItems = items.map((item, index) => {
		const listItemText = !!item.title ?
			<ListItemText primary={item.title || 'No Title'} /> :
			<ListItemText primary="No Title" primaryTypographyProps={{component: 'i'}} />

		return (
			<ListItem button selected={props.selectedIndex === index} onClick={event => onItemClicked(event, index)} key={index}>
				{listItemText}
			</ListItem>
			);
	});

	return (
		<Grid container direction="column">
			<Grid item>
				<InputBase
					className={classes.filter}
					placeholder="Filter"
					value={filter}
					onChange={onFilterChanged}
				/>
			</Grid>
			<Grid item xs className={classes.listContainer}>
				<List>
					{listItems}
				</List>
			</Grid>
		</Grid>
	);
}

export default FoodList;