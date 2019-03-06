export function setEscapeRoom(escapeRoom){
    return {
        type: 'SET_ESCAPE_ROOM',
        escapeRoom
    }
}

export function clearEscapeRoom(escapeRoom){
    return {
        type: 'CLEAR_ESCAPE_ROOM',
        escapeRoom
    }
}