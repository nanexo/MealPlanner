import React from 'react';
import MealEntry from './MealEntry';
import MealEntryTotals from './MealEntryTotals';
import { mealStore } from './MealStore';
import './MealCard.css';


class MealCard extends React.Component {
	constructor(props) {
		super(props);
		
		this.onAmountChanged = this.onAmountChanged.bind(this);

	}

	onAmountChanged(id, amount) {
		mealStore.updateMealAmount(this.props.id, id, amount);
	}

	render() {
		const mealRows = this.props.items.map((mealRow, index) => <MealEntry key={mealRow.id} id={mealRow.id} amount={mealRow.amount} title={mealStore.getFood(mealRow.foodId).title} onAmountChanged={this.onAmountChanged} />);

		return (
			<div className="meal-card">
				<div className="meal-card-header">{this.props.title}</div>
				<MealEntryTotals items={this.props.items} />
				{mealRows}
			</div>
		);
	}
}

export default MealCard;
