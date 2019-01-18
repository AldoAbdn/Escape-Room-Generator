import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

export default function(reduxifiedServices){
    return combineReducers({
        users: reduxifiedServices.users.reducer,
        escapeRooms: reduxifiedServices.escapeRooms.reducer,
        routing: routerReducer 
    })
}
