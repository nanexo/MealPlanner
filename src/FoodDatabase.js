import React from 'react';
import { mealStore } from './MealStore';
import HorizontalContainer from './layout/HorizontalContainer';
import DockContainer from './layout/DockContainer';
import Card from './Card';
import FoodCard from './FoodCard';
import Entry from './Entry';

class FoodDatabase extends React.Component {
	constructor(props) {
		super(props);

		this.state = {foods: mealStore.getFoods(), filterText: ''};
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
		const centerContent = <HorizontalContainer>{cards}</HorizontalContainer>;

		const onFilterValueChanged = (field, value) => this.setState({filterText: value});

		const onNewHandler = () => mealStore.addFood();
		const newCard = <Card title="New" onClickHandler={onNewHandler} />

		const topContent = (
			<DockContainer
				center={<h2>Database</h2>}
				right={<Entry label="Filter" onValueChanged={onFilterValueChanged} />}
				/>
		);

		return (
			<DockContainer
				top={topContent}
				left={centerContent}
				center={newCard}
				/>
		);
	}

}

export default FoodDatabase;