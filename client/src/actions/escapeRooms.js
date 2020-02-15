/**
 * Redux Actions for EscapeRooms
 * @module Actions/EscapeRooms
 * @author Alistair Quinn
 */

 /** 
  * Add an Escape Room 
  * @param {EscapeRoom} escapeRoom
  * @returns {Action} Action
  */
export function addEscapeRoom(escapeRoom){
    return {
        type: 'ADD_ESCAPE_ROOM',
        escapeRoom
    }
}

/** 
 * Remove an Escape Room 
 * @param {EscapeRoom} escapeRoom
 * @returns {Action} Action 
 */
export function removeEscapeRoom(escapeRoom){
    return {
        type: 'REMOVE_ESCAPE_ROOM',
        escapeRoom
    }
}

/** 
 * Updates an Existing Escape Room 
 * @param {EscapeRoom} escapeRoom
 * @returns {Action} Action
 */
export function updateEscapeRoom(escapeRoom){
    return {
        type: 'UPDATE_ESCAPE_ROOM',
        escapeRoom
    }
}

/** 
 * Update List of Escape Rooms 
 * @param {Array<EscapeRoom>} escapeRooms 
 * @returns {Action} Action
 */
export function updateEscapeRooms(escapeRooms){
    return {
        type: 'UPDATE_ESCAPE_ROOMS',
        escapeRooms
    }
}