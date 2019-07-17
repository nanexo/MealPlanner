import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FoodList from './FoodList';
import FoodDetailPanel from './FoodDetailPanel';
import { useDispatch } from './State';

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
	const dispatch = useDispatch();
	const [selectedIndex, setSelectedIndex] = useState(0);
	if(selectedIndex >= props.items.length) {
		setSelectedIndex(props.items.length - 1);
	}

	if(props.selectFoodItem && props.items[selectedIndex] !== props.selectFoodItem) {
		setSelectedIndex(props.items.findIndex(item => item === props.selectFoodItem));
		dispatch({type: 'consumeFoodItemSelect'});
	}

	const selectedItem = props.items[selectedIndex];

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
					<FoodDetailPanel item={selectedItem} servingSizes={props.servingSizes}/>
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