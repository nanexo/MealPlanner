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

	const pieChartOptions = {
		width: props.size,
		height: props.half ? (props.size / 2) : props.size,
		x: props.size / 2,
		y: props.size / 2,
		or: (props.size / 2),
		ir: (props.size / 2) - 5
	};

	return (
		<div className="calorie-display-wrapper">	
			<div className="calorie-display-graphic">
				<PieChart width={pieChartOptions.width} height={pieChartOptions.height} margin={{}}>
					<Pie
						data={data}
						cx={pieChartOptions.x}
						cy={pieChartOptions.y}
						innerRadius={pieChartOptions.ir}
						outerRadius={pieChartOptions.or}
						paddingAngle={3}
						dataKey="value"
						isAnimationActive={false}
					>
						{
							data.map((entry, index) => <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />)
						}
					</Pie>
				</PieChart>
			</div>
			<Typography variant="h5" component="span" className="calorie-display-count">{cals.toFixed(1)}</Typography>
			<Typography variant="h6" component="span" className="calorie-display-label">Cals</Typography>
		</div>
	)
}

export default CalorieDisplay;
