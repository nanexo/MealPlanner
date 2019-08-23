import foodReducer from './foodReducer';
import mealReducer from './mealReducer';
import servingSizesReducer from './servingSizesReducer';
import settingsReducer from './settingsReducer';

const reducers = {
	foods: foodReducer,
	meals: mealReducer,
	servingSizes: servingSizesReducer,
	settings: settingsReducer
};

export default reducers;