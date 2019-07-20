import React from 'react';
import { Paper, Grid, Divider, List, ListItem, ListItemText, Typography, Button, Collapse, Box, ButtonBase } from '@material-ui/core';

import MacrosPanel from './MacrosPanel';
import { useDispatch } from './State';

function MealCard(props) {
	const [expanded, setExpanded] = React.useState(false);
	const dispatch = useDispatch();

	const { meal, classes } = props;

	const mealEntries = meal.meals.map((mealEntry, index) => {
		return (
			<ListItem key={index}>
				<ListItemText primary={mealEntry.foodTitle} secondary={mealEntry.amount + mealEntry.amountLabel} />
			</ListItem>
			);
	});

	const onExpandClicked = () => setExpanded(!expanded);
	const onMealCardClicked = () => dispatch({type: 'showDetail', context: meal});

	return (
		<Paper className={classes.card}>
			<Grid container direction="column">
				<Grid item>
					<Typography variant="h6" component="h2" className={classes.mealCardPadding}>{meal.title}</Typography>
				</Grid>
				<Grid item>
					<ButtonBase onClick={onMealCardClicked}>
						<Grid container direction="column">
							<Grid item className={classes.mealCardPadding}>
								<MacrosPanel data={meal.macroTotals} size={200} />
							</Grid>
							<Grid item>
								<Collapse in={expanded} timeout="auto" unmountOnExit>
									<List>
										{mealEntries}
									</List>
								</Collapse>
							</Grid>
						</Grid>
					</ButtonBase>
				</Grid>
			</Grid>
			<Divider/>
			<Box className={classes.mealCardActionArea}>
				<Button className={classes.button} onClick={onExpandClicked}>{expanded ? 'COLLAPSE' : 'EXPAND'}</Button>
			</Box>
		</Paper>
	);
}

export default MealCard;
