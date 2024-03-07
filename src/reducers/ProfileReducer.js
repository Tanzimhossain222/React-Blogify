import actions from "../actions";

const initialProfileState = {
    user: null,
    blogs: [],
    loading: false,
    error: null,
    blogAuthor: null,
}

const profileReducer = (state = initialProfileState, action) => {
    switch (action.type) {
        case actions.profile.DATA_FETCHING:
            return {
                ...state,
                loading: true,
                error: null,
            }

        case actions.profile.DATA_FETCHED: {
            return {
                ...state,
                loading: false,
                user: action.payload.user,
                blogs: action.payload.blogs,
                blogAuthor: null
            }
        }

        case actions.profile.USER_DATA_EDITED:
            return {
                ...state,
                user: action.payload,
                loading: false,
            }

        case actions.profile.IMAGE_UPLOADED: {
            return {
                ...state,
                loading: false,
                user: {
                    ...state.user,
                    avatar: action.payload.avatar,
                }
            }
        }

        case actions.profile.DATE_FETCH_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload,
            }

        case actions.profile.PROFILE_BLOG_DELETED: {
            return {
                ...state,
                blogs: state.blogs.filter(blog => blog.id !== action.payload),
                loading: false,
            }
        }

        case actions.profile.FETCH_BLOG_AUTHOR: {
            return {
                ...state,
                loading: false,
                blogAuthor: action.payload.blogAuthor,
                blogs: action.payload.blogs,
                user: null
            }
        }

        default:
            return state;
    }

}


export { initialProfileState, profileReducer };
