import { Container, Grid, Paper } from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import NoteCard from "../components/NoteCard";

const Note = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/notes").then((res) => {
      const noteJson = res.data;
      setNotes(noteJson);
    });
  }, []);

  const deleteHandler = async (id) => {
    await axios.delete(`http://localhost:3001/notes/${id}`)

    const newNotes = notes.filter(note => note.id !== id);
    setNotes(newNotes);
  };

  return (
    <Container>
      <Grid container spacing={3}>
        {notes.map((note) => (
          <Grid item key={note.id} xs={12} md={6} lg={4}>
            <NoteCard note={note} deleteHandler={deleteHandler}/>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Note;
