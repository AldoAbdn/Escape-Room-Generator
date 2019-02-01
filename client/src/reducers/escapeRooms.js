function escapRooms(state=[],action){
    switch(action.type){
        case 'ADD_ESCAPE_ROOM':
            state.push(action.escapeRoom);
            return state.slice();
        case 'REMOVE_ESCAPE_ROOM':
            const i = state.indexOf(action.escapeRoom);
            state.pop(i);
            return state.slice();
        case 'UPDATE_ESCAPE_ROOM':
            state[action.i] = action.escapRoom;
            return {...state}; 
        case 'UPDATE_ESCAPE_ROOMS':
            return action.escapeRooms.slice();
        default:
            return state;
    }
}

export default escapRooms;