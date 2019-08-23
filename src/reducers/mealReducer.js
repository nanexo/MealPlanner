import { createSlice } from 'redux-starter-kit';
import { deleteFood } from './foodReducer';

const mealsSlice = createSlice({
	slice: 'meals',
	initialState: [],
	reducers: {
		putMeal(state, action) {
			const mealIndex = state.findIndex(meal => meal.id === action.payload.id);
			if(mealIndex !== -1) {
				state[mealIndex] = action.payload;
			} else {
				state.push(action.payload);
			}
		},
		deleteMeal(state, action) {
			return state.filter(meal => meal.id !== action.payload.id);
		},
		clearMeals(state, action) {
			return [];
		}
	},
	extraReducers: {
		[deleteFood]: (state, action) => {
			state.forEach(meal => meal.meals = meal.meals.filter(entry => entry.foodId !== 'local-'+action.payload.id));
		}
	}
});

const { actions, reducer } = mealsSlice;
export const { putMeal, deleteMeal, clearMeals } = actions;
export default reducer;