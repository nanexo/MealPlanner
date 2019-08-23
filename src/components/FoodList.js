import React from 'react';
import { connect } from 'react-redux';

import { Paper, List, ListItem, ListItemText } from '@material-ui/core';
import { Link } from 'react-router-dom';

function FoodList({items}) {
	const listItems = items.map(item => {
		const listItemText = !!item.title ?
			<ListItemText primary={item.title} /> :
			<ListItemText primary="No Title" primaryTypographyProps={{component: 'i'}} />

		return (
			<ListItem button component={Link} to={"/database/local/" + item.id} key={item.id}>
				{listItemText}
			</ListItem>
			);
	});

	return (
		<Paper>
			<List disablePadding>
				{listItems}
			</List>
		</Paper>
	);
}

const mapStateToProps = state => ({items: state.foods.local});

export default connect(mapStateToProps)(FoodList);