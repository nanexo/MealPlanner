import React from 'react';
import MealCard from './MealCard';
import MealDialog from './MealDialog';

import { Grid } from '@material-ui/core';

function MealContainer(props) {
	const [dialogItem, setDialogItem] = React.useState(null);
	const dialogOpen = Boolean(dialogItem)
	const onMealCardClicked = meal => setDialogItem(meal);
	const handleClose = () => setDialogItem(null);

	const mealCards = props.items.map((item, index) => <Grid item key={item.id}><MealCard meal={item} onMealCardClicked={onMealCardClicked} /></Grid>)
	
	return (
		<div>
			<Grid container spacing={2} justify="center">
				{mealCards}
			</Grid>
			{/*key is needed here to redo the state of the component based on new props - any id will do that cant be a normal id*/}
			<MealDialog open={dialogOpen} meal={dialogItem} handleClose={handleClose} key={(dialogItem || {id: -11}).id} />
		</div>
	);
}

export default MealContainer;