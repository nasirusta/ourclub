import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userReduce from "./reducers/userReduce";
import progressReduce from "./reducers/progressReduce";

const reducers = combineReducers({
  user: userReduce,
  progress: progressReduce,
});

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["progress"],
};

const persistedReducer = persistReducer(persistConfig, reducers);
const store = createStore(persistedReducer, compose(applyMiddleware(thunk)));

const persistor = persistStore(store);

export { store, persistor };
