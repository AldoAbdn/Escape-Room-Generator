function escapeRoom(state={},action){
    switch(action.type){
        case 'SET_ESCAPE_ROOM':
            return {...action.escapeRoom};
        case 'CLEAR_ESCAPE_ROOM':
            return {}
        default:
            return state;
    }
}

export default escapeRoom;