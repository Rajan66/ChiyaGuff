import { FETCH_ALL, FETCH_POST, FETCH_BY_SEARCH, CREATE, UPDATE, DELETE, COMMENT } from '../constants/actionTypes';

export default (posts = [], action) => {
    switch (action.type) {
        case FETCH_ALL:
            return action.payload;
        case FETCH_POST:
            return action.payload
        case FETCH_BY_SEARCH:
            return action.payload;
        case CREATE:
            return [...posts, action.payload]
        case UPDATE:
            return posts.map((post) => (post._id === action.payload._id ? action.payload : post))
        case DELETE:
            return posts.filter((post) => post._id !== action.payload)
        case COMMENT:
            return posts.map((post) => (post._id === action.payload._id ? action.payload : post))
        default:
            return posts;
    }
}