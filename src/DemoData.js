export const DEMO_DATA = {
	foods: [
		{id: 0, title: 'Chicken', protein: 25, carbs: 1, fat: 1.5, fiber: 0, servingSizeId: 0},
		{id: 1, title: 'Eggs', protein: 13, carbs: 1, fat: 11, fiber: 0, servingSizeId: 0},
		{id: 2, title: 'Lentils', protein: 4.5, carbs: 11, fat: 2, fiber: 3.5, servingSizeId: 0},
		{id: 3, title: 'Lettuce', protein: 1, carbs: 1, fat: 0.2, fiber: 1.5, servingSizeId: 0},
		{id: 4, title: 'Vegetable mix', protein: 2, carbs: 8, fat: 0.5, fiber: 3, servingSizeId: 0},
		{id: 5, title: 'Edamame', protein: 12, carbs: 11, fat: 4, fiber: 4, servingSizeId: 0},
		{id: 6, title: 'Iso100', protein: 25, carbs: 0.8, fat: 0.6, fiber: 0, servingSizeId: 1}
	],
	meals: [
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
};