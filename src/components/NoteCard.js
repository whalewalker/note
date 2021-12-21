import {
  Card,
  CardContent,
  CardHeader,
  IconButton,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { DeleteOutline, MoreVertRounded } from "@material-ui/icons";
import React from "react";

const useStyles = makeStyles({
  work: {
    border: (note) => {
      if (note.category === "work") {
        return "2px solid darkred";
      }
      if(note.category === "todos"){
              return "2px solid darkblue"
      }
      if(note.category === "reminders"){
              return "2px solid darkgreen"
      }
    },
  },
});

const NoteCard = ({ note, deleteHandler }) => {
  const classes = useStyles(note);

  return (
    <Card elevation={1} className={classes.work}>
      <CardHeader
        action={
          <IconButton
            aria-label="setting"
            onClick={() => deleteHandler(note.id)}
          >
            <DeleteOutline />
          </IconButton>
        }
        title={note.title}
        subheader={note.category}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary">
          {note.details}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default NoteCard;
