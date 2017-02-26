import axios from 'axios';

import ActionTypes from '../constants/actionTypes';
import { apiPrefix, serverPort, getChannel } from '../../../etc/config.json';


export const loadChannelListToStore = (localChannelList) => dispatch => {
    dispatch({ type: ActionTypes.LOAD_FROM_LOCAL_CHANNELLIST, payload: localChannelList })
};


export const addNewChannel = (channelRss) => dispatch => {
    axios.post(`${apiPrefix}:${serverPort}/${getChannel}`, { channelRss })
        .then( res => {

            if(!res.data.item){
                const payload = `RSS '${channelRss}' is WRONG!`;
                dispatch({ type: ActionTypes.ERROR_ADD_CHANNEL, payload });
            } else {
                res.data.rss = channelRss;

                dispatch({ type: ActionTypes.ADD_CHANNEL, payload: res.data });
            }
        });
};


export const changeChannelRss = (channelRss, channelId) => dispatch => {
    axios.post(`${apiPrefix}:${serverPort}/${getChannel}`, { channelRss })
        .then( res => {

            if(!res.data.item){
                const payload = `RSS '${channelRss}' is WRONG!`;
                dispatch({ type: ActionTypes.ERROR_ADD_CHANNEL, payload });
            } else {
                res.data.rss = channelRss;

                const payload = {
                    newChannelData: res.data,
                    channelId
                };

                dispatch({ type: ActionTypes.CHANGE_CHANNEL_RSS, payload });
            }
        });
};


export const clearStoreError = () => dispatch => {
    dispatch({ type: ActionTypes.CLEAR_ERROR });
};


export const setReadNews = (channelId, newsId, newsListTypeShow) => dispatch => {
    dispatch({ type: ActionTypes.SET_READ_NEWS, payload: { channelId, newsId, newsListTypeShow } })
};


export const refreshChannel = (channelRss, channelId) => dispatch => {
    axios.post(`${apiPrefix}:${serverPort}/${getChannel}`, { channelRss })
        .then( res => {
            const payload = {
                item: res.data.item,
                channelId: channelId
            };

            dispatch({ type: ActionTypes.REFRESH_CHANNEL, payload });
        });
};


export const removeChannel = (chanelData) => dispatch => {
    dispatch({ type: ActionTypes.REMOVE_CHANNEL, payload: chanelData })
};