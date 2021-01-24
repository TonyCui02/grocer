// importing modules
const express = require('express');
const cors = require('cors'); 
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000; // load env variables from .env into process.env

app.use(cors()); // only allow acess from same origin
app.use(express.json());


// setup MongoDB Atlas
const uri = process.env.ATLAS_URI;

mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true }
);
const connection = mongoose.connection;

connection.once('open', () => {
    console.log("Successfully connected to MongoDB Atlas");
})


// setup routes
const usersRouter = require('./routes/users');
const productsRouter = require('./routes/products');
const itemsRouter = require('./routes/items');

app.use('/api/v1/users', usersRouter);
app.use('/api/v1/products', productsRouter);
app.use('/api/v1/items', itemsRouter);


// server port ouput to console
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});