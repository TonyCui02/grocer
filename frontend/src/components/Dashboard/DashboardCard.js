import styles from "./DashboardCard.module.css";
import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
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
}));

// export default function DashboardCard(props) {
//   return (
//     <div className={styles.wrapper}>
//       <div className={styles.items}>{props.children}</div>
//     </div>
//   );
// }

export default function DashboardCard(props) {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <Card className={classes.root}>
      <CardContent className={classes.main}>
        <form className={classes.form} noValidate autoComplete="off">
          <TextField className={classes.input} id="outlined-basic" label="Name of item eg.Milk" variant="filled" />
        </form>
        <div className={classes.content}>{props.children}</div>
      </CardContent>
    </Card>
  );
}
