function videos(state = [], action) {
    switch(action.type)
    {
        case 'UPDATE_VIDEOS':
            return Object.assign(state,{videos:action.videos});
        default:
    }
    return state;
}

export default videos;