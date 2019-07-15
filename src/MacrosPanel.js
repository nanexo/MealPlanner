import React from 'react';
import CalorieDisplay from './CalorieDisplay';

import { Grid, Typography } from '@material-ui/core';

function MacrosPanel(props) {
	return (
		<Grid container spacing={3}  wrap="nowrap">
			<Grid item>
				<CalorieDisplay data={props.data} size={props.size || 160} />
			</Grid>
			<Grid item container alignItems="center" direction="column" justify="space-evenly">
				<Grid item>
					<Typography>Protein</Typography>
					<Typography>{props.data.protein.toFixed(1)}g</Typography>
				</Grid>
				<Grid item>
					<Typography>Carbs</Typography>
					<Typography>{props.data.carbs.toFixed(1)}g</Typography>
				</Grid>
				<Grid item>
					<Typography>Fat</Typography>
					<Typography>{props.data.fat.toFixed(1)}g</Typography>
				</Grid>
			</Grid>
		</Grid>
	);
}

export default MacrosPanel;
