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
	const getServingSize = food => state.settings.servingSizes.find(size => size.id === food.servingSizeId);
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
				nextFoodId: nextFoodId,
				selectFoodItem: newFood
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
		case 'consumeFoodItemSelect': {
			return {
				...state,
				selectFoodItem: null
			};
		}
		case 'addMeal': {
			const nextMealId = ++state.nextMealId;
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
			const updatedMealList = [...state.meals];

			if(action.meal.isNew) {
				delete action.meal.isNew;
				updatedMealList.push(action.meal);
			} else {
				const mealIndex = state.meals.findIndex(meal => meal.id === action.meal.id);
				updatedMealList[mealIndex] = action.meal;
			}
			return {
				...state,
				meals: updatedMealList
			};
		}
		case 'showNewMealDialog': {
			const nextMealId = ++state.nextMealId;
			const newMeal = {id: state.nextMealId, isNew: true, title: '', meals: []};
			return {
				...state,
				mealDialogItem: newMeal,
				nextMealId: nextMealId
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
	if(['saveMeal', 'updateFood', 'addMeal', 'deleteFood'].includes(action.type)) {
		nextState = getDerivedAttributesState(nextState);
	}
	return nextState;
}

export const INITIAL_STATE = getDerivedAttributesState({
	...DEMO_DATA,
	selectedTab: 1,
	nextFoodId: 100,
	nextMealId: 100,
	mealDialogItem: null,
	selectFoodItem: null,
	settings: {
		servingSizes: [
			{id: 0, label: '100g', value: 100, valueLabel: 'g'},
			{id: 1, label: '1', value: 1, valueLabel: ''}
		]
	}
})