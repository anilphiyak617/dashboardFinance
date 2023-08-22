import { configureStore } from "@reduxjs/toolkit";
import { api } from "@/state/api";
import { setupListeners } from "@reduxjs/toolkit/dist/query";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefault) => getDefault().concat(api.middleware),
});

// console.log("store-dispatch", store.dispatch);

// handle automatic cache invalidation and refetching of data based on certain events
setupListeners(store.dispatch);
