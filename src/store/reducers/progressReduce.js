import * as types from "../types";

const default_state = {
  progress: 0,
  start: false,
};

const progressReduce = (state = default_state, action) => {
  switch (action.type) {
    case types.PROGRESS_START:
      return {
        ...state,
        progress: action.payload,
        start: true,
      };
    case types.PROGRESS_END:
      return {
        ...state,
        start: false,
      };
    default:
      return state;
  }
};

export default progressReduce;
