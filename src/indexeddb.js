import { openDB } from 'idb';
import { demoFoods, demoMeals } from './DemoData';

const dbConfigs = {
	localFoods: {
		dbName: 'localFoods',
		config: { keyPath: 'id', autoIncrement: true},
		addIdIndex: true,
		dataPopulator: addDemoFoods
	},
	sfcdCache: {
		dbName: 'sfcdFoods',
		config: { keyPath: 'id' },
		addIdIndex: true
	},
	meals: {
		dbName: 'meals',
		config: { keyPath: 'id', autoIncrement: true},
		addIdIndex: true,
		dataPopulator: addDemoMeals
	},
	servingSizes: {
		dbName: 'servingSize',
		config: { keyPath: 'id', autoIncrement: true}
	},
	settings: {
		dbName: 'settings',
		dataPopulator: addDefaultSettings
	}
}


function addDemoFoods(store) {
	demoFoods.forEach(item => store.add(item));
}
function addDemoMeals(store) {
	demoMeals.forEach(meal => store.add(meal));
}
function addDefaultSettings(store) {
	store.add({
		protein: '#0088FE',
		carbs: '#00C49F',
		fat: '#FFBB28'
	}, 'macroColors');
}

const dbPromise = openDB('MealPlanner', 2, {
	upgrade(db, oldVersion) {
		if (oldVersion < 2) {
			// reset old dbs
			[...db.objectStoreNames].forEach(dbName => db.deleteObjectStore(dbName));

			Object.values(dbConfigs).forEach(config => {
				const store = db.createObjectStore(config.dbName, config.config);
				if(config.addIdIndex) {
					store.createIndex('id', 'id');
				}
				if(config.dataPopulator) {
					config.dataPopulator(store);
				}
			});
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

const stores = Object.keys(dbConfigs).reduce((stores, storeName) => {
	stores[storeName] = storeFactory(dbConfigs[storeName].dbName);
	return stores;
}, {});

// return a map for accessing every store
export default stores;
	