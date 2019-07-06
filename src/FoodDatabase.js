import React from 'react';
import { mealStore } from './MealStore';
import HorizontalContainer from './layout/HorizontalContainer';
import DockContainer from './layout/DockContainer';
import Card from './Card';
import FoodCard from './FoodCard';

class FoodDatabase extends React.Component {
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
		const cards = this.state.foods.map((food, index) => <Card title={food.title}><FoodCard food={food} /></Card>);
		const centerContent = <HorizontalContainer>{cards}</HorizontalContainer>;
		const newCard = <Card title="New" />
		return (
			<DockContainer
				left={centerContent}
				center={newCard}
				/>
		);
	}

}

export default FoodDatabase;