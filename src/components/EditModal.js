import "./EditModal.css";

import ReactDOM from "react-dom";
import { useState } from "react";
import { useEditNoteMutation, useRemoveNoteMutation } from "../store";

function EditModal({ note }) {
  const [editNote] = useEditNoteMutation();
  const [removeNote] = useRemoveNoteMutation();

  const [showEdit, setShowEdit] = useState(false);
  const [inputValue, setInputValue] = useState(note.title);
  const [textValue, setTextValue] = useState(note.content);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleTextChange = (event) => {
    setTextValue(event.target.value);
  };

  const handleEditClick = () => {
    setShowEdit(!showEdit);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const updatedNote = {
      ...note,
      newTitle: inputValue,
      newContent: textValue,
    };

    if (inputValue === "" && textValue === "") {
      return removeNote(updatedNote);
    }

    editNote(updatedNote);
    setShowEdit(!showEdit);
  };

  if (!showEdit) {
    return (
      <button className="EditModal-btn" onClick={handleEditClick}>
        <img
          src="https://cdn-icons-png.flaticon.com/128/10242/10242742.png"
          alt=""
        />
      </button>
    );
  } else {
    return ReactDOM.createPortal(
      <>
        <div className="EditModal-grey-container"></div>
        <div className="EditModal-container">
          <form className="EditModal-form" onSubmit={handleSubmit}>
            <div className="EditModal-top">
              <div className="EditModal-leftright">
                <input
                  className="EditModal-input"
                  value={inputValue}
                  onChange={handleInputChange}
                  autoFocus
                />
                <button
                  className="EditModal-close-btn"
                  onClick={handleEditClick}
                >
                  <img
                    src="https://cdn-icons-png.flaticon.com/128/657/657059.png"
                    alt=""
                  />
                </button>
              </div>
              <textarea
                className="EditModal-textarea"
                value={textValue}
                onChange={handleTextChange}
              />
            </div>
            <button className="EditModal-save-btn">SAVE</button>
          </form>
        </div>
      </>,
      document.getElementById("portal2")
    );
  }
}

export default EditModal;
