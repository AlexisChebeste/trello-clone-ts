import {  combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./states/authSlice";
import workspaceReducer from "./states/workspacesSlices"
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

const persistConfig ={
    key: 'root',
    storage,
    whitelist: ["workspaces"],
}

const rootReducer = combineReducers({
    workspaces: workspaceReducer,
    auth: authReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: false, // Necesario para `redux-persist`
        }),
})

// Tipos para dispatch y estado
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);