const actions = {
    Auth: {
        login: 'AUTH_LOGIN',
        logout: 'AUTH_LOGOUT',
        register: 'AUTH_REGISTER',
        setAccessToken: 'AUTH_SET_ACCESS_TOKEN',
    },
    profile: {
        DATA_FETCHING: 'PROFILE_DATA_FETCHING',
        DATA_FETCHED: 'PROFILE_DATA_FETCHED',
        USER_DATA_EDITED: 'PROFILE_USER_DATA_EDIT',
        IMAGE_UPLOADED: 'PROFILE_IMAGE_UPLOADED',
        DATE_FETCH_ERROR: 'PROFILE_DATA_FETCH_ERROR',
    },
    blog: {
        BLOG_FETCHING: 'BLOG_FETCHING',
        BLOG_FETCHED: 'BLOG_FETCHED',
        BLOG_FETCH_ERROR: 'BLOG_FETCH_ERROR',
        BLOG_CREATED: 'BLOG_CREATED',
        BLOG_EDITED: 'BLOG_EDITED',
        BLOG_DELETED: 'BLOG_DELETED',
        BLOG_UPDATED: 'BLOG_UPDATED',
        SINGLE_BLOG_FETCHED: 'SINGLE_BLOG_FETCHED',
    },
}


export default actions;