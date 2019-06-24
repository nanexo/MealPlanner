import React from 'react';
import MealCard from './MealCard';
import { mealStore } from './MealStore';
import './MealContainer.css';

class MealContainer extends React.Component {

	constructor(props) {
		super(props);

		this.state = {meals: mealStore.getMeals()};

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
		const mealRows = this.state.meals.map((meal, index) => <MealCard key={meal.id} title={meal.title} id={meal.id} items={meal.meals} />)

		return (
			<div class="meal-container">
				{mealRows}
			</div>
		);
	}

}

export default MealContainer;