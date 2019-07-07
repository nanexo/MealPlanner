import React from 'react';
import Entry from './Entry';
import Card from './Card';
import GridContainer from './layout/GridContainer';
import MealEntryTotals from './MealEntryTotals';

import { mealStore } from './MealStore';


function MealCard(props) {
		const mealEntries = props.items.map((mealEntry, index) => {
			const valueChanged = (field, value) => mealStore.updateMealAmount(props.id, mealEntry.id, value);
			const foodLabel = mealStore.getFood(mealEntry.foodId).title;
			return <Entry key={mealEntry.id} value={mealEntry.amount} label={foodLabel} appearance="field" onValueChanged={valueChanged} />;
		});

		return (
			<Card title={props.title} editableTitle={true}>
				<GridContainer columns="1fr auto">
					<MealEntryTotals items={props.items} />
					{mealEntries}
				</GridContainer>
			</Card>
		);
}

export default MealCard;
