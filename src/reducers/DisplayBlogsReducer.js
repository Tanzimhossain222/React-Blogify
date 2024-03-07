import actions from "../actions"

const initialState = {
    blogs: [],
    popularBlogs: [],
    searchBlogs: [],
    singleBlog: {},
    isLoading: false,
    error: null,
}

const DisplayBlogsReducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.display.DISPLAY_FETCHING: {
            return {
                ...state,
                isLoading: true,
            }
        }
        case actions.display.DISPLAY_BLOG_FETCHED: {
            return {
                ...state,
                blogs: action.payload,
                isLoading: false,
            }
        }

        case actions.display.POPULAR_BLOG_FETCHED: {
            return {
                ...state,
                popularBlogs: action.payload,
                isLoading: false,
            }
        }

        case actions.display.DISPLAY_ERROR: {
            return {
                ...state,
                error: action.payload,
                isLoading: false,
            }
        }

        case actions.display.SEARCH_DATA_FETCHED: {
            return {
                ...state,
                searchBlogs: action.payload,
                isLoading: false,
            }
        }

        case actions.display.DISPLAY_SINGLE_BLOG_FETCHED: {
            return {
                ...state,
                singleBlog: action.payload,
                isLoading: false,
            }
        }

        default: {
            return state
        }
    }
}

export { DisplayBlogsReducer, initialState }
