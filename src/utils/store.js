import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";

import storage from "redux-persist/lib/storage";

import userReducer from "../redux/userSlice";
import branchReducer from "../redux/branchSlice";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  blacklist: ["navigation"],
};

const reducer = combineReducers({
  user: userReducer,
  branch : branchReducer
});

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: true,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export const persistor = persistStore(store);
