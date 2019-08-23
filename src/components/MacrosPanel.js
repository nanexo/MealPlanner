import React from 'react';
import { connect } from 'react-redux';
import { Grid, Typography } from '@material-ui/core';

import CalorieDisplay from './CalorieDisplay';

function Dot({size, color}) {
	const style = {
		display: 'inline-block',
		verticalAlign: 'middle',
		marginRight: '0.5em',
		width: size,
		height: size,
		backgroundColor: color,
		borderRadius: size
	};
	return (
		<span style={style} />
	);
}

function MacrosPanel(props) {
	const {data, size, hideMacroAmounts, macroColors} = props;

	const buildSection = (label, macro) => {
		return (
			<Grid item container alignItems="center">
				<Grid item>
					<Dot size="1em" color={macroColors[macro]} />
				</Grid>
				<Grid item>
					<Typography>{label}</Typography>
					{ !hideMacroAmounts && <Typography>{data[macro].toFixed(1)}g</Typography> }
				</Grid>
			</Grid>
		);
	}
	return (
		<Grid container spacing={3}  wrap="nowrap">
			<Grid item>
				<CalorieDisplay data={data} size={size || 160} colors={macroColors} />
			</Grid>
			<Grid item container alignItems="center" direction="column" justify="space-evenly">
				{buildSection('Protein', 'protein')}
				{buildSection('Carbs', 'carbs')}
				{buildSection('Fat', 'fat')}
			</Grid>
		</Grid>
	);
}

const mapStateToProps = state => {
	return {
		macroColors: state.settings.macroColors
	};
};

export default connect(mapStateToProps)(MacrosPanel);
