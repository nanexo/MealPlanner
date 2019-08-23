import { createSlice } from 'redux-starter-kit';

const getInitialState = () => ({local: [], sfcd: []});
const foodsSlice = createSlice({
	slice: 'foods',
	initialState: getInitialState(),
	reducers: {
		putFood(state, action) {
			const { item, source } = action.payload;
			const foodIndex = state.local.findIndex(food => food.id === item.id);
			if(foodIndex !== -1) {
				state[source][foodIndex] = item;
			} else {
				state[source].push(item);
			}
		},
		deleteFood(state, action) {
			return {...state, local: state.local.filter(food => food.id !== action.payload.id)};
		},
		clearFood(state, action) {
			return getInitialState();
		}
	}
});

const { actions, reducer } = foodsSlice;
export const { putFood, deleteFood, clearFood } = actions;
export default reducer;