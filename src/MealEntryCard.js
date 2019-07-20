import React from 'react';
import { Paper, Typography, TextField, InputAdornment, ButtonBase, Box } from '@material-ui/core';
import { CheckBox, CheckBoxOutlineBlank } from "@material-ui/icons";

function MealEntryCard(props) {
	const classes = props.classes;
	let rootClass = classes.mealEntryCard;
	if(props.checked) {
		rootClass = rootClass + ' ' + classes.mealEntryCardSelected;
	}

	const onAmountChanged = event => props.onAmountChanged(event.target.value);
	const textFieldAdornment = props.amountLabel ?
		{endAdornment: <InputAdornment position="end">{props.amountLabel}</InputAdornment>} : null;

	return (
		<Paper className={rootClass}>
			<ButtonBase onClick={props.onChecked} className={classes.mealEntryCardHeader}>
				<Typography align="left" className={classes.mealEntryCardHeaderText}>{props.title}</Typography>
				{props.checked ? <CheckBox fontSize="small" htmlColor="#189ad3" /> : <CheckBoxOutlineBlank fontSize="small" htmlColor="#189ad3" />}
			</ButtonBase>
			<Box className={classes.mealEntryCardBody}>
				<TextField
					id="amount"
					label="Amount"
					fullWidth
					disabled={!props.checked}
					value={props.amount}
					onChange={onAmountChanged}
					InputProps={textFieldAdornment}
					/>
			</Box>
		</Paper>
		);
}

export default MealEntryCard;