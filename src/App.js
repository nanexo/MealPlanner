import React from 'react';
import './App.css';
import MealContainer from './MealContainer';
import FoodTable from './FoodTable';
import DockContainer from './DockContainer';

function App() {
	return (
		<DockContainer
			center={<MealContainer />}
			bottom={<FoodTable />}
		/>
	);
}

export default App;
