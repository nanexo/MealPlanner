import React from 'react';
import { Paper, Typography, TextField, InputAdornment, ButtonBase, Box } from '@material-ui/core';
import { CheckBox, CheckBoxOutlineBlank } from "@material-ui/icons";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
	card: {
		width: '160px',
	},
	cardSelected: {
		backgroundColor: 'rgba(0, 191, 255, 0.05)'
	},
	cardHeader: {
		padding: theme.spacing(1),
		width: '100%'
	},
	cardHeaderText: {
		flexGrow: 1
	},
	cardBody: {
		padding: theme.spacing(1)
	}
}));

function MealEntryCard(props) {
	const classes = useStyles();
	let rootClass = classes.card;
	if(props.checked) {
		rootClass = rootClass + ' ' + classes.cardSelected;
	}

	const onAmountChanged = event => props.onAmountChanged(event.target.value);
	const textFieldAdornment = props.amountLabel &&
		{endAdornment: <InputAdornment position="end">{props.amountLabel}</InputAdornment>};

	return (
		<Paper className={rootClass}>
			<ButtonBase onClick={props.onChecked} className={classes.cardHeader}>
				<Typography align="left" className={classes.cardHeaderText}>{props.title}</Typography>
				{props.checked ? <CheckBox fontSize="small" htmlColor="#189ad3" /> : <CheckBoxOutlineBlank fontSize="small" htmlColor="#189ad3" />}
			</ButtonBase>
			<Box className={classes.cardBody}>
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