import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const notesApi = createApi({
  reducerPath: "notes",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://notecloud-server.onrender.com",
  }),
  endpoints(builder) {
    return {
      fetchNotes: builder.query({
        providesTags: ["Notes"],
        query: () => {
          return {
            url: "/notes",
            method: "GET",
          };
        },
      }),
      addNote: builder.mutation({
        invalidatesTags: ["Notes"],
        query: (note) => {
          return {
            url: "/notes",
            method: "POST",
            body: {
              title: note.title,
              content: note.content,
            },
          };
        },
      }),
      removeNote: builder.mutation({
        invalidatesTags: ["Notes"],
        query: (note) => {
          return {
            url: `/notes/${note.id}`,
            method: "DELETE",
          };
        },
      }),
      editNote: builder.mutation({
        invalidatesTags: (note) => {
          return ["Notes"];
        },
        query: (note) => {
          return {
            url: `/notes/${note.id}`,
            method: "PUT",
            body: {
              title: note.newTitle,
              content: note.newContent,
            },
          };
        },
      }),
    };
  },
});

export const {
  useFetchNotesQuery,
  useAddNoteMutation,
  useRemoveNoteMutation,
  useEditNoteMutation,
} = notesApi;
export { notesApi };
