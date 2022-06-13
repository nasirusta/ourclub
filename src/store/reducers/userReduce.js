import * as types from "../types";

const default_state = {
  loading: false,
  currentUser: null,
  auth: false,
  subscribed_clubs: [],
  error: null,
};

const userReduce = (state = default_state, action) => {
  switch (action.type) {
    case types.REGISTER_START:
    case types.LOGIN_START:
    case types.PROFILE_EDIT_START:
    case types.CREATE_CLUB_START:
    case types.EDIT_CLUB_START:
      return { ...state, loading: true };
    case types.LOGOUT_SUCCESS:
      return { ...state, auth: false, currentUser: null };
    case types.REGISTER_SUCCESS:
    case types.LOGIN_SUCCESS:
    case types.PROFILE_EDIT_SUCCESS:
    case types.CREATE_CLUB_SUCCESS:
    case types.EDIT_CLUB_SUCCESS:
      return {
        ...state,
        loading: false,
        auth: true,
        error: null,
        currentUser: action.payload,
      };
    case types.SET_SUBSCRIBED_CLUB:
      return {
        ...state,
        subscribed_clubs: action.payload,
      };
    case types.REGISTER_FAIL:
    case types.LOGIN_FAIL:
    case types.LOGOUT_FAIL:
      return { ...state, loading: false, auth: false, error: action.payload };
    case types.PROFILE_EDIT_FAIL:
    case types.CREATE_CLUB_FAIL:
    case types.EDIT_CLUB_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default userReduce;
