/**
 * Redux Actions for User
 * @module Actions/User
 * @author Alistair Quinn
 */

 /** 
  * Set User 
  * @param {User} user
  * @returns {Action} Action 
  */
export function login(user) {
    return {
        type: 'LOGIN', user
    }
}

/** 
 * Unset User 
 * @returns {Action} Action
 */
export function logout() {
    return {
        type: 'LOGOUT'
    }
}

