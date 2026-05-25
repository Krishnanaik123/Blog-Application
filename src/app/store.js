import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";

import { persistStore,persistReducer,} from "redux-persist";
import languageReducer from "../features/Language/languageSlice";

import storage from "redux-persist/es/storage";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(
  persistConfig,
  authReducer,
);

export const store = configureStore({
  reducer: {
    auth: persistedReducer,
    language:languageReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);