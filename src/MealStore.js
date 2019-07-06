class MealStore {
	#updateCallbacks = {};

	#emptyFoodObject = {id: -1, title: '', protein: '', carbs: '', fat: '', fiber: '', amount: ''};

	#foods = [
		{id: 0, title: 'Poulet', protein: 25, carbs: 1, fat: 1.5, fiber: 0, amount: 100},
		{id: 1, title: 'Eier', protein: 13, carbs: 1, fat: 11, fiber: 0, amount: 100},
		{id: 2, title: 'Linsen', protein: 4.5, carbs: 11, fat: 2, fiber: 3.5, amount: 100},
		{id: 3, title: 'Kopfsalat', protein: 1, carbs: 1, fat: 0.2, fiber: 1.5, amount: 100},
		{id: 4, title: 'Schweizer Gemuesemischung', protein: 2, carbs: 8, fat: 0.5, fiber: 3, amount: 100},
		{id: 5, title: 'Edamame', protein: 12, carbs: 11, fat: 4, fiber: 4, amount: 100},
		{id: 6, title: 'Iso100', protein: 25, carbs: 0.8, fat: 0.6, fiber: 0, amount: 1}
	]


	#meals = [
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
		return this.#meals;
	}

	getFoods() {
		return this.#foods;
	}

	getFood(id) {
		return this.#foods[id];
	}

	updateMealAmount(mealId, mealEntryId, amount) {
		const meal = this.#meals.find(meal => meal.id === mealId);
		const mealEntry = meal.meals.find(mealEntry => mealEntry.id === mealEntryId);
		mealEntry.amount = amount;

		this.__update();
	}

	updateFood(foodId, field, value) {
		let food = this.#foods.find(food => food.id === foodId);
		if(!food) {
			food = Object.assign({}, this.#emptyFoodObject);
			food.id = this.#foods.length;
			this.#foods.push(food);
		}
		food[field] = value;
		this.__update();
	}

	__update() {
		for(let key in this.#updateCallbacks) {
			this.#updateCallbacks[key]();
		}
	}

	addUpdateCallback(f) {
		const uuid = crypto.getRandomValues(new Uint32Array(4)).join('-');
		this.#updateCallbacks[uuid] = f;
	}

	removeUpdateCallback(uuid) {
		this.#updateCallbacks[uuid] = null;
		delete this.#updateCallbacks[uuid];
	}
}


export let mealStore = new MealStore();

