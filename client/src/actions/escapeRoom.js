import { Accessibility } from "../components"

/**
 * Redux Actions for EscapeRoom
 * @module Actions/EscapeRoom
 * @author Alistair Quinn
 */

 /** 
  * Set Selected Escape Room 
  * @param {EscapeRoom} escapeRoom 
  * @return {Action} Action
  */
export function setSelectedEscapeRoom(escapeRoom){
    return {
        type: 'SET_SELECTED_ESCAPE_ROOM',
        escapeRoom
    }
}

/** Clears Selected Escape Room 
 * @param {EscapeRoom} escapeRoom 
 * @return {Action} Action
 */
export function clearSelectedEscapeRoom(escapeRoom){
    return {
        type: 'CLEAR_SELECTED_ESCAPE_ROOM',
        escapeRoom
    }
}

/** 
 * Update Selected Escape Room's Details 
 * @param {EscapeRoom} escapeRoom 
 * @return {Action} Action
 */
export function updateDetails(details){
    return {
        type: 'UPDATE_DETAILS',
        details
    }
}

/** 
 * Update Selected Escape Rooms's Accessibility 
 * @param {Accessibility} accessibility 
 * @return {Action} Action
 */
export function updateAccessibility(accessibility){
    return {
        type: 'UPDATE_ACCESSIBILITY',
        accessibility
    }
}

/** 
 * Add Component to Selected Escape Room 
 * @param {Component} component
 * @param {string} areaId 
 * @return {Action} Action
 */
export function addComponent(component, areaId){
    return {
        type: 'ADD_COMPONENT',
        component,
        areaId
    }
}

/** 
 * Remove Component to Selected Escape Room 
 * @param {string} componentId 
 * @return {Action} Action
 */
export function removeComponent(componentId){
    return {
        type: 'REMOVE_COMPONENT',
        componentId
    }
}

/** 
 * Update an Existing Component to Selected Escape Room 
 * @param {Component} component
 * @param {string} areaId 
 * @return {Action} Action
 */
export function updateComponent(component,areaId){
    return {
        type: 'UPDATE_COMPONENT',
        component,
        areaId
    }
}

/** 
 * Add Relationship Between Components 
 * @param {string} componentId
 * @param {string} stringId
 * @param {bool} isInput 
 * @return {Action} Action
 */
export function addRelationship(componentId,parentId,isInput){
    return {
        type: 'ADD_RELATIONSHIP',
        componentId,
        parentId,
        isInput
    }
}

/** 
 * Remove Relationship Between Components 
 * @param {string} componentId
 * @param {string} stringId
 * @param {bool} isInput
 * @return {Action} Action 
 */
export function removeRelationship(componentId,parentId,isInput){
    return {
        type: 'REMOVE_RELATIONSHIP',
        componentId,
        parentId,
        isInput
    }
}

