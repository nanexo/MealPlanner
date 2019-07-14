import React from 'react';
import { Paper, Grid, Divider, List, ListItem, ListItemText, Typography, Button, Collapse, Box, ButtonBase } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';


import {mealStore} from './MealStore';
import MacrosPanel from './MacrosPanel';

const useStyles = makeStyles(theme => ({
	card: {
	},

	title: {
		padding: '1rem'
	},

	cardActionArea: {
		padding: '0.5em'
	},
	cardPadding: {
	}

}));

function MealCard(props) {
	const classes = useStyles();
	const [expanded, setExpanded] = React.useState(false);

	const mealEntries = props.items.map((mealEntry, index) => {
		const foodLabel = mealStore.getFood(mealEntry.foodId).title;
		return (
			<ListItem key={mealEntry.id}>
				<ListItemText primary={foodLabel} secondary={mealEntry.amount + 'g'} />
			</ListItem>
			);
	});

	const sumFunc = (name) => {
		return (agg, item) => {
			const food = mealStore.getFood(item.foodId);
			return agg + (food[name] * (item.amount / food.amount));
		};
	};


	const data = {
		protein: props.items.reduce(sumFunc('protein'), 0),
		carbs:  props.items.reduce(sumFunc('carbs'), 0),
		fat:  props.items.reduce(sumFunc('fat'), 0)
	};

	const onExpandClicked = () => setExpanded(!expanded);
	const s = {padding: '1rem'};
	return (
		<Paper className={classes.card}>
			<Grid container direction="column" className={classes.cardPadding}>
				<Grid item>
					<Typography variant="h6" component="h2" className={classes.title}>{props.title}</Typography>
				</Grid>
				<Grid item>
					<ButtonBase style={s}>
						<MacrosPanel data={data} size={200} />
					</ButtonBase>
				</Grid>
			</Grid>
			<Collapse in={expanded} timeout="auto" unmountOnExit>
				<List>
					{mealEntries}
				</List>
			</Collapse>
			<Divider/>
			<Box className={classes.cardActionArea}>
				<Button className={classes.button} onClick={onExpandClicked}>{expanded ? 'COLLAPSE' : 'EXPAND'}</Button>
			</Box>
		</Paper>
	);
}

export default MealCard;
