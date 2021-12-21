import React, { useState } from "react";
import {
  Button,
  Container,
  makeStyles,
  Typography,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  FormControl,
} from "@material-ui/core";
import {SendOutlined } from "@material-ui/icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const useStyles = makeStyles({
  field: {
    marginTop: "20px",
    marginBottom: "20px",
    display: "block",
  },
});
const Create = () => {
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [titleError, setTitleError] = useState(false);
  const [detailsError, setDetailsError] = useState(false);
  const [category, setCategory] = useState("todos");
  const navigate = useNavigate();

  const categoryHandler = (e) => {
    setCategory(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setDetailsError(false);
    setTitleError(false);

    if (title == "") {
      setTitleError(true);
    }
    if (details == "") {
      setDetailsError(true);
    }

    if (title && details) {
      axios.post("http://localhost:3001/notes",
       {title, details, category}).then(navigate("/"))
    }
  };

  const classes = useStyles();
  return (
    <Container>
      <Typography
        variant="h6"
        component="h2"
        gutterBottom
        color="textSecondary"
      >
        Create a New Note
      </Typography>
      <form noValidate autoComplete="off" onSubmit={submitHandler}>
        <TextField
          className={classes.field}
          onChange={(e) => setTitle(e.target.value)}
          label="Note Title"
          variant="outlined"
          color="secondary"
          fullWidth
          required
          error={titleError}
        />
        <TextField
          className={classes.field}
          onChange={(e) => setDetails(e.target.value)}
          label="Details"
          variant="outlined"
          color="secondary"
          multiline
          rows={4}
          fullWidth
          required
          error={detailsError}
        />

        <FormControl className={classes.field}>
        <FormLabel color="secondary">Note Category</FormLabel>
        <RadioGroup value={category} onChange={categoryHandler}>
    
          <FormControlLabel value="todos" control={<Radio />} label="Todos" />

          <FormControlLabel
            value="reminders"
            control={<Radio />}
            label="Reminders"
          />

          <FormControlLabel value="work" control={<Radio />} label="Work" />
        </RadioGroup>

        </FormControl>
       
        <Button
          type="submit"
          color="secondary"
          variant="contained"
          disableElevation
          endIcon={<SendOutlined />}
        >
          Submit
        </Button>
      </form>
    </Container>
  );
};

export default Create;

