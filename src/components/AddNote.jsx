/* eslint-disable react/prop-types */
import { useContext, useState } from "react";
import NoteContext from "../context/notes/noteContext";

export default function AddNote(props) {
  const context = useContext(NoteContext);
  const { addNote } = context;

  const [note, setNote] = useState({
    title: "",
    description: "",
    tag: "default",
  });

  const click = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    setNote({ title: "", description: "", tag: "default" });
    props.showAlert("Note Added Successfully!", "success");
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  return (
    <>
      <div className="container my-3">
        <h2>Add a Note</h2>
        <form>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              placeholder="Enter Title"
              onChange={onChange}
              value={note.title}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="description"
              name="description"
              placeholder="Enter Description"
              onChange={onChange}
              value={note.description}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="tag"
              name="tag"
              placeholder="Enter Tag Name(Optional)"
              onChange={onChange}
              value={note.tag === "default" ? "" : note.tag}
            />
          </div>
          <button
            disabled={note.title.length < 5 || note.description.length < 10}
            type="submit"
            className="btn btn-primary"
            onClick={click}
          >
            Add Note
          </button>
        </form>
      </div>
    </>
  );
}
