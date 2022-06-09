import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userReduce from "./reducers/userReduce";
import progressReduce from "./reducers/progressReduce";
import clubPageReduce from "./reducers/clubPageReduce";
import postReduce from "./reducers/postReduce";

const reducers = combineReducers({
  user: userReduce,
  progress: progressReduce,
  clubPage: clubPageReduce,
  posts: postReduce,
});

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["progress", "clubPage", "posts"],
};

const persistedReducer = persistReducer(persistConfig, reducers);
const store = createStore(persistedReducer, compose(applyMiddleware(thunk)));

const persistor = persistStore(store);

export { store, persistor };
