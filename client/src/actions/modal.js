/**
 * Redux Actions for Modal
 * @module Actions/Modal
 * @author Alistair Quinn
 */

 /** 
  * Shows Modal 
  * @param {Modal} modal
  * @returns {Action} Action
  */
export function showModal(modal){
    return {
        type: 'SHOW_MODAL',
        modal
    }
}

/** 
 * Hide Modal 
 * @returns {Action} Action 
 */
export function hideModal(){
    return {
        type: 'HIDE_MODAL'
    }
}