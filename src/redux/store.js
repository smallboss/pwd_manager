import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { browserHistory } from 'react-router'
import { composeWithDevTools } from 'redux-devtools-extension';
import { routerMiddleware } from 'react-router-redux';

import { getLocalUser } from '../helpers/syncStore';
import reducers from './reducers';

const initialState = {
    user: getLocalUser(),
    error: '',
    passwordList: [],
};

const routMiddleware = routerMiddleware(browserHistory);

const store = createStore(
    reducers,
    initialState,
    composeWithDevTools(applyMiddleware(thunk, routMiddleware)));

export default store;