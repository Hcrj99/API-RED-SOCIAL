const connectionDB = require('./DB/ConnectionDB');//Connect with Data Base
const express = require('express');//Import express
const cors = require('cors');//Import cors

console.log("-----API NODE RED SOCIAL IS RUN------");
//*------CONNECT WITH BASE DATA------
connectionDB();

//*------CREATE NODE SERVER WITH EXPRESS-----
const app = express();
const serverPort = 3900;
//configure cors
app.use(cors());
//convert data of body to objects js
app.use(express.json());
app.use(express.urlencoded({extended: true}));//every data formurlcode convert in object js

//*-------MAIN ROUTES-------------
const version = 'v1';
const userRoute = require(`./${version}/Routes/user`);
const followRoute = require(`./${version}/Routes/follow`);
const publicationRoute = require(`./${version}/Routes/publication`);

app.use(`/api${version}` , userRoute);
app.use(`/api${version}` , followRoute);
app.use(`/api${version}` , publicationRoute);

//*-------RUN SERVER BACKEND-------
app.listen(serverPort, () => {
    console.log(`-> Red social API Server is RUN in port: ${serverPort}`);
})