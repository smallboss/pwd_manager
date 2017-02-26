import ActionTypes from '../constants/actionTypes';

export const showALLNews = () => dispatch => {
    dispatch({ type: ActionTypes.SHOW_ALL_NEWS })
};


export const showUNREADNews = () => dispatch => {
    dispatch({ type: ActionTypes.SHOW_UNREAD_NEWS })
};


export const showREADNews = () => dispatch => {
    dispatch({ type: ActionTypes.SHOW_READ_NEWS })
};
