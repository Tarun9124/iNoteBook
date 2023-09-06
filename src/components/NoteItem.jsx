/* eslint-disable react/prop-types */
import { useContext } from "react";
import "../assets/mystyle.css";
import NoteContext from "../context/notes/noteContext";

export default function NoteItem(props) {
  const context = useContext(NoteContext);
  const { deleteNote } = context;
  const { note, updateNote } = props;
  return (
    <>
      <div className="col-md-4">
        <div className="card my-3">
          <div className="card-body">
            <div className="d-flex">
              <div>
                <h5 className="card-title">{note.title}</h5>
              </div>
              <div className="ml-auto p-2">
                <i
                  className="fa-solid fa-pen-to-square mx-2"
                  onClick={() => {
                    updateNote(note);
                  }}
                ></i>
                <i
                  className="fa-solid fa-trash mx-2"
                  onClick={() => {
                    deleteNote(note._id);
                    props.showAlert("Note Deleted Successfully!", "success");
                  }}
                ></i>
              </div>
            </div>
            <p className="card-text"> {note.description}</p>
          </div>
        </div>
      </div>
    </>
  );
}
