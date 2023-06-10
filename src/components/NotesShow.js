import "./NotesShow.css";

import { useState } from "react";
import { useRemoveNoteMutation } from "../store";
import { useSelector } from "react-redux";
import NoteCreate from "./NoteCreate";
import EditModal from "./EditModal";

function NotesShow() {
  const [removeNote] = useRemoveNoteMutation();

  const [createNote, setCreateNote] = useState(false);

  const notes = useSelector((state) => state.notesStore);

  const handleCreateClick = () => {
    setCreateNote(!createNote);
  };

  const handleSubmit = () => {
    setCreateNote(!createNote);
  };

  const handleDeleteClick = (note) => {
    removeNote(note);
  };

  let content;
  if (!createNote) {
    content = (
      <button
        className="NotesShow-add-btn"
        onClick={handleCreateClick}
      ></button>
    );
  } else {
    content = (
      <NoteCreate onCloseClick={handleCreateClick} onSubmit={handleSubmit} />
    );
  }

  let renderedData;
  if (notes.length > 0) {
    renderedData = notes.map((note) => {
      return (
        <div className="NotesShow-note-container" key={note.id}>
          <div className="NotesShow-top">
            <h2 className="NotesShow-h2">{note.title}</h2>
            <textarea
              disabled={true}
              value={note.content}
              className="NotesShow-textarea"
            ></textarea>
          </div>
          <div className="NotesShow-btns-container">
            <button
              className="NotesShow-delete-btn"
              onClick={() => handleDeleteClick(note)}
            >
              <img
                src="https://cdn-icons-png.flaticon.com/128/1214/1214428.png"
                alt=""
              />
            </button>
            <EditModal note={note} />
          </div>
        </div>
      );
    });
  }

  return (
    <div className="NotesShow-container">
      {renderedData}
      {content}
    </div>
  );
}

export default NotesShow;
