export const initialState = {
    isFetching: false,
    failure: false,
    success: false,
    data: null
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
    success: true
}

export const failureState = {
    isFetching: false,
    failure: true,
    success: false
}