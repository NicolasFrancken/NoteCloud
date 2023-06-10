import "./NoteCreate.css";

import ReactDOM from "react-dom";
import { useState } from "react";
import { useAddNoteMutation } from "../store";

function NoteCreate({ onSubmit, onCloseClick }) {
  const [addNote] = useAddNoteMutation();
  const [inputValue, setInputValue] = useState("");
  const [textValue, setTextValue] = useState("");

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleTextChange = (event) => {
    setTextValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const note = { title: inputValue, content: textValue };

    if (inputValue === "") {
      return onCloseClick();
    }

    addNote(note);

    onSubmit();
  };

  const handleClose = () => {
    onCloseClick();
  };

  return ReactDOM.createPortal(
    <>
      <div className="NoteCreate-grey-container"></div>
      <div className="NoteCreate-container">
        <form className="NoteCreate-form" onSubmit={handleSubmit}>
          <div className="NoteCreate-top">
            <div className="NoteCreate-leftright">
              <input
                className="NoteCreate-input"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Title"
                autoFocus
              />
              <button className="NoteCreate-close-btn" onClick={handleClose}>
                <img
                  src="https://cdn-icons-png.flaticon.com/128/657/657059.png"
                  alt=""
                />
              </button>
            </div>
            <textarea
              className="NoteCreate-textarea"
              value={textValue}
              onChange={handleTextChange}
              placeholder="Write something!"
            ></textarea>
          </div>
          <button className="NoteCreate-save-btn">SAVE</button>
        </form>
      </div>
    </>,
    document.getElementById("portal1")
  );
}

export default NoteCreate;
