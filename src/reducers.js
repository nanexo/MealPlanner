import foodReducer from './foodReducer';
import mealReducer from './mealReducer';
import viewReducer from './viewReducer';
import detailReducer from './detailReducer';
import servingSizesReducer from './servingSizesReducer';

const reducers = {
	foods: foodReducer,
	meals: mealReducer,
	view: viewReducer,
	detail: detailReducer,
	servingSizes: servingSizesReducer
};

export default reducers;