import React from 'react';
import {
  PieChart, Pie, Cell
} from 'recharts';

import { Typography } from '@material-ui/core';

import './CalorieDisplay.css';


function CalorieDisplay(props) {
	const {data, size, colors} = props;
	const pieData = [
		{group: 'protein', value: data.protein * 4},
		{group: 'carbs', value: data.carbs * 4},
		{group: 'fat', value: data.fat * 9}
	];

	const cals = pieData.reduce((cals, macro) => cals += macro.value, 0);

	const pieBackgroundStyle = {width: size, height: size, border: size / 10 + 'px solid #ddd', borderRadius: size};
	return (
		<div className="calorie-display-wrapper">	
			<div className="calorie-display-graphic">
				<PieChart width={size} height={size} margin={{}}>
					<Pie
						data={pieData}
						outerRadius="100%"
						innerRadius="80%"
						dataKey="value"
						isAnimationActive={false}
					>
						{
							pieData.map((entry, index) => <Cell key={`cell-${index}`} fill={colors[entry.group]} />)
						}
					</Pie>
				</PieChart>
			</div>
			<div className="calorie-display-graphic" style={pieBackgroundStyle}></div>
			<Typography variant="h5" component="span" className="calorie-display-count">{cals.toFixed(1)}</Typography>
			<Typography variant="h6" component="span" className="calorie-display-label">Cals</Typography>
		</div>
	)
}

export default CalorieDisplay;
