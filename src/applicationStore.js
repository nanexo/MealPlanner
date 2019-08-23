import db from './indexeddb.js';

function validateFloat(item, name) {
	if (item[name] === '' || isNaN(item[name])){
		item[name] = 0;
	}
	else {
		item[name] = parseFloat(item[name]);
	}
}

export default {
	localFood: {
		saveItem: async function(food) {
			const newItem = {...food};
			const boundValidateFloat = name => validateFloat(newItem, name);
			['protein', 'carbs', 'fat'].forEach(boundValidateFloat);

			return db.localFoods.save(newItem);
		},
		deleteItem: async function(food) {
			await db.localFoods.delete(food.id);
			const meals = await db.meals.getAll();
			for(const meal of meals) {
				const newMealItem = {...meal, meals: meal.meals.filter(entry => entry.foodId !== 'local-'+food.id)};
				await db.meals.save(newMealItem);
			}
		},
		clearItems: async function() {
			db.localFoods.clear();
		},
		getAllItems: async function() {
			return db.localFoods.getAll();
		}
	},

	sfcdFoodCache: {
		getItem: async function(id) {
			return db.sfcdCache.get(id);
		},
		saveItem: async function(food) {
			return db.sfcdCache.save(food);
		},
		getAllItems: async function() {
			return db.sfcdCache.getAll();
		},
		clearItems: async function() {
			return db.sfcdCache.clear();
		}
	},

	meals: {
		saveItem: async function(meal) {
			const newMeal = {...meal};
			validateFloat(newMeal, 'amount');
			return db.meals.save(newMeal);
		},
		deleteItem: async function(meal) {
			db.meals.delete(meal.id);
		},
		clearItems: async function() {
			db.meals.clear();
		},
		getAllItems: async function() {
			return db.meals.getAll();
		}
	},

	settings: {
		get: async function(key) {
			return db.settings.get(key)
		},
		dismissDemoDataNotice: async function() {
			db.settings.put(true, 'demoDataNoticeShown');
		}
	}
};