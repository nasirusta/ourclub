import * as types from "../types";

const default_state = {
  loading: false,
  contentLoading: false,
  currentClub: null,
  error: null,
};

const clubPageReduce = (state = default_state, action) => {
  switch (action.type) {
    case types.CURRENT_CLUB_CONTENT:
      return { ...state, contentLoading: true };
    case types.CURRENT_CLUB_START:
      return { ...state, loading: true };
    case types.CURRENT_CLUB_SUCCESS:
      return {
        ...state,
        loading: false,
        contentLoading: false,
        error: null,
        currentClub: action.payload,
      };
    case types.CURRENT_CLUB_FAIL:
      return {
        ...state,
        loading: false,
        contentLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default clubPageReduce;
