import 'babel-polyfill'
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { configureStore } from 'redux-starter-kit'
import {fetchMeetups} from './actions'
import {rootReducer} from './reducers'

const store = configureStore({
  reducer: rootReducer
})

store.dispatch(fetchMeetups()).then(() => console.log(store.getState()))


ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
