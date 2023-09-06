/* eslint-disable react/prop-types */
import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import NoteContext from "../context/notes/noteContext";
import NoteItem from "./NoteItem";
import AddNote from "./AddNote";

export default function Note(props) {
  const context = useContext(NoteContext);
  const { notes, getNotes, editNote } = context;
  let navigate = useNavigate();

  const [note, setNote] = useState({
    id: "",
    etitle: "",
    edescription: "",
    etag: "",
  });
  useEffect(() => {
    if (localStorage.getItem("token")) {
      getNotes();
    } else {
      navigate("/login");
    }
  });

  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({
      id: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag,
    });
  };

  const click = () => {
    editNote(note.id, note.etitle, note.edescription, note.etag);
    refClose.current.click();
    props.showAlert("Note Updated Successfully!", "success");
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  const ref = useRef(null);
  const refClose = useRef(null);
  return (
    <>
      <AddNote showAlert={props.showAlert} />
      <button
        type="button"
        className="btn btn-primary d-none"
        data-toggle="modal"
        data-target="#exampleModal"
        ref={ref}
      >
        Launch demo modal
      </button>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Note
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    id="etitle"
                    name="etitle"
                    placeholder="Enter Title"
                    value={note.etitle}
                    onChange={onChange}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    id="edescription"
                    name="edescription"
                    placeholder="Enter Description"
                    value={note.edescription}
                    onChange={onChange}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    id="etag"
                    name="etag"
                    placeholder="Enter Tag Name"
                    value={note.etag}
                    onChange={onChange}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                ref={refClose}
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button
                disabled={
                  note.etitle.length < 5 || note.edescription.length < 10
                }
                type="button"
                className="btn btn-primary"
                onClick={click}
              >
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <h2>Your Notes</h2>
        {notes.length === 0 && "No Notes to Display"}
        <div className="row my-4">
          {notes.map((note) => {
            return (
              <NoteItem
                key={note._id}
                updateNote={updateNote}
                note={note}
                showAlert={props.showAlert}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}
