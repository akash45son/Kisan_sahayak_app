require("dotenv").config();
const express = require('express');//importing express module
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');//importing database connection module

dotenv.config();//reads the .env file and loads the variables 
connectDB();//connecting to the database
const app = express();//creating an express application

//middleware
app.use(cors());
app.use(express.json());//to parse incoming JSON requests

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/schemes", require("./routes/schemeRoutes"));
        //path           //use the routes defined in schemeRoutes.js
app.use("/api/chat", require("./routes/chatRoutes"));

//routes
app.get('/', (req, res) => {
    res.send('API is running...');
});


const PORT = process.env.PORT || 5000;//setting the port

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});//starting the server