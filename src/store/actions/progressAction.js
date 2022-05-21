import * as types from "../types";

const progressComplite = (count) => ({
  type: types.PROGRESS_START,
  payload: count,
});

const progressEnd = () => ({
  type: types.PROGRESS_END,
});

const progInitiate = (prog) => (dispatch) => {
  dispatch(progressComplite(prog));
  if (prog > 99) {
    dispatch(progressEnd());
  }
};

export { progInitiate };
