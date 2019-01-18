//Login 
export function login(username, token){
    return {
        type: 'LOGIN',
        username,
        token
    }
}

//Logout
export function logout(username, token){
    return {
        type: 'LOGOUT',
        username,
        token
    }
}

//Update Escape Rooms
export function updateEscapeRooms(escapeRooms){
    return {
        type:'UPDATE_ESCAPE_ROOMS',
        escapeRooms
    }
}

//Add Escape Room
export function addEscapeRoom(id, user, escapeRoom){
    return {
        type: 'ADD_ESCAPE_ROOM',
        id,
        user,
        escapeRoom
    }
}

//Remove Escape Room
export function removeEscapeRoom(id, i){
    return {
        type: 'REMOVE_ESCAPE_ROOM',
        i
    }
}
