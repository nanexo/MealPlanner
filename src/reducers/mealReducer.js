import { createSlice } from 'redux-starter-kit';
import { saveItem, deleteItem } from './detailReducer';

const mealsSlice = createSlice({
	slice: 'meals',
	initialState: [
		{
			id: 0,
			title: 'Lunch', 
			meals: [
				{foodId: 0, amount: 200},
				{foodId: 1, amount: 100},
				{foodId: 2, amount: 100},
				{foodId: 3, amount: 100},
			]
		},
		{
			id: 1,
			title: 'Dinner', 
			meals: [
				{foodId: 0, amount: 200},
				{foodId: 4, amount: 120},
				{foodId: 5, amount: 50},
			]
		},
		{
			id: 2,
			title: 'Shakes',
			meals: [
				{foodId: 6, amount: 2}
			]
		}
	],
	reducers: {
		updateMeals(state, action) {}
	},
	extraReducers: {
		[saveItem]: (state, action) => {
			if(action.payload.type !== 'meal')
				return;

			const newItem = action.payload.item;
			const foodIndex = state.findIndex(food => food.id === newItem.id);
			if(foodIndex === -1) {
				state.push(newItem);
			} else {
				state[foodIndex] = newItem;
			}
		},
		[deleteItem]: (state, action) => {
			if(action.payload.type === 'food') {
				state.forEach(meal => meal.meals = meal.meals.filter(entry => entry.foodId !== action.payload.id));
			} else {
				return state.filter(meal => meal.id !== action.payload.id);
			}
		}
	}
});

const { actions, reducer } = mealsSlice;
export const { updateMeals } = actions;
export default reducer;