const connectionDB = require('./DB/ConnectionDB');//Conect with Data Base
const express = require('express');//Import express
const cors = require('cors');//Import cors

console.log("-----API NODE RED SOCIAL IS RUN------");

//Connect DB
connectionDB();
//Create Node Server
const app = express();
const serverPort = 3900;
//configure cors
app.use(cors());
//convert data of body to objects js
app.use(express.json());
app.use(express.urlencoded({extended: true}));//every data formurlcode convert in object js
//create routes
app.get('/test', (req, res) => {
    return res.status(200).json({
        'id':1,
        'nombre':'camilo'
    })
})

//server listen
app.listen(serverPort, () => {
    console.log(`-> Red social API Server is RUN in port: ${serverPort}`);
})