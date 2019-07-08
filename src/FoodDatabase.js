import React from 'react';
import { mealStore } from './MealStore';
import Card from './Card';
import FoodCard from './FoodCard';
import Entry from './Entry';
import './FoodDatabase.css';

class FoodDatabase extends React.Component {
	constructor(props) {
		super(props);

		this.state = {foods: mealStore.getFoods(), filterText: ''};
		
		this.onUpdate = this.onUpdate.bind(this);
	}

	componentDidMount() {
		this.updateCallbackId = mealStore.addUpdateCallback(this.onUpdate);
	}

	componentWillUnmount() {
		mealStore.removeUpdateCallback(this.updateCallbackId);
	}

	onUpdate() {
		this.setState({foods: mealStore.getFoods()});
	}


	render() {
		let foods = this.state.foods;
		if(!!this.state.filterText) {
			foods = foods.filter((food) => food.title.startsWith(this.state.filterText));
		}

		const cards = foods.map((food, index) => {
			const onHeaderChanged = (field, value) => mealStore.updateFood(food.id, 'title', value);
			return <Card key={food.id} title={food.title} editableTitle={true} onHeaderChanged={onHeaderChanged}><FoodCard food={food} /></Card>
		});

		const onFilterValueChanged = (field, value) => this.setState({filterText: value});

		return (
			<div className="food-database">
				<div className="food-database-title">Database</div>
				<div className="food-database-filter"><Entry placeholder="Filter" value={this.state.filterText} onValueChanged={onFilterValueChanged} /></div>
				<div className="food-database-list">
					{cards}
				</div>
			</div>
		);
	}

}

export default FoodDatabase;