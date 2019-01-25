import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import users from './users';
import escapeRooms from './escapeRooms';
import videos from './videos';

export default function(reduxifiedServices){
    console.log(reduxifiedServices);
    return combineReducers({
        usersService: reduxifiedServices.users.reducer,
        escapeRoomsService: reduxifiedServices['escape-rooms'].reducer,
        routing: routerReducer,
        user:users,
        escapeRooms,
        videos
    })
}
