function escapeRooms(state=[],action){
    let i;
    switch(action.type){
        case 'ADD_ESCAPE_ROOM':
            state.push(action.escapeRoom);
            return state.slice();
        case 'REMOVE_ESCAPE_ROOM':
            i = state.findIndex(escapeRoom => escapeRoom._id === action.escapeRoom._id);
            return [...state.slice(0,i),...state.slice(i+1)]
        case 'UPDATE_ESCAPE_ROOM':
            i = state.findIndex(escapeRoom=>escapeRoom._id === action.escapeRoom._id);
            state[i] = action.escapeRoom;
            return state.slice(); 
        case 'UPDATE_ESCAPE_ROOMS':
            return action.escapeRooms.slice();
        default:
            return state;
    }
}

export default escapeRooms;