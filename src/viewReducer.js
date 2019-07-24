import { createSlice } from 'redux-starter-kit';


const viewSlice = createSlice({
	slice: 'view',
	initialState: {
		selectedTab: 0,
		selectedView: 'food'
	},
	reducers: {
		selectTab(state, action) {
			return {
				selectedTab: action.payload
			};
		}
	}
});

const { actions, reducer } = viewSlice;
export const { selectTab } = actions;
export default reducer;