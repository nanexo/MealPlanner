import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { configureStore, getDefaultMiddleware } from 'redux-starter-kit'
import './index.css';
import App from './App';
import reducers from './reducers/reducers';
import { persist, getAll } from './PersistentMiddleware';
import * as serviceWorker from './serviceWorker';


async function load() {
	const store = configureStore({
		reducer: reducers,
		preloadedState: await getAll(),
		middleware: [
			persist,
			...getDefaultMiddleware()
		]
	});
	ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
}

load();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
