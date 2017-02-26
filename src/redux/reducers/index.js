import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import channelList from  './channelList';
import error from  './error';
import newsListTypeShow from  './newsListTypeShow';

export default combineReducers({
    routing: routerReducer,
    channelList,
    error,
    newsListTypeShow
});
