import { createSlice } from 'redux-starter-kit';
import { saveItem, deleteItem } from './detailReducer';

const foodsSlice = createSlice({
	slice: 'foods',
	initialState: [
		{id: 0, title: 'Chicken', protein: 25, carbs: 1, fat: 1.5, servingSizeId: 0},
		{id: 1, title: 'Eggs', protein: 13, carbs: 1, fat: 11, servingSizeId: 0},
		{id: 2, title: 'Lentils', protein: 4.5, carbs: 11, fat: 2, servingSizeId: 0},
		{id: 3, title: 'Lettuce', protein: 1, carbs: 1, fat: 0.2, servingSizeId: 0},
		{id: 4, title: 'Vegetable mix', protein: 2, carbs: 8, fat: 0.5, servingSizeId: 0},
		{id: 5, title: 'Edamame', protein: 12, carbs: 11, fat: 4, servingSizeId: 0},
		{id: 6, title: 'Iso100', protein: 25, carbs: 0.8, fat: 0.6, servingSizeId: 1}
	],
	reducers: {
		updateItems(state, action) {},
	},
	extraReducers: {
		[saveItem]: (state, action) => {
			if(action.payload.type !== 'food')
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
			if(action.payload.type !== 'food')
				return;

			return state.filter(food => food.id !== action.payload.id);
		}
	}
});

const { actions, reducer } = foodsSlice;
export const { createFood, updateFood, editFood, closeFood, deleteFood } = actions;
export default reducer;