import { createSlice } from 'redux-starter-kit';

const settingsSlice = createSlice({
	slice: 'settings',
	initialState: {},
	reducers: {
		dismissDemoDataNotice(state, action) {
			state.showDemoDataNotice = false;
		},
		clearData(state, action) {}
	}
});

const { actions, reducer } = settingsSlice;
export const { dismissDemoDataNotice, clearData } = actions;
export default reducer;