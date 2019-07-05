import React from 'react';
import './App.css';
import MealContainer from './MealContainer';
import FoodDatabase from './FoodDatabase';
import DockContainer from './layout/DockContainer';

function App() {
	return (
		<DockContainer
			center={<MealContainer />}
			bottom={<FoodDatabase />}
		/>
	);
}

export default App;
