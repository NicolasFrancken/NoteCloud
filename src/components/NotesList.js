import "./NotesList.css";

import { useDispatch } from "react-redux";
import { useFetchNotesQuery } from "../store";
import NotesShow from "./NotesShow";
import { updateData } from "../store";
import { useEffect } from "react";

function NotesList() {
  const dispatch = useDispatch();
  const { data, error, isLoading } = useFetchNotesQuery();

  useEffect(() => {
    if (data) {
      dispatch(updateData(data));
    }
  }, [dispatch, data]);

  let content;
  if (isLoading) {
    content = <h3 className="NotesList-h3">Loading...</h3>;
  }
  if (error) {
    content = <h3 className="NotesList-h3">Upps, there was an error</h3>;
  }
  if (data) {
    content = <NotesShow />;
  }

  return <div className="NotesList-container">{content}</div>;
}

export default NotesList;
