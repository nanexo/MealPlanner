import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FoodList from './FoodList';
import FoodDetailPanel from './FoodDetailPanel';

import { Paper, Grid, Divider, Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles(theme => ({
	root: {
		maxWidth: 768,
		margin: 'auto'
	},

	divider: {
		width: 1,
		height: '100%'
	},
	fab: {
		position: 'absolute',
		bottom: theme.spacing(2),
		right: theme.spacing(2)
	},
	fabWrapper: {
		position: 'relative'
	}

}));


function FoodDatabase(props) {
	const classes = useStyles();
	const [selectedIndex, setSelectedIndex] = useState(0);
	const selectedItem = props.items[selectedIndex];

	return (
		<Paper className={classes.root}>
			<Grid container>
				<Grid item container xs className={classes.fabWrapper}>
					<FoodList items={props.items} selectedIndex={selectedIndex} onSelectedIndexChanged={setSelectedIndex} />
					<Fab color="primary" aria-label="Add" className={classes.fab} onClick={props.onFoodAdded}>
						<AddIcon />
					</Fab>
				</Grid>
				<Grid item>
					<Divider className={classes.divider} />
				</Grid>
				<Grid item>
					<FoodDetailPanel item={selectedItem} onFoodPropertyChanged={props.onFoodPropertyChanged} />
				</Grid>
			</Grid>
		</Paper>
	);
}

export default FoodDatabase;