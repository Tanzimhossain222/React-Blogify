import actions from "../actions"

const initialValues = {
    blogs: [],
    loading: false,
    error: null,
    singleBlog: {},
    popularBlogs: [],
    searchBlogs: [],
}

const blogReducer = (state = initialValues, action) => {
    switch (action.type) {
        case actions.blog.BLOG_FETCHING: {
            return {
                ...state,
                loading: true,
            }
        }

        case actions.blog.BLOG_FETCHED: {
            return {
                ...state,
                loading: false,
                blogs: action.payload,
            }
        }

        case actions.blog.BLOG_CREATED: {
            return {
                ...state,
                blogs: [action.payload, ...state.blogs],
                loading: false,
            }
        }

        case actions.blog.BLOG_DELETED: {
            return {
                ...state,
                blogs: state.blogs.filter((blog) => blog.id !== action.payload),
                loading: false,
            }
        }

        case actions.blog.BLOG_EDITED: {
            return {
                ...state,
                blogs: state.blogs.map((blog) => {
                    if (blog.id === action.payload.id) {
                        return action.payload
                    }
                    return blog
                })
            }
        }

        case actions.blog.BLOG_FETCH_ERROR: {
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
        }

        case actions.blog.SINGLE_BLOG_FETCHED: {
            return {
                ...state,
                singleBlog: action.payload,
                loading: false,
            }
        }

        case actions.blog.POST_COMMENT: {
            return {
                ...state,
                loading: false,
                singleBlog: {
                    ...state.singleBlog,
                    comments: action.payload,
                },

            }
        }

        case actions.blog.DELETE_COMMENT: {
            return {
                ...state,
                singleBlog: {
                    ...state.singleBlog,
                    comments: state.singleBlog.comments.filter((comment) => comment.id !== action.payload)
                },
                loading: false,
            }
        }

        case actions.blog.BLOG_LIKED: {
            return {
                ...state,
                singleBlog: {
                    ...state.singleBlog,
                    likes: action.payload,
                },
                loading: false,
            }
        }

        case actions.blog.BLOG_FAVORITE: {
            return {
                ...state,
                singleBlog: {
                    ...state.singleBlog,
                    isFavourite: action.payload,
                },
                loading: false,
            }
        }

        case actions.blog.FETCH_SEARCH_DATA: {
            return {
                ...state,
                searchBlogs: action.payload,
                loading: false,
            }
        }

        default:
            return state
    }

}


export { blogReducer, initialValues }
