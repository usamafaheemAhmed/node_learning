
const Express = require('express');
var cors = require('cors');
// var helmet = require('helmet');

const userData = require('./models/usama_Model');


const App = Express();


App.use(Express.json());
App.use(cors());
// App.use(helmet());

const Mongoose = require("mongoose");
const url = "mongodb://127.0.0.1/FirstDb";

Mongoose.connect(url, { useNewUrlParser: true });
const Mongo = Mongoose.connection;

Mongo.on("open", () => {
  console.log("MongoDB Connected!");
});


App.get('/', (req, res) => {
  res.send('Hello, This is React Backend!');
});


const ClientPath = require("./Routes/Usama");
App.use("/Client", ClientPath);


// App.post('/jumped', async (req, res) => {
     // res.send('usama jumped');
     // console.log(req.body)

//     try {
//         const user = await userData.create(req.body);
//         res.status(200).json(user)
//     } catch (error) {
//         console.log(error.massage);
//         res.status(500).json({massage: error.massage});
//     }
//   });
  
//   App.get('/jump-get', async (req, res) => {

//     try {
//         const user = await userData.find({}) ;
//         res.status(200).json(user)

//     } catch (error) {
//         console.log(error.massage);
//         res.status(500).json({massage: error.massage});
//     }


//   });


const port = process.env.PORT || 7000;
App.listen(port, () => {
  console.log("Server Running on port:",port);
});
