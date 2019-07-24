import React from 'react';
import { connect } from 'react-redux';

import { Grid, TextField, InputAdornment, Select, MenuItem, FormControl, InputLabel } from '@material-ui/core';

import CalorieDisplay from './CalorieDisplay';
import { updateItem } from './detailReducer';


function FoodDetailPanel(props) {
	const { item, servingSizes, updateItem } = props;
	if (!item) return null;

	const createHandler = (name, isFloat) => event => {
		let value = event.target.value;
		if(isFloat) {
			value = parseFloat(value || 0); // treat falsy as 0
			if(isNaN(value)) {
				throw Error(`Unable to parse value ${event.target.value}`);
			}
		}
		updateItem({field: name, value: value});
	}

	return (
		<Grid container direction="column" spacing={2}>
			<Grid item>
				<CalorieDisplay data={item} size={220} />
			</Grid>
			<Grid item>
				<TextField
					label="Title"
					id="title"
					fullWidth
					value={item.title}
					onChange={createHandler('title')}
					/>
			</Grid>
			<Grid item>
				<TextField
					label="Protein"
					id="protein"
					fullWidth
					value={item.protein}
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
					value={item.carbs}
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
					value={item.fat}
					onChange={createHandler('fat', true)}
					InputProps={{
						endAdornment: <InputAdornment position="end">g</InputAdornment>
					}}
					/>
			</Grid>
			<Grid item>
				<FormControl fullWidth>
					<InputLabel>Serving Size</InputLabel>
					<Select
						label="Serving Size"
						fullWidth
						value={item.servingSizeId}
						onChange={createHandler('servingSizeId')}
					>
						{servingSizes.map(servingSize => <MenuItem key={servingSize.id} value={servingSize.id}>{servingSize.label}</MenuItem>)}
					</Select>
				</FormControl>
			</Grid>
		</Grid>
	);
}

const mapStateToProps = state => {
	return {
		item: state.detail.item,
		servingSizes: state.servingSizes
	};
}

export default connect(mapStateToProps, { updateItem })(FoodDetailPanel);