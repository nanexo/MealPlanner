import { createSlice } from 'redux-starter-kit';

const getDefaultState = () => ({
	item: null,
	isNew: false,
	itemType: null
});

const viewSlice = createSlice({
	slice: 'detail',
	initialState: getDefaultState(),
	reducers: {
		closeItem: (state, action) => getDefaultState(),
		newItem(state, action) {
			const newItem = action.payload === 'food' ?
				{title: '', protein: 0, carbs: 0, fat: 0, servingSizeId: 0} :
				{title: '', meals: []};
			state.isNew = true;
			state.itemType = action.payload;
			state.item = newItem;
		},
		editItem(state, action) {
			state.item = action.payload.item;
			state.itemType = action.payload.type;
		},
		updateItem(state, action) {
			state.item[action.payload.field] = action.payload.value;
		},
		saveItem: (state, action) => getDefaultState(),
		deleteItem: (state, action) => getDefaultState()
	}
});

const { actions, reducer } = viewSlice;
export const { closeItem, newItem, editItem, updateItem, saveItem, deleteItem } = actions;
export default reducer;