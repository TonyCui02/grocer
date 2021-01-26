import React, { useState, useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";

import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  root: {
    height: "auto",
    backgroundColor: "var(--bg-grey)",
  },
  content: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gridGap: "1rem",
  },
  form: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",

    },
  },
  top: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  delete: {
    height: '60px',
  },
}));


export default function DashboardCard(props) {
  const classes = useStyles();
  const [isDelete, setIsDelete] = useState(false)
  const [name, setName] = useState(props.data.name);

  function handleDelete() {
    axios.delete(`/api/v1/items/${props.data._id}`);
  }

  function handleChange(event) {
    setName(event.target.value);
  }

  useEffect(() => {

    const updateName = async () => {
      await axios.put(`/api/v1/items/${props.data._id}`, {
        'name': name
      })
    };
    updateName();

  }, [name])

  return (
    <Card className={classes.root}>
      <CardContent className={classes.main}>
        <div className={classes.top}>
          <form className={classes.form} noValidate autoComplete="off">
            <TextField className={classes.input} id="outlined-basic" label="Name of item eg.Milk" variant="filled" value={name} onChange={handleChange} />
          </form>
          <Button href='/' disabled={isDelete} variant="contained" color="secondary" className={classes.delete} onClick={() => { handleDelete(); setIsDelete(true) }}>
            Delete
          </Button>
        </div>
        <div className={classes.content}>{props.children}</div>
      </CardContent>
    </Card>
  );
}
