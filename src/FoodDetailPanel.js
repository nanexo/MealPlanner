import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { Grid, TextField, InputAdornment, Button } from '@material-ui/core';

import CalorieDisplay from './CalorieDisplay';
import { useDispatch } from './State';

const useStyles = makeStyles(theme => ({
	root: {
		padding: '2em 3em'
	},
	button: {
		alignSelf: 'flex-end'
	}
}));



function FoodDetailPanel(props) {
	const classes = useStyles();
	const dispatch = useDispatch();

	const createHandler = (name, isFloat) => event => {
		let value = event.target.value;
		if(isFloat) {
			value = parseFloat(value);
			if(isNaN(value)) {
				throw Error(`Unable to parse value ${event.target.value}`);
			}
		}
		dispatch({type: 'updateFood', foodId: props.item.id, field: name, value: value});
	}
	const deleteFoodHandler = () => dispatch({type: 'deleteFood', foodId: props.item.id});

	return (
		<Grid container direction="column" spacing={2} className={classes.root}>
			<Grid item>
				<CalorieDisplay data={props.item} size={220} />
			</Grid>
			<Grid item>
				<TextField
					label="Title"
					id="title"
					fullWidth
					value={props.item.title}
					onChange={createHandler('title')}
					/>
			</Grid>
			<Grid item>
				<TextField
					label="Protein"
					id="protein"
					fullWidth
					value={props.item.protein}
					onChange={createHandler('protein', true)}
			        InputProps={{
						endAdornment: <InputAdornment position="end">g</InputAdornment>
					}}
					/>
			</Grid>
			<Grid item>
				<TextField
					label="Carbs"
					id="carbs"
					fullWidth
					value={props.item.carbs}
					onChange={createHandler('carbs', true)}
					InputProps={{
						endAdornment: <InputAdornment position="end">g</InputAdornment>
					}}
					/>
			</Grid>
			<Grid item>
				<TextField
					label="Fat"
					id="fat"
					fullWidth
					value={props.item.fat}
					onChange={createHandler('fat', true)}
					InputProps={{
						endAdornment: <InputAdornment position="end">g</InputAdornment>
					}}
					/>
			</Grid>
			<Grid item className={classes.button}>
				<Button color="secondary" onClick={deleteFoodHandler}>Delete</Button>
			</Grid>
		</Grid>
	);
}

export default FoodDetailPanel;