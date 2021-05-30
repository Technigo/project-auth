/* eslint-disable linebreak-style */

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { API_URL } from "../reusable/urls";

import notes from "../reducers/notes";

import "./main.css";

const Main = () => {
  const [newNote, setNewNote] = useState("");
  const accessToken = useSelector((store) => store.user.accessToken);
  const notesItems = useSelector((store) => store.notes.items);

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (!accessToken) {
      history.push("/login");
    }
  }, [accessToken, history]);

  useEffect(() => {
    if (accessToken) {
      const options = {
        method: "GET",
        headers: {
          Authorization: accessToken,
        },
      };
      fetch(API_URL("notes"), options)
        .then((res) => res.json())
        .then((data) => dispatch(notes.actions.setNotes(data)));
    }
  }, [accessToken, dispatch]);

  const addNote = (e) => {
    e.preventDefault();

    if (newNote) {
      const options = {
        method: "POST",
        headers: {
          Authorization: accessToken,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: newNote }),
      };
      fetch(API_URL("notes"), options)
        .then((res) => res.json())
        .then((data) => dispatch(notes.actions.setNotes([...notesItems, data])))
        .then(setNewNote(""));
    }
  };

  return (
    <div>
      <form onSubmit={addNote} className="add-form">
        <input
          className="add-input"
          type="text"
          placeholder="write your note"
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
        />
        <button type="submit" className="add-btn">
          Add
        </button>
      </form>
      <h2>Very secret notes</h2>
      {notesItems.map((note) => (
        <div className="notes" key={note._id}>
          {note.message}
        </div>
      ))}
    </div>
  );
};

export default Main;
