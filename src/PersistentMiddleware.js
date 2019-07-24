import { openDB } from 'idb';
import { saveItem, deleteItem } from './reducers/detailReducer';

const foodDb = 'foods';
const mealDb = 'meals';
const servingSizeDb = 'servingSize';

const dbPromise = openDB('MealPlanner', 1, {
	upgrade(db, oldVersion) {
		if (oldVersion < 1) {
			const foodStore = db.createObjectStore(foodDb, {
				keyPath: 'id',
				autoIncrement: true
			});
			foodStore.createIndex('id', 'id');
			const mealStore = db.createObjectStore(mealDb, {
				keyPath: 'id',
				autoIncrement: true
			});
			mealStore.createIndex('id', 'id');
			const servingSizesStore = db.createObjectStore(servingSizeDb, {
				keyPath: 'id',
				autoIncrement: true
			});
			servingSizesStore.createIndex('id', 'id');
		}
	}
});



function storePrototype(objectStoreName) {
	return {
		getAll() {
			return dbPromise.then(
				store => store.getAll(objectStoreName)
			);
		},
		save(item) {
			console.log('saving item');
			return dbPromise.then(
				store => store.put(objectStoreName, item)
				.then(key => store.get(objectStoreName, key))
			);
		},
		delete(id) {
			return dbPromise.then(
				store => store.delete(objectStoreName, id)
			);
		}
	}
}


export async function getAll() {
	return {
		foods: await stores.food.getAll(),
		meals: await stores.meal.getAll()
	};
}


const stores = {
	meal: storePrototype(mealDb),
	food: storePrototype(foodDb),
	servingSize: storePrototype(servingSizeDb)
}


export const persist = store => next => action => {
	if(!action.payload || !action.payload.persist)
		return next(action);

	switch (action.type) {
		case saveItem.type: {
			Promise.resolve(stores[action.payload.type].save(action.payload.item).then(
				item => ({type: action.type, payload: {item: item, type: action.payload.type}})))
			.then(store.dispatch);
			break;
		}
		case deleteItem.type: {
			Promise.resolve(stores[action.payload.type].delete(action.payload.id).then(
				() => ({type: action.type, payload: {id: action.payload.id, type: action.payload.type}})))
			.then(store.dispatch);
			break;
		}
	}
};

