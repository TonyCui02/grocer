import styles from "./Card.module.css";
import { Link } from "react-router-dom";
import axios from "axios";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    width: "100%",
    height: "100%",
  },
  media: {
    // maxHeight: '100%',
    height: 100,
    width: '50%',
    margin: 'auto',
    objectFit: 'contain',
  },
  button: {
    width: "100%",
  },
});

export default function MediaCard() {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea className={classes.content}>
        <CardMedia
          className={classes.media}
          component="img"
          alt="Contemplative Reptile"
          image="https://a.fsimg.co.nz/product/retail/fan/image/200x200/5017010.png"
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="body1" component="h2">
            Natures fresh toast bread white
          </Typography>
          <Typography variant="body1" color="textSecondary" component="p">
            700g
          </Typography>
          <Typography variant="h4" component="h3">
            $2.80
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button variant="contained" color="primary" className={classes.button}>
          Select Item
        </Button>
      </CardActions>
    </Card>
  );
}

// export default function Card(props) {
//   return (
//     <div className={styles.card}>
//       <div className={styles.body}>
//         <img
//           alt="img"
//           src="https://a.fsimg.co.nz/product/retail/fan/image/200x200/5017010.png"
//         />
//         <div className={styles.text}>
//           <h5>Nature fresh toast bread</h5>
//           <p className={styles.size}>650g</p>
//           <p className={styles.pricePerUnit}>$2.80/1EA</p>
//           <h1 className={styles.price}>$2.80</h1>
//         </div>
//       </div>
//       <div className={styles.buttonWrapper}>
//           {props.children}
//       </div>
//     </div>
//   );
// }
