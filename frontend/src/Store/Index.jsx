import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import  AuthSlice  from "./Reducer/RootReducers";
import  userSlice  from "./Reducer/UserReducer";
import  postSlice  from "./Reducer/PostReducers";

const persistConfig = {
  key: "auth",
  storage,
};

const authReducer = persistReducer(persistConfig, AuthSlice);
const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userSlice,
    post : postSlice
  },
});
const persistor = persistStore(store);

export  {store,persistor };
