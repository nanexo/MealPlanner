import { createSlice } from 'redux-starter-kit';
import { saveItem, deleteItem } from './detailReducer';

const foodsSlice = createSlice({
	slice: 'foods',
	initialState: [],
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

const { reducer } = foodsSlice;
export default reducer;