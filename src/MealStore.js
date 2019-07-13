class MealStore {

	__emptyFoodObject = {id: -1, title: '', protein: '', carbs: '', fat: '', fiber: '', amount: ''};
	__emptyMealObject = {id: -1, title: '', meals: []};

	__foods = [
		{id: 0, title: 'Poulet', protein: 25, carbs: 1, fat: 1.5, fiber: 0, amount: 100},
		{id: 1, title: 'Eier', protein: 13, carbs: 1, fat: 11, fiber: 0, amount: 100},
		{id: 2, title: 'Linsen', protein: 4.5, carbs: 11, fat: 2, fiber: 3.5, amount: 100},
		{id: 3, title: 'Kopfsalat', protein: 1, carbs: 1, fat: 0.2, fiber: 1.5, amount: 100},
		{id: 4, title: 'Schweizer Gemuesemischung', protein: 2, carbs: 8, fat: 0.5, fiber: 3, amount: 100},
		{id: 5, title: 'Edamame', protein: 12, carbs: 11, fat: 4, fiber: 4, amount: 100},
		{id: 6, title: 'Iso100', protein: 25, carbs: 0.8, fat: 0.6, fiber: 0, amount: 1}
	]


	__meals = [
		{
			id: 0,
			title: 'Lunch', 
			meals: [
				{id: 0, foodId: 0, amount: 200},
				{id: 1, foodId: 1, amount: 100},
				{id: 2, foodId: 2, amount: 100},
				{id: 3, foodId: 3, amount: 100},
			]
		},
		{
			id: 1,
			title: 'Dinner', 
			meals: [
				{id: 0, foodId: 0, amount: 200},
				{id: 1, foodId: 4, amount: 120},
				{id: 2, foodId: 5, amount: 50},
			]
		},
		{
			id: 2,
			title: 'Shakes',
			meals: [
				{id: 0, foodId: 6, amount: 2}
			]
		}
	]

	getMeals() {
		return this.__meals;
	}

	getFoods() {
		return this.__foods;
	}

	getFood(id) {
		return this.__foods.find(food => food.id === id);
	}

	updateMealAmount(mealId, mealEntryId, amount) {
		const meal = this.__meals.find(meal => meal.id === mealId);
		const mealEntry = meal.meals.find(mealEntry => mealEntry.id === mealEntryId);
		mealEntry.amount = amount;

	}

	updateFood(foodId, field, value) {
		let food = this.__foods.find(food => food.id === foodId);
		if(field === "protein" || field === "carbs" || field === "fat") {
			value = parseFloat(value)
		}
		food[field] = value;
	}

	addFood() {
		let newFood = Object.assign({}, this.__emptyFoodObject);
		newFood.id = this.__foods.length;
		this.__foods.push(newFood);
	}
	deleteFood(foodId) {
		const index = this.__foods.indexOf(this.__foods.find(food => food.id === foodId));
		this.__meals.forEach(meal => meal.meals = meal.meals.filter( mealEntry => mealEntry.foodId !== foodId));
		console.log(this.__meals);
		this.__foods.splice(index, 1);
	}

	addMeal() {
		let newMeal = Object.assign({}, this.__emptyMealObject);
		newMeal.id = this.__meals.length;
		this.__meals.push(newMeal);
	}
}


export let mealStore = new MealStore();

