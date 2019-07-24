import { openDB } from 'idb';
import { saveItem, deleteItem } from './reducers/detailReducer';
import { dismissDemoDataNotice } from './reducers/settingsReducer';
import { demoFoods, demoMeals } from './DemoData';

const foodDb = 'foods';
const mealDb = 'meals';
const servingSizeDb = 'servingSize';
const settingsDb = 'settings';


function addDemoFoods(store) {
	demoFoods.forEach(item => store.add(item));
}
function addDemoMeals(store) {
	demoMeals.forEach(meal => store.add(meal));
}

const dbPromise = openDB('MealPlanner', 1, {
	upgrade(db, oldVersion) {
		if (oldVersion < 1) {
			const foodStore = db.createObjectStore(foodDb, {
				keyPath: 'id',
				autoIncrement: true
			});
			foodStore.createIndex('id', 'id');
			addDemoFoods(foodStore);

			const mealStore = db.createObjectStore(mealDb, {
				keyPath: 'id',
				autoIncrement: true
			});
			mealStore.createIndex('id', 'id');
			addDemoMeals(mealStore);

			const servingSizesStore = db.createObjectStore(servingSizeDb, {
				keyPath: 'id',
				autoIncrement: true
			});
			servingSizesStore.createIndex('id', 'id');

			const settingsStore = db.createObjectStore(settingsDb);
			settingsStore.add(false, 'demoDataNoticeShown');
		}
	}
});


function storeFactory(objectStoreName) {
	return {
		getAll: () => dbPromise.then(store => store.getAll(objectStoreName)),
		get: key => dbPromise.then(store => store.get(objectStoreName, key)),
		save: item => dbPromise.then(
				store => store.put(objectStoreName, item)
				.then(key => store.get(objectStoreName, key))),
		'delete': id => dbPromise.then(store => store.delete(objectStoreName, id)),
		put: (value, key) => dbPromise.then(store => store.put(objectStoreName, value, key))
	}
}


export async function getPersistedState() {
	return {
		foods: await stores.food.getAll(),
		meals: await stores.meal.getAll(),
		settings: {
			showDemoDataNotice: !(await stores.settings.get('demoDataNoticeShown'))
		}
	};
}


const stores = {
	meal: storeFactory(mealDb),
	food: storeFactory(foodDb),
	servingSize: storeFactory(servingSizeDb),
	settings: storeFactory(settingsDb)
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
		case dismissDemoDataNotice.type: {
			Promise.resolve(stores.settings.put(true, 'demoDataNoticeShown')).then(() => store.dispatch({type: action.type}));
			break;
		}
		default:
			return;
	}
};

