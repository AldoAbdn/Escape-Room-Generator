function escapeRoom(state={},action){
    let newState = {};
    let i;
    switch(action.type){
        case 'SET_SELECTED_ESCAPE_ROOM':
            return {...action.escapeRoom};
        case 'CLEAR_SELECTED_ESCAPE_ROOM':
            return {}
        case 'UPDATE_DETAILS':
            newState = {...state};
            newState.details = {...newState.details, ...action.details};
            return newState;
        case 'UPDATE_ACCESSIBILITY':
            newState = {...state};
            newState.accessibility = {...newState.accessibility, ...action.accessibility};
            return newState;
        case 'ADD_COMPONENT':
            newState = {...state};
            newState.components.push(action.component);
            if(action.areaId!==undefined){
                i = newState.components.findIndex(component=>component._id===action.areaId);
                newState.components[i].outputComponents.push(action.component._id);
            }
            return newState;
        case 'REMOVE_COMPONENT':
            newState = {...state};
            i = newState.components.findIndex(component=>component._id===action.componentId);
            newState.components = [...newState.components.slice(0,i),...newState.components.slice(i+1)]
            newState.components.forEach((component,index,components)=>{
                components[index].inputComponents = component.inputComponents.filter(inputId=>inputId!==action.componentId);
                components[index].outputComponents = component.outputComponents.filter(outputId=>outputId!==action.componentId);
            })
            return newState;
        case 'UPDATE_COMPONENT':
            newState = {...state};
            i = newState.components.findIndex(component=>component._id===action.component._id);
            newState.components[i] = {...newState.components[i],...action.component};
            return newState;
        case 'ADD_RELATIONSHIP':
            newState = {...state};
            newState.components.forEach((component,index,components)=>{
                if(component._id===action.parentId){
                    if(action.isInput){
                        if(component.inputComponents.indexOf(action.componentId)===-1)
                            component.inputComponents.push(action.componentId);
                    } else {
                        if(component.outputComponents.indexOf(action.componentId)===-1)
                            component.outputComponents.push(action.componentId);
                    }
                }
            });
            return newState;
        case 'REMOVE_RELATIONSHIP':
            newState = {...state};
            newState.components.forEach((component,index,components)=>{
                if(component._id===action.parentId){
                    if(action.isInput){
                        if(component.inputComponents.indexOf(action.componentId)===-1)
                            component.inputComponents = component.inputComponents.filter(id=>id!==action.componentId);
                    } else {
                        if(component.outputComponents.indexOf(action.componentId)===-1)
                            component.outputComponents = component.outputComponents.filter(id=>id!==action.componentId);
                    }
                }
            });
            return newState;
        default:
            return state;
    }
}

export default escapeRoom;