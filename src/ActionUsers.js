export function usersFetchData(url) {
    return async (dispatch) => {
        dispatch( await fetch(url)
            .then((response) => response.json())
            .then((data) => dispatch({
                type: 'GET_USER',
                users: data
            })));

    }
}