const express = require('express');
require('dotenv').config();
const connectDB = require('./config/db');
const cors = require('cors');
const pdfRoutes = require('../src/routes/pdfRoutes');
const errorMiddleware = require('./middleware/errorMiddleware');
const notFound = require('./middleware/notFound');

const app = express();

app.use(express.json());
app.use(cors({
    origin:process.env.CLIENT_URL, 
    methods: [ "POST","GET"],
    credentials: true,
  }));

connectDB();

app.use('/api/pdf', pdfRoutes);
app.use(notFound);
app.use(errorMiddleware);

const PORT = process.env.PORT || 3000;

app.listen(PORT,()=>{
    console.log(`Sever is running on port ${PORT}`);
});

module.exports = app; 