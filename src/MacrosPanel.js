import React from 'react';
import CalorieDisplay from './CalorieDisplay';

import { Grid, Typography } from '@material-ui/core';

function MacrosPanel(props) {
	return (
		<Grid container direction="column" spacing={3}>
			<Grid container item justify="center">
				<Grid item>
					<CalorieDisplay data={props.data} size={props.size || 160} />
				</Grid>
			</Grid>
			<Grid container item>
				<Grid container item xs={4} justify="center">
					<Grid item>
						<Typography>{props.data.protein}g</Typography>
					</Grid>
				</Grid>
				<Grid container item xs={4} justify="center">
					<Grid item>
						<Typography>{props.data.carbs}g</Typography>
					</Grid>
				</Grid>
				<Grid container item xs={4} justify="center">
					<Grid item>
						<Typography>{props.data.fat}g</Typography>
					</Grid>
				</Grid>
				<Grid container item xs={4} justify="center">
					<Grid item>
						<Typography>Protein</Typography>
					</Grid>
				</Grid>
				<Grid container item xs={4} justify="center">
					<Grid item>
						<Typography>Carbs</Typography>
					</Grid>
				</Grid>
				<Grid container item xs={4} justify="center">
					<Grid item>
						<Typography>Fat</Typography>
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	);
}

export default MacrosPanel;
