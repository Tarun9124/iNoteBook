/* eslint-disable react/prop-types */
import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const noteIntial = [];
  const [notes, setNotes] = useState(noteIntial);

  //Add a Note
  const getNotes = async () => {
    try {
      //API call
      const respone = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      });
      const json = await respone.json();
      setNotes(json);
    } catch (error) {
      console.log({ error: error.message });
    }
  };

  //Add a Note
  const addNote = async (title, description, tag) => {
    try {
      //API call
      const respone = await fetch(`${host}/api/notes/addnote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({ title, description, tag }),
      });
      const note = await respone.json();
      setNotes(notes.concat(note));
    } catch (error) {
      console.log({ error: error.message });
    }
  };

  //Delete a Note
  const deleteNote = async (id) => {
    try {
      //API call
      const respone = await fetch(`${host}/api/notes/removenote/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      });

      const newNotes = notes.filter((note) => {
        return note._id !== id;
      });
      setNotes(newNotes);
      const note = await respone.json();
      console.log(note);
    } catch (error) {
      console.log({ error: error.message });
    }
  };

  //Edit a Note
  const editNote = async (id, title, description, tag) => {
    try {
      //API call
      const respone = await fetch(`${host}/api/notes/updatenote/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({ title, description, tag }),
      });

      let newNotes = JSON.parse(JSON.stringify(notes));
      for (let i = 0; i < newNotes.length; i++) {
        const element = newNotes[i];
        if (element._id === id) {
          newNotes[i].title = title;
          newNotes[i].description = description;
          newNotes[i].tag = tag;
          break;
        }
      }
      setNotes(newNotes);
      const note = await respone.json();
      console.log(note);
    } catch (error) {
      console.log({ error: error.message });
    }
  };

  return (
    <NoteContext.Provider
      value={{ notes, addNote, deleteNote, editNote, getNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
