import Modal from "../models/Modal";

/**
 * Reducer for Modal State
 * @param {Modal} state 
 * @param {Action} action 
 * @returns {Modal}
 */
function modal(state=new Modal("","","",()=>{},"",()=>{},false),action){
    switch(action.type){
        case 'SHOW_MODAL':
            return {...action.modal,isOpen:true};
        case 'HIDE_MODAL':
            return new Modal("","","",()=>{},"",()=>{},false)
        default:
            return state;
    }
}

export default modal;