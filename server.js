const express = require('express');
const connectDB = require("./config/bd");
// const session = require('express-session');
require("dotenv").config();
var cors = require('cors');
const bodyParser = require('body-parser');
// connexion à la DB
connectDB();
const app = express();
// app.use(session({
//     secret: process.env.SESSION_SECRET_KEY,
//     resave: false,
//     saveUninitialized: true
// }));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
const swaggerUi = require('swagger-ui-express');
const swaggerAutogen = require('swagger-autogen');

const outputFile = './swagger_output.json'
swaggerAutogen(outputFile, ['./routes/user.routes', './routes/tasks.routes'])

app.use(cors());
const userRoutes = require('./routes/user.routes');
app.use("/user", userRoutes)
app.use("/", require("./routes/tasks.routes"));
app.listen(8000, () => {
    console.log(`Le serveur est en écoute sur le port 8000`);

});
