const emptyState = {
    isLoggedIn: false,
    user: {},
};

let initialState;

localStorage['appState'] && (initialState = JSON.parse(localStorage['appState']));

export default function loginData(state = initialState || emptyState, action) {
    if(action.type === 'LOG_IN'){
        localStorage["appState"] = JSON.stringify(action.payload);
        return action.payload;
    }
    if(action.type === 'LOG_OUT'){
        localStorage["appState"] = JSON.stringify(emptyState);
        return emptyState;
    }
    return state;
}
