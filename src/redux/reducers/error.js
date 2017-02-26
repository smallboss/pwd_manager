import ActionTypes from '../constants/actionTypes';


export default function (state=[], action) {

    switch (action.type) {
        case ActionTypes.ERROR_ADD_CHANNEL:
            return action.payload;

        case ActionTypes.CLEAR_ERROR:
            return '';


        default:
            return state;
    }
}