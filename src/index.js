import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { configureStore } from 'redux-starter-kit'
import './index.css';
import App from './App';
import reducers from './reducers/reducers';
import applicationStore from './applicationStore';
import * as serviceWorker from './serviceWorker';


async function load() {
	const preloadedState = {
		foods: {
			local: await applicationStore.localFood.getAllItems(),
			sfcd: await applicationStore.sfcdFoodCache.getAllItems()
		},
		meals: await applicationStore.meals.getAllItems(),
		settings: {
			showDemoDataNotice: !(await applicationStore.settings.get('demoDataNoticeShown')),
			macroColors: await applicationStore.settings.get('macroColors')
		}
	};

	const store = configureStore({
		reducer: reducers,
		preloadedState: preloadedState,
	});
	ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
}

load();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
