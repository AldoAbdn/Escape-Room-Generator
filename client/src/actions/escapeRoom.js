export function setSelectedEscapeRoom(escapeRoom){
    return {
        type: 'SET_SELECTED_ESCAPE_ROOM',
        escapeRoom
    }
}

export function clearSelectedEscapeRoom(escapeRoom){
    return {
        type: 'CLEAR_SELECTED_ESCAPE_ROOM',
        escapeRoom
    }
}

export function updateDetails(details){
    return {
        type: 'UPDATE_DETAILS',
        details
    }
}

export function updateAccessibility(accessibility){
    return {
        type: 'UPDATE_ACCESSIBILITY',
        accessibility
    }
}

export function addComponent(component, areaId){
    return {
        type: 'ADD_COMPONENT',
        component,
        areaId
    }
}

export function removeComponent(componentId){
    return {
        type: 'REMOVE_COMPONENT',
        componentId
    }
}

export function updateComponent(component,areaId){
    return {
        type: 'UPDATE_COMPONENT',
        component,
        areaId
    }
}

export function addRelationship(componentId,parentId,isInput){
    return {
        type: 'ADD_RELATIONSHIP',
        componentId,
        parentId,
        isInput
    }
}

export function removeRelationship(componentId,parentId,isInput){
    return {
        type: 'REMOVE_RELATIONSHIP',
        componentId,
        parentId,
        isInput
    }
}

