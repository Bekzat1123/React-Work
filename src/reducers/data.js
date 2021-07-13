const initialState = {
    users: [],

}

export function users(state = initialState, action){
    switch (action.type) {
        case 'GET_USER':
            return {
                ...state,
                users: action.users
            }
        default:
            return state;
    }
}