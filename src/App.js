import React from 'react';
import './App.css';
import MealContainer from './MealContainer';
import FoodTable from './FoodTable';

function App() {
	return (
		<div className="wrapper">
			<div style={{flexGrow: 2}}>
				<MealContainer />
			</div>
			<div className="vertical-line" />
			<div style={{flexGrow: 1}}>
				<FoodTable />
			</div>
		</div>
	);
}

export default App;
