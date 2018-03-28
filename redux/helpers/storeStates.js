export const initialState = {
    isFetching: false,
    failure: false,
    success: false,
    error: null,
    searchText: ''
};

export const requestState = {
    isFetching: true,
    failure: false,
    success: false,
    data: null
}

export const successState = {
    isFetching: false,
    failure: false,
    success: true,
    error: null
}

export const failureState = {
    isFetching: false,
    failure: true,
    success: false
}