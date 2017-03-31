import _ from 'lodash';

import ActionTypes from '../constants/actionTypes';


export default function (state=[], action) {

    switch(action.type) {
        case ActionTypes.ADD_CHANNEL:
            action.payload.item.forEach((news, index) => news.id = index);
            return [action.payload, ...state];


        case ActionTypes.REMOVE_CHANNEL: {
            let stateWithoutElement = _.cloneDeep(state);
            stateWithoutElement.splice(action.payload, 1);

            return stateWithoutElement;
        }


        case ActionTypes.SET_READ_NEWS: {
            const {channelId, newsId, newsListTypeShow} = action.payload;
            const newChannelList = _.cloneDeep(state);
            newChannelList[channelId].item[newsId].state = 'read';

            return newChannelList;
        }


        case ActionTypes.LOAD_FROM_LOCAL_CHANNELLIST:
            return action.payload;


        case ActionTypes.REFRESH_CHANNEL: {
            let newChannelList = _.cloneDeep(state);


            const {item, channelId} = action.payload;

            let newsLisstIsUpdate = true;
            if(item[0].link[0] == state[channelId].item[0].link[0])
                newsLisstIsUpdate = false;

            if (newsLisstIsUpdate) {
                item.forEach((news, index) => {
                    news.id = index;
                    const isOldNews = state[channelId].item.findIndex(newsInState => newsInState.link[0] == news.link[0]);

                    if (~isOldNews)
                        news.state = state[channelId].item[isOldNews].state;
                });

                newChannelList[channelId].item = item;
            }

            return newChannelList;
        }


        case ActionTypes.CHANGE_CHANNEL_RSS: {
            const newChannelList = _.cloneDeep(state);
            newChannelList[action.payload.channelId] = action.payload.newChannelData;

            return newChannelList;
        }


        default: return state;
    }
}