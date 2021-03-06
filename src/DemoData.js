const demoFoods = [
	{id: 0, title: 'Chicken', protein: 25, carbs: 1, fat: 1.5, servingSizeId: 0},
	{id: 1, title: 'Eggs', protein: 13, carbs: 1, fat: 11, servingSizeId: 0},
	{id: 2, title: 'Lentils', protein: 4.5, carbs: 11, fat: 2, servingSizeId: 0},
	{id: 3, title: 'Lettuce', protein: 1, carbs: 1, fat: 0.2, servingSizeId: 0},
	{id: 4, title: 'Vegetable mix', protein: 2, carbs: 8, fat: 0.5, servingSizeId: 0},
	{id: 5, title: 'Edamame', protein: 12, carbs: 11, fat: 4, servingSizeId: 0},
	{id: 6, title: 'Iso100', protein: 25, carbs: 0.8, fat: 0.6, servingSizeId: 1}
];

const demoMeals = [
	{
		id: 0,
		title: 'Lunch',
		meals: [
			{foodId: 'local-0', amount: 200},
			{foodId: 'local-1', amount: 100},
			{foodId: 'local-2', amount: 100},
			{foodId: 'local-3', amount: 100},
		]
	},
	{
		id: 1,
		title: 'Dinner',
		meals: [
			{foodId: 'local-0', amount: 200},
			{foodId: 'local-4', amount: 120},
			{foodId: 'local-5', amount: 50},
		]
	},
	{
		id: 2,
		title: 'Shakes',
		meals: [
			{foodId: 'local-6', amount: 2}
		]
	}
];

export {demoFoods, demoMeals};