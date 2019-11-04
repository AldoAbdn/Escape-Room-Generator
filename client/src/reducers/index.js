import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import user from './user';
import escapeRooms from './escapeRooms';
import escapeRoom from './escapeRoom';
import modal from './modal';

export default function(reduxifiedServices){
    return combineReducers({
        usersService: reduxifiedServices.users.reducer,
        escapeRoomsService: reduxifiedServices['escape-rooms'].reducer,
        authManagementService: reduxifiedServices.authmanagement.reducer,
        routing: routerReducer,
        user,
        escapeRooms,
        escapeRoom,
        modal
    })
}
