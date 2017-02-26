import ActionTypes from '../constants/actionTypes';


export default function (state=[], action) {

    switch (action.type) {
        case ActionTypes.SHOW_ALL_NEWS:
            return 'ALL';

        case ActionTypes.SHOW_UNREAD_NEWS:
            return 'UNREAD';

        case ActionTypes.SHOW_READ_NEWS:
            return 'READ';


        default:
            return state;
    }
}
