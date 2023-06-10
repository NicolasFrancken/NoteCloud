import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { notesReducer, updateData } from "./slices/notesSlice";
import { notesApi } from "./api/notesApi";

export const store = configureStore({
  reducer: {
    notesStore: notesReducer,
    [notesApi.reducerPath]: notesApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(notesApi.middleware);
  },
});

setupListeners(store.dispatch);

export {
  useFetchNotesQuery,
  useAddNoteMutation,
  useRemoveNoteMutation,
  useEditNoteMutation,
} from "./api/notesApi";
export { updateData };
