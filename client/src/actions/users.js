export function login(user) {
    return {
        type: 'LOGIN', user
    }
}

export function logout() {
    return {
        type: 'LOGOUT'
    }
}

