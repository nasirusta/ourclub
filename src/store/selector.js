import { createSelector } from "reselect";

export const userMemo = createSelector(
  (state) => state.user,
  (user) => {
    console.log("User: ", user);
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

export const clubPageMemo = createSelector(
  (state) => state.clubPage,
  (clubPage) => {
    console.log("Club Page: ", clubPage);
    return clubPage;
  }
);

export const postMemo = createSelector(
  (state) => state.posts,
  (posts) => {
    console.log("Posts: ", posts);
    return posts;
  }
);
