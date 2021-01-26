import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import useApi from '../../hooks/useApi'


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

export default function LiveCard(props) {
  const classes = useStyles();
  const [isDisabled, setIsDisabled] = useState(false);
  const [{ data, isLoading, isError }, setUrl] = useApi();


  useEffect(() => {
    if (props.id && props.shop) {
      setUrl(`/api/v1/products/${props.shop}/${props.id}`);
    }


  }, [props.id, props.shop])

  useEffect(() => {
    if (data != null) {
      props.setTotal(props.shop, data.price)
    }
  }, [data])

  if (isLoading) {
    return <div>Loading...</div>
  } else {

    return (
      <Card className={classes.root}>
        <CardActionArea className={classes.content}>
          <CardMedia
            className={classes.media}
            component="img"
            alt="Product image"
            image={data ? (data.img) : "https://images.unsplash.com/photo-1561715276-a2d087060f1d?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1050&q=80"}
            title="Product image"
          />
          <CardContent>
            <Typography gutterBottom variant="body1" component="h2">
              {data ? data.name : "select product to begin"}
            </Typography>
            <Typography variant="body1" color="textSecondary" component="p">
              {data ? data.volumeSize : ""}
            </Typography>
            <Typography variant="h4" component="h3">
              {data ? "$" + data.price : ""}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button disabled={isDisabled} href={props.href} variant="contained" color="primary" className={classes.button} onClick={() => { setIsDisabled(true) }}>
            Select Item
        </Button>
        </CardActions>
      </Card>
    );
  }
}