const express = require('express');

const app = express();
const port = 3000;

//first initialize mongoose connection to db
//second, start server on specified port
app.listen(port, () => console.log("Express server running on port " + port))

const loginRouter = require('./routes/Login')
const shipRouter = require('./routes/Ship_handler')
//const routesRouter = require('./routes/Routes')
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  next();
});

app.use('/login', loginRouter)
app.use('/shipreq', shipRouter)
//app.use('/routereq', routesRouter)


//
// __v è il traking interno di moongose per la versione del dato