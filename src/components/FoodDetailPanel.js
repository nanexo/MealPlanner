import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, TextField, InputAdornment, Select, MenuItem, FormControl, InputLabel, Button, Snackbar } from '@material-ui/core';
import { Redirect } from 'react-router';

import MacrosPanel from './MacrosPanel';
import ConfirmationDialog from './ConfirmationDialog';
import { putFood, deleteFood } from '../reducers/foodReducer';
import useCheckMobile from '../useCheckMobile';
import applicationStore from '../applicationStore';

const useStyles = makeStyles(theme => {
	return {
		root: {
			alignContent: 'center'
		},
		buttonContainer: {
			alignContent: 'flex-end'
		}
	};
});

function FoodDetailPanel(props) {
	const { servingSizes, putFood, deleteFood, backPath } = props;
	const [item, setItem] = React.useState({...props.item});
	const [statusMessage, setStatusMessage] = React.useState(null);
	const [requestedDeletion, setRequestedDeletion] = React.useState(false);
	const [navigate, setNavigate] = React.useState(null);
	const isMobile = useCheckMobile();
	const classes = useStyles();

	if (!item) return null;

	if(props.item && (item.id !== props.item.id)) {
		setItem({...props.item});
	}
	const isNew = item.id === undefined;

	const createHandler = (name, isFloat) => event => {
		let value = event.target.value;
		if(isFloat && isNaN(value)) {
			value = item[name];
		}
		setItem({...item, [name]: value});
	}

	const onSave = async () => {
		try {
			const newItem = await applicationStore.localFood.saveItem(item);
			// adds food to application state
			putFood({item: newItem, source: 'local'});
			// update state of this component
			setNavigate('/database/local/' + newItem.id);
			setStatusMessage('Saved successfully.');
		} catch {
			setStatusMessage('Error occurred.');
		}
	};

	const onDelete = async () => {
		setRequestedDeletion(false);
		try {
			await applicationStore.localFood.deleteItem(item);
			deleteFood(item);
			setNavigate(backPath)
		} catch {
			setStatusMessage('Error occurred');
		}
	};

	return (
		<React.Fragment>
			<Grid container direction="column" spacing={2} className={classes.root}>
				<Grid item>
					<MacrosPanel data={item} size={220} hideMacroAmounts />
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
						type={isMobile ? 'number' : 'text'}
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
						type={isMobile ? 'number' : 'text'}
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
						type={isMobile ? 'number' : 'text'}
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
				<Grid item className={classes.buttonContainer}>
					<Grid container spacing={2} justify="flex-end">
						<Grid item>
							{ !isNew && <Button color="secondary" onClick={() => setRequestedDeletion(true)}>Delete</Button> }
						</Grid>
						<Grid item>
							<Button variant="contained" color="primary" onClick={onSave}>Save</Button>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
			<Snackbar open={Boolean(statusMessage)} message={<span>{statusMessage}</span>} autoHideDuration={3000} onClose={() => setStatusMessage(null)}/>
			<ConfirmationDialog 
				open={Boolean(requestedDeletion)} 
				title="Confirm"
				message="Are you sure you want to delete this item?"
				onClose={() => setRequestedDeletion(false)}
				onConfirm={onDelete} 
				/>
			{ navigate && <Redirect to={navigate} replace /> }
		</React.Fragment>
	);
}

const mapStateToProps = (state, { match }) => {
	const foodId = parseInt(match.params.id);
	let item = isNaN(foodId) ?
		{title: '', protein: 0, carbs: 0, fat: 0, servingSizeId: 0} :
		state.foods.local.find(food => food.id === foodId);
	
	return {
		item: item,
		servingSizes: state.servingSizes
	};
}

export default connect(mapStateToProps, { putFood, deleteFood })(FoodDetailPanel);