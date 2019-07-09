import React, {useState, useEffect} from 'react';
import { mealStore } from './MealStore';
import Card from './Card';
import MacrosPanel from './MacrosPanel';
import Entry from './Entry';
import './FoodDatabase.css';

function FoodDatabase(props) {
	const [state, setState] = useState({foods: mealStore.getFoods()});
	const [filterText, setFilterText] = useState('');

	useEffect(() => {
		let onUpdate = () => setState({foods: mealStore.getFoods()});
		mealStore.addUpdateListener(onUpdate);
		return () => mealStore.removeUpdateListener(onUpdate);
	}, []);

	let filteredFoods = state.foods;
	if(!!filterText) {
		filteredFoods = state.foods.filter((food) => food.title.startsWith(filterText));
	}

	const cards = filteredFoods.map((food, index) => {
		const onHeaderChanged = (field, value) => mealStore.updateFood(food.id, 'title', value);
		const onMacroChanged = (field, value) => mealStore.updateFood(food.id, field, value);
		return <Card key={food.id} title={food.title} editableTitle={true} onHeaderChanged={onHeaderChanged}><MacrosPanel data={food} onMacroChanged={onMacroChanged} /></Card>
	});

	const onFilterValueChanged = (field, value) => setFilterText(value);

	return (
		<div className="food-database">
			<div className="food-database-title">Database</div>
			<div className="food-database-filter"><Entry placeholder="Filter" value={filterText} onValueChanged={onFilterValueChanged} /></div>
			<div className="food-database-list">
				{cards}
			</div>
		</div>
	);
}

export default FoodDatabase;