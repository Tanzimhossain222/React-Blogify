import actions from "../actions"

const initialValues = {
    blogs: [],
    loading: false,
    error: null,
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

        case actions.blog.BLOG_CREATED:{
            return {
                ...state,
                blogs: [action.payload, ...state.blogs],
            }
        }
    }
    
}


export { blogReducer, initialValues}