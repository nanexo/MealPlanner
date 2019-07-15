import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FoodList from './FoodList';
import FoodDetailPanel from './FoodDetailPanel';

import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

import { Paper, Grid, Divider } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
	root: {
		maxWidth: 768,
		width: '100vw'
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

	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

	const desktop =  (
		<Paper className={classes.root}>
			<Grid container>
				<Grid item container xs>
					<FoodList items={props.items} selectedIndex={selectedIndex} onItemClicked={setSelectedIndex} />
				</Grid>
				<Grid item>
					<Divider className={classes.divider} />
				</Grid>
				<Grid item>
					<FoodDetailPanel item={selectedItem} onFoodPropertyChanged={props.onFoodPropertyChanged} onFoodDeleted={props.onFoodDeleted} />
				</Grid>
			</Grid>
		</Paper>
	);

	const mobile = (
		<FoodList items={props.items} selectedIndex={selectedIndex} onSelectedIndexChanged={setSelectedIndex} />
		);

	return isMobile ? mobile : desktop;
}

export default FoodDatabase;