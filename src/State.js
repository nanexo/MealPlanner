import React, {createContext, useContext} from 'react';

export const DispatchContext = createContext();

export const DispatchProvider = ({dispatch, children}) => (
	<DispatchContext.Provider value={dispatch}>
		{children}
	</DispatchContext.Provider>
);

export const useDispatch = () => useContext(DispatchContext);

export function getDerivedMealAttributesState(state) {
	const getFoodItem = id => state.foods.find(food => food.id === id);

	const sumFunc = (name) => {
		return (agg, item) => {
			const food = getFoodItem(item.foodId);
			return agg + (food[name] * (item.amount / food.amount));
		};
	};

	const getMacroTotals = meal => {
		return {
			protein: meal.meals.reduce(sumFunc('protein'), 0),
			carbs: meal.meals.reduce(sumFunc('carbs'), 0),
			fat: meal.meals.reduce(sumFunc('fat'), 0)
		}
	};


	const updatedMeals = state.meals.map(meal => {
		const updatedMealEntries = meal.meals.map(mealEntry => ({...mealEntry, foodTitle: getFoodItem(mealEntry.foodId).title}));
		return {...meal, macroTotals: getMacroTotals(meal), meals: updatedMealEntries};
	});


	return {
		...state,
		meals: updatedMeals
	};
}

function mainReducer(state, action) {
	switch(action.type) {
		case 'selectTab': {
			return {
				...state,
				selectedTab: action.value
			};
		}
		case 'addFood': {
			const nextFoodId = ++state.nextFoodId;
			const newFood = {id: state.nextFoodId, title: '', protein: '', carbs: '', fat: '', amount: ''};
			return {
				...state,
				foods: [...state.foods, newFood],
				nextFoodId: nextFoodId
			};
		}
		case 'deleteFood': {
			const updatedMealList = state.meals.map(meal => ({...meal, meals: meal.meals.filter(mealEntry => mealEntry.foodId !== action.foodId)}));
			return {
				...state,
				foods: state.foods.filter(food => food.id !== action.foodId),
				meals: updatedMealList
			};
		}
		case 'updateFood': {
			const currentFoodIndex = state.foods.findIndex(food => food.id === action.foodId);
			const currentFood = state.foods[currentFoodIndex];
			const updatedFood = {...currentFood, [action.field]: action.value};
			const updatedFoodList = [...state.foods];
			updatedFoodList.splice(currentFoodIndex, 1, updatedFood);

			return {
				...state,
				foods: updatedFoodList
			};
		}
		case 'addMeal': {
			const nextMealId = state.nextMealId++;
			const newMeal = {id: state.nextMealId, title: '', meals: []};
			return {
				...state,
				meals: [...state.meals, newMeal],
				nextMealId: nextMealId
			};
		}
		case 'deleteMeal': {
			return {
				...state,
				meals: state.meals.filter(meal => meal.id !== action.mealId)
			};
		}
		case 'saveMeal': {
			const mealIndex = state.meals.findIndex(meal => meal.id === action.meal.id);
			let updatedMealList = [...state.meals];
			updatedMealList[mealIndex] = action.meal;
			return {
				...state,
				meals: updatedMealList
			};
		}
		case 'showMealDialog': {
			return {
				...state,
				mealDialogItem: state.meals.find(meal => meal.id === action.mealId)
			};
		}
		case 'closeMealDialog': {
			return {
				...state,
				mealDialogItem: null
			};
		}
		default:
			return state;
	}
}

export function appReducer(state, action) {
	let nextState = mainReducer(state, action);
	if(['saveMeal', 'updateFood', 'addMeal'].includes(action.type)) {
		nextState = getDerivedMealAttributesState(nextState);
	}
	return nextState;
}