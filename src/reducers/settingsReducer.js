import { createSlice } from 'redux-starter-kit';

const settingsSlice = createSlice({
	slice: 'settings',
	initialState: {},
	reducers: {
		dismissDemoDataNotice(state, action) {
			state.showDemoDataNotice = false;
		}
	}
});

const { actions, reducer } = settingsSlice;
export const { dismissDemoDataNotice } = actions;
export default reducer;