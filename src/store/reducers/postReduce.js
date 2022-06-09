import * as types from "../types";

const default_state = {
  loading: false,
  contents: [],
  error: null,
};

const postReduce = (state = default_state, action) => {
  switch (action.type) {
    case types.GET_POST_START:
      return { ...state, loading: true };
    case types.GET_POST_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        contents: action.payload,
      };
    case types.GET_POST_FAIL:
      return {
        ...state,
        loading: false,
        contents: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

export default postReduce;
