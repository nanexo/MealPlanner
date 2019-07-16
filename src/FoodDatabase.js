import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FoodList from './FoodList';
import FoodDetailPanel from './FoodDetailPanel';

import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

import { Paper, Grid, Divider } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
	root: {
		width: '100%'
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
	if(selectedIndex >= props.items.length) {
		setSelectedIndex(props.items.length - 1);
	}

	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('xs'));

	const desktop =  (
		<Paper className={classes.root}>
			<Grid container>
				<Grid item container xs>
					<FoodList items={props.items} selectedIndex={selectedIndex} onSelectedIndexChanged={setSelectedIndex} />
				</Grid>
				<Grid item>
					<Divider className={classes.divider} />
				</Grid>
				<Grid item>
					<FoodDetailPanel item={selectedItem}/>
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