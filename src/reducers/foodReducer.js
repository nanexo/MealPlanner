import { createSlice } from 'redux-starter-kit';
import { saveItem, deleteItem } from './detailReducer';

const foodsSlice = createSlice({
	slice: 'foods',
	initialState: [],
	reducers: {
		updateFoods(state, action) {
			return action.payload;
		}
	},
	extraReducers: {
		[saveItem]: (state, action) => {
			if(action.payload.type !== 'food')
				return;

			const newItem = action.payload.item;
			const setDefaultValue = name => {if (newItem[name] === '') newItem[name] = 0;};
			// set 0 for empty Strings
			['protein', 'carbs', 'fat'].forEach(setDefaultValue);
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
export const { updateFoods } = actions;
export default reducer;