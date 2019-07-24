import { createSlice } from 'redux-starter-kit';

const viewSlice = createSlice({
	slice: 'servingSizes',
	initialState: [
		{id: 0, label: '100g', value: 100, valueLabel: 'g'},
		{id: 1, label: '1', value: 1, valueLabel: ''}
	],
	reducers: {
	}
});

const { reducer } = viewSlice;
export default reducer;