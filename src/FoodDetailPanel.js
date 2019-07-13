import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { Grid, TextField, InputAdornment, Button } from '@material-ui/core';

import CalorieDisplay from './CalorieDisplay';

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

	const createHandler = name => event => props.onFoodPropertyChanged(props.item.id, name, event.target.value);
	const deleteFoodHandler = () => props.onFoodDeleted(props.item.id);

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
					onChange={createHandler('protein')}
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
					onChange={createHandler('carbs')}
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
					onChange={createHandler('fat')}
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