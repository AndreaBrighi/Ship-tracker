const express = require('express');

const app = express();
const port = 3000;

//first initialize mongoose connection to db
//second, start server on specified port
app.listen(port, () => console.log("Express server running on port " + port))

const loginRouter = require('./routes/login')
app.use('/login', loginRouter)

//
// __v è il traking interno di moongose per la versione del dato