import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {createStore,combineReducers,applyMiddleware} from 'redux'
import {loginReducer} from './reducers/LoginReducer'
import {audioReducer} from './reducers/AudioReducer'
import {genreReducer} from './reducers/GenreReducer'
import {collectionReducer} from './reducers/CollectionReducer'
import {notificationReducer} from './reducers/NotificationReducer'
import {filterReducer} from './reducers/FilterReducer'
import {Provider} from 'react-redux'
import thunk from 'redux-thunk'
import registerServiceWorker from './registerServiceWorker';

const reducer = combineReducers({
								login: loginReducer,
								audios:audioReducer,
								notifications:notificationReducer,
								genres:genreReducer,
								collections:collectionReducer,
								filter: filterReducer
								})

const store = createStore(reducer,applyMiddleware(thunk))
ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>
	, document.getElementById('root'));
registerServiceWorker();
