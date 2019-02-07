export function addEscapeRoom(escapeRoom){
    return {
        type: 'ADD_ESCAPE_ROOM',
        escapeRoom
    }
}

export function removeEscapeRoom(escapeRoom){
    return {
        type: 'REMOVE_ESCAPE_ROOM',
        escapeRoom
    }
}

export function updateEscapeRoom(i, escapeRoom){
    return {
        type: 'UPDATE_ESCAPE_ROOM',
        i,
        escapeRoom
    }
}

export function updateEscapeRooms(escapeRooms){
    return {
        type: 'UPDATE_ESCAPE_ROOMS',
        escapeRooms
    }
}