import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import user from './user';
import escapeRooms from './escapeRooms';
import escapeRoom from './escapeRoom';

export default function(reduxifiedServices){
    return combineReducers({
        usersService: reduxifiedServices.users.reducer,
        escapeRoomsService: reduxifiedServices['escape-rooms'].reducer,
        routing: routerReducer,
        user,
        escapeRooms,
        escapeRoom
    })
}
