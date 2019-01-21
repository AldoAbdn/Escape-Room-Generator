import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import users from './users';
import escapeRooms from './escapeRooms';
import videos from './videos';

export default function(reduxifiedServices){
    return combineReducers({
        usersService: reduxifiedServices.users.reducer,
        escapeRoomsService: reduxifiedServices.escapeRooms.reducer,
        routing: routerReducer,
        user:users,
        escapeRooms,
        videos
    })
}
