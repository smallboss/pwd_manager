import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import user from  './user';
import error from  './error';
import passwordList from './passwordList';

export default combineReducers({
    routing: routerReducer,
    user,
    error,
    passwordList
});
