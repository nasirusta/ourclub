import { createSelector } from "reselect";

export const userMemo = createSelector(
  (state) => state.user,
  (user) => {
    console.log("Ben selector: ", user);
    return user;
  }
);

export const authtMemo = createSelector(
  (state) => state.user.auth,
  (auth) => {
    return auth;
  }
);

export const progressMemo = createSelector(
  (state) => state.progress,
  (progress) => {
    return progress;
  }
);
