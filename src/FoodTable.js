import React from 'react';
import { mealStore } from './MealStore';
import FoodTableRow from './FoodTableRow';
import FoodTableHeader from './FoodTableHeader';

class FoodTable extends React.Component {
	constructor(props) {
		super(props);

		this.state = {foods: mealStore.getFoods()};
		this.trackedData = ['title', 'protein', 'carbs', 'fat', 'amount'];
		
		this.onUpdate = this.onUpdate.bind(this);
	}

	componentDidMount() {
		this.updateCallbackId = mealStore.addUpdateCallback(this.onUpdate);
	}

	componentWillUnmount() {
		mealStore.removeUpdateCallback(this.updateCallbackId);
	}

	onUpdate() {
		this.setState({meals: mealStore.getMeals()});
	}


	render() {
		const foodRows = this.state.foods.map((food, index) => <FoodTableRow key={food.id} food={food} trackedData={this.trackedData} />)
		const ghostRow = {id: -1, title: '', protein: '', carbs: '', fat: '', fiber: '', amount: ''};

		return (
			<table>
				<thead>
					<FoodTableHeader trackedData={this.trackedData} />
				</thead>
				<tbody>
					{foodRows}
					<FoodTableRow food={ghostRow} trackedData={this.trackedData} />
				</tbody>
			</table>
		);
	}

}

export default FoodTable;