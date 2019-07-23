import React, {createContext, useContext} from 'react';

import {DEMO_DATA} from './DemoData';

export const DispatchContext = createContext();

export const DispatchProvider = ({dispatch, children}) => (
	<DispatchContext.Provider value={dispatch}>
		{children}
	</DispatchContext.Provider>
);

export const useDispatch = () => useContext(DispatchContext);

function getDerivedAttributesState(state) {
	const getFoodItem = id => state.foods.find(food => food.id === id);
	const getServingSize = food => state.servingSizes.find(size => size.id === food.servingSizeId);

	const sumFunc = (name) => {
		return (agg, item) => {
			const food = getFoodItem(item.foodId);
			return agg + (food[name] * (item.amount / getServingSize(food).value));
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
		const updatedMealEntries = meal.meals.map(mealEntry => {
			const food = getFoodItem(mealEntry.foodId);
			return {...mealEntry, foodTitle: food.title, amountLabel: getServingSize(food).valueLabel};
		});

		return {...meal, macroTotals: getMacroTotals(meal), meals: updatedMealEntries};
	});

	const updatedFoods = state.foods.map(food => ({...food, amountLabel: getServingSize(food).valueLabel}));

	return {
		...state,
		meals: updatedMeals,
		foods: updatedFoods
	};
}

const emptyFoodItem = {isNew: true, title: '', protein: 0, carbs: 0, fat: 0, servingSizeId: 0};
function foodReducer(state, action) {
	switch(action.type) {
		case 'showDetail': {
			const copyFoodItem = action.context || emptyFoodItem;
			return {
				...state,
				detail: {
					screen: 'foodDetail',
					context: action.context,
					object: {...copyFoodItem},
					title: (action.context ? 'Edit' : 'Add') + ' Food'
				}
			};
		}
		case 'persistDetail': {
			delete state.detail.object.isNew;
			let newFoodList;
			if(state.detail.context) {
				newFoodList = [...state.foods];
				const foodIndex = newFoodList.findIndex(food => food.id === state.detail.context.id);
				newFoodList.splice(foodIndex, 1, state.detail.object);
			} else {
				newFoodList = [...state.foods, state.detail.object]
			}
			return {
				...state,
				foods: newFoodList,
				detail: null
			};
		}
		case 'deleteDetail': {
			const updatedMealList = state.meals.map(meal => ({...meal, meals: meal.meals.filter(mealEntry => mealEntry.foodId !== state.detail.context.id)}));
			return {
				...state,
				foods: state.foods.filter(food => food !== state.detail.context),
				meals: updatedMealList,
				detail: null
			};
		}
		default: {
			return state;
		}
	}
}

const emptyMealItem = {isNew: true, title: '', meals: []};
function mealReducer(state, action) {
	switch(action.type) {
		case 'showDetail': {
			const copyMealItem = action.context || emptyMealItem;
			return {
				...state,
				detail: {
					screen: 'mealDetail',
					context: action.context,
					object: {...copyMealItem, meals: [...copyMealItem.meals]},
					title: (action.context ? 'Edit' : 'Add') + ' Meal'
				}
			};
		}
		case 'persistDetail': {
			delete state.detail.object.isNew;
			let newMealList;
			if(state.detail.context) {
				newMealList = [...state.meals];
				const mealIndex = newMealList.findIndex(meal => meal.id === state.detail.context.id);
				newMealList.splice(mealIndex, 1, state.detail.object);
			} else {
				newMealList = [...state.meals, state.detail.object]
			}
			return {
				...state,
				meals: newMealList,
				detail: null
			};
		}
		case 'deleteDetail': {
			return {
				...state,
				meals: state.meals.filter(meal => meal !== state.detail.context),
				detail: null
			};
		}
		default: {
			return state;
		}
	}
}

function mainReducer(state, action) {
	if(action.type === 'primaryAction') {
		action.type = 'showDetail';
	}
	switch(action.type) {
		case 'selectTab': {
			return {
				...state,
				selectedTab: action.value
			};
		}
		case 'closeDetail': {
			return {
				...state,
				detail: null
			};
		}
		case 'updateDetail': {
			return {
				...state,
				detail: {
					...state.detail,
					object: action.object
				}
			};
		}
		default:
			return state;
	}
}

export function appReducer(state, action) {
	const reducerQueue = [
		{
			reducer: mainReducer,
			condition: () => true
		},
		{
			reducer: foodReducer,
			condition: () => state.selectedTab === 0
		},
		{
			reducer: mealReducer,
			condition: () => state.selectedTab === 1
		},
		{
			reducer: getDerivedAttributesState,
			condition: () => ['persistDetail', 'deleteDetail'].includes(action.type)
		}	
	];
	return reducerQueue.reduce(((state, reducerObj) => reducerObj.condition() ? reducerObj.reducer(state, action) : state), state);
}

export const INITIAL_STATE = getDerivedAttributesState({
	...DEMO_DATA,
	selectedTab: 0,
	detail: null,
	servingSizes: [
		{id: 0, label: '100g', value: 100, valueLabel: 'g'},
		{id: 1, label: '1', value: 1, valueLabel: ''}
	]
})