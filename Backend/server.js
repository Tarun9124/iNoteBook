const express = require('express');
const dotenv = require('dotenv').config();
const connectDb = require('./config/dbConnection');
const cors = require('cors')

connectDb();

const app = express();

const port = process.env.PORT || 3000;


app.use(cors())
app.use(express.json());

app.use('/api/auth', require('./routes/authRoutes'))
app.use('/api/notes', require('./routes/notesRoutes'))

app.listen(port);