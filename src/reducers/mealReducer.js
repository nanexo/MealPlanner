import { createSlice } from 'redux-starter-kit';
import { saveItem, deleteItem } from './detailReducer';

const mealsSlice = createSlice({
	slice: 'meals',
	initialState: [],
	reducers: {
		updateMeals(state, action) {
			return action.payload;
		}
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