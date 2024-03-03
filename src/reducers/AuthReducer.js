import actions from "../actions";

const initialState = {
    user: null,
    accessToken: null,
    refreshToken: null,
}

const AuthReducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.Auth.login: {
            return {
                ...state,
                user: action.payload.user,
                accessToken: action.payload.accessToken,
                refreshToken: action.payload.refreshToken,
            }
        }

        case actions.Auth.logout: {
            localStorage.removeItem('user');
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('refreshTokenExpiresAt'); // remove refresh token expiry date
            return {
                ...state,
                user: null,
                accessToken: null,
                refreshToken: null
            }
        }

    }
}

export { AuthReducer, initialState };
