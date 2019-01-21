function escapRooms(state=[],action){
    switch(action.type){
        case 'ADD_ESCAPE_ROOM':
            state.escapeRooms.append(action.escapRoom);
            return {...state};
        case 'REMOVE_ESCAPE_ROOM':
            const escapeRooms = state.escapeRooms;
            const i = escapRooms.indexOf(action.escapRoom);
            escapRooms.remove(i);
            return {...state};
        case 'UPDATE_ESCAPE_ROOMS':
            return Object.assign(state,{escapeRooms:action.escapRooms})
    }
    return state;
}

export default escapRooms;