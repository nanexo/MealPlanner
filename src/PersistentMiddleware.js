import { openDB } from 'idb';
import { saveItem, deleteItem } from './reducers/detailReducer';
import { dismissDemoDataNotice, clearData } from './reducers/settingsReducer';
import { updateFoods } from './reducers/foodReducer';
import { updateMeals } from './reducers/mealReducer';
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

	const getAll = async store => {
		if(store.getAll) {
			return await store.getAll(objectStoreName);
		}

		const result = [];
		let cursor = await store.openCursor();
		while (cursor) {
			result.push(cursor.value);
			cursor = await cursor.continue();
		}
		return result;
	}

	return {
		getAll: () => dbPromise.then(store => getAll(store)),
		get: key => dbPromise.then(store => store.get(objectStoreName, key)),
		save: item => dbPromise.then(
				store => store.put(objectStoreName, item)
				.then(key => store.get(objectStoreName, key))),
		'delete': id => dbPromise.then(store => store.delete(objectStoreName, id)),
		put: (value, key) => dbPromise.then(store => store.put(objectStoreName, value, key)),
		clear: () => dbPromise.then(store => store.clear(objectStoreName))
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

			const newItem = {...action.payload.item};
			const validate = name => {
				if (newItem[name] === '' || isNaN(newItem[name])){
					newItem[name] = 0;
				}
				else {
					newItem[name] = parseFloat(newItem[name]);
				}
			};
			['protein', 'carbs', 'fat'].forEach(validate);

			Promise.resolve(stores[action.payload.type].save(newItem).then(
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
		case clearData.type: {
			Promise.resolve(
				Promise.all([
					stores.food.clear().then(() => store.dispatch(updateFoods([]))),
					stores.meal.clear().then(() => store.dispatch(updateMeals([]))),
				])).then(() => {});
			break;
		}
		default:
			return;
	}
};

