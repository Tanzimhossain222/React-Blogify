const actions = {
    Auth: {
        login: 'AUTH_LOGIN',
        logout: 'AUTH_LOGOUT',
        register: 'AUTH_REGISTER',
        setAccessToken: 'AUTH_SET_ACCESS_TOKEN',
    },
    profile:{
        DATA_FETCHING: 'PROFILE_DATA_FETCHING',
        DATA_FETCHED: 'PROFILE_DATA_FETCHED',
        USER_DATA_EDITED: 'PROFILE_USER_DATA_EDIT',
        IMAGE_UPLOADED: 'PROFILE_IMAGE_UPLOADED',
        DATE_FETCH_ERROR: 'PROFILE_DATA_FETCH_ERROR',
    }
}


export default actions;