const dotenv = require('dotenv')
dotenv.config();

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');


mongoose.connect('mongodb+srv://owen123:owen123@cluster1.xan5d.mongodb.net/userDB?retryWrites=true&w=majority', { useNewUrlParser: true });
const db = mongoose.connection
db.on('error',(error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))
 
//1st app use cors to set up our operations options
app.use(
    cors({
        origin: '*',
        methods: ["GET","POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
        credentials:  true
    })
)

//2nd app use json formitte
app.use(express.json())

app.use('/', require('./routes/users'))

// Serve static asserts if in production
if (process.env.NODE_ENV === "production") {
    //Set static folder
    app.use(express.static("client/build"));
  
    app.get("*", (req, res) => {
      res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
  }

  //we run Port 5000 locally 
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));