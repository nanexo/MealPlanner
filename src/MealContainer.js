import React from 'react';
import MealCard from './MealCard';
import Card from './Card';
import DockContainer from './layout/DockContainer';
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
		const mealCards = this.state.meals.map((meal, index) => <MealCard key={meal.id} title={meal.title} id={meal.id} items={meal.meals} />)
		const mealContainer = <div className="meal-container">{mealCards}</div>;

		const onNewClickHandler = () => mealStore.addMeal();

		const newMealCard = <Card title="New" onClickHandler={onNewClickHandler} />
		return (
			<DockContainer
				left={mealContainer}
				center={newMealCard}
				/>
			
		);
	}

}

export default MealContainer;