import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import reducers from './reducers';
import { getLocalChannelList } from '../helpers/syncStore';



const initialState = {
    channelList: getLocalChannelList() || [],
    error: '',
    newsListTypeShow: 'ALL'
};


const store = createStore(reducers, initialState, composeWithDevTools(applyMiddleware(thunk)));

export default store;