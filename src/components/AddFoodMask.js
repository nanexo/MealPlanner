import React from 'react';
import { connect } from 'react-redux';
import { TextField, Grid, Button, Chip } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import FoodSearchBox from './FoodSearchBox';

const useStyles = makeStyles(theme => {
	return {
		chip: {
			width: '100%'
		},
		chipLabel: {
			flex: 1,
			overflow: 'hidden',
			textOverflow: 'ellipsis',
			marginRight: 12,
			minWidth: 0
		}
	};
});


function AddFoodMask(props) {
	const [food, setFood] = React.useState(null);
	const [amount, setAmount] = React.useState('');
	const classes = useStyles();

	const onSelectFood = (food, source) => setFood({selected: food, source: source});
	const onSelectedFoodDelete = () => setFood(null);
	const onAmountChange = event => {
		const value = event.target.value;
		if(!isNaN(value))
			setAmount(event.target.value)
	};
	const onAddClick = () => {
		props.onAddFood(food.selected, food.source, amount || 0);
		setFood(null);
		setAmount('');
	}

	return (
		<Grid container spacing={2} alignItems="flex-end" justify="space-between">
			<Grid item xs={7}>
			{
				food === null ?
					<FoodSearchBox onSelectFood={onSelectFood}/> :
					<Chip classes={{root: classes.chip, label: classes.chipLabel}} label={food.selected.title} onDelete={onSelectedFoodDelete} />
			}
			</Grid>
			<Grid item xs={3}>
				<TextField
					id="amount"
					label="Amount"
					value={amount}
					onChange={onAmountChange}
					/>
			</Grid>
			<Grid item xs={2}>
				<Button variant="contained" color="primary" onClick={onAddClick}>Add</Button>
			</Grid>
		</Grid>
	);
}

const mapStateToProps = state => {
	return {
	};
};

export default connect(mapStateToProps)(AddFoodMask);