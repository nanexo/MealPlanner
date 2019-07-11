import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FoodList from './FoodList';
import FoodDetailPanel from './FoodDetailPanel';

import { Paper, Grid, Divider } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
	root: {
		width: 600
	},

	divider: {
		width: 1,
		height: '100%'
	}

}));


function FoodDatabase(props) {
	const classes = useStyles();
	const [selectedIndex, setSelectedIndex] = useState(0);
	const selectedItem = props.items[selectedIndex];

	return (
		<Grid container justify="center">
			<Grid item>
				<Paper className={classes.root}>
					<Grid container>
						<Grid item xs>
							<FoodList items={props.items} selectedIndex={selectedIndex} onSelectedIndexChanged={setSelectedIndex} />
						</Grid>
						<Grid item>
							<Divider className={classes.divider} />
						</Grid>
						<Grid item>
							<FoodDetailPanel item={selectedItem} onFoodPropertyChanged={props.onFoodPropertyChanged} />
						</Grid>
					</Grid>
				</Paper>
			</Grid>
		</Grid>
	);
}

export default FoodDatabase;