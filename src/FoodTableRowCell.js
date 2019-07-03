import React from 'react';
import { mealStore } from './MealStore';

class FoodTableRowCell extends React.Component {

	constructor(props) {
		super(props);
		this.state = {value: props.food[props.data]};

		this.handleAmountChange = this.handleAmountChange.bind(this);
	}

	handleAmountChange(event) {
		if(this.state.value === event.target.value)
			return;


		this.setState({value: event.target.value});
		mealStore.updateFood(this.props.food.id, this.props.data, event.target.value);
	}

	render() {
		return <td><input type="text" defaultValue={this.state.value} onBlur={this.handleAmountChange} /></td>;
	};
}

export default FoodTableRowCell;