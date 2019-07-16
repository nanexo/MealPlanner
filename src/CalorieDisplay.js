import React from 'react';
import {
  PieChart, Pie, Cell
} from 'recharts';

import { Typography } from '@material-ui/core';

import './CalorieDisplay.css';


function CalorieDisplay(props) {
	const cals = props.data.protein * 4 + props.data.carbs * 4 + props.data.fat * 9;
	const data = [
		{group: 'Protein', value: props.data.protein},
		{group: 'Carbs', value: props.data.carbs},
		{group: 'Fat', value: props.data.fat}
	];
	const colors = ['#0088FE', '#00C49F', '#FFBB28'];
	const pieBackgroundStyle = {width: props.size, height: props.height, border: props.size / 10 + 'px solid #ddd', borderRadius: props.size};
	return (
		<div className="calorie-display-wrapper">	
			<div className="calorie-display-graphic">
				<PieChart width={props.size} height={props.size} margin={{}}>
					<Pie
						data={data}
						outerRadius="100%"
						innerRadius="80%"
						dataKey="value"
						isAnimationActive={false}
					>
						{
							data.map((entry, index) => entry.value > 0 ? <Cell key={`cell-${index}`} fill={colors[index % colors.length]} /> : null)
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
