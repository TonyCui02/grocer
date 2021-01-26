import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import axios from "axios";


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

export default function MediaCard(props) {
  const classes = useStyles();
  const [isDisabled, setIsDisabled] = useState(false);

  function changeProduct() {

    const urlParams = new URLSearchParams(window.location.search);
    const shop = urlParams.get('shop');
    const id = urlParams.get('id');

    const fetch = async () => {
      console.log(props.id)
      if (shop == "count") {
        await axios.put(`/api/v1/items/${id}`, {
          count_id: `${props.id}`
        })
      } else {
        await axios.put(`/api/v1/items/${id}`, {
          pak_id: `${props.id}`
        })
      }
    }

    fetch();
  }

  function capitalize(words) {
    var separateWord = words.toLowerCase().split(' ');
    for (var i = 0; i < separateWord.length; i++) {
       separateWord[i] = separateWord[i].charAt(0).toUpperCase() +
       separateWord[i].substring(1);
    }
    return separateWord.join(' ');
 }



  return (
    <Card className={classes.root}>
      <CardActionArea className={classes.content}>
        <CardMedia
          className={classes.media}
          component="img"
          alt="Product image"
          image={props.img}
          title="Product image"
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="h2">
            {capitalize(props.name)}
          </Typography>
          <Typography variant="body1" color="textSecondary" component="p">
            {props.volumeSize}
          </Typography>
          <Typography variant="h4" component="h3">
            ${props.price}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button disabled={isDisabled} href={props.href} variant="contained" color="primary" className={classes.button} onClick={() => { setIsDisabled(true); changeProduct(); }}>
          Select Item
        </Button>
      </CardActions>
    </Card>
  );
}