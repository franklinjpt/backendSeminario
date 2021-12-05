require('dotenv').config();
require('./config/db');
const express = require('express')
const authRoutes = require('./routes/auth.routes');
const app = express()
const port = 3000;


app.use(express.json());
app.use(express.urlencoded({extended: false}));

// app.use('/api/products',productsRoutes);
// app.use('/api/auth', authRoutes);
app.use('/api/auth', authRoutes);

app.listen(port, () => console.log(`Example app listening on port ${port}!`))