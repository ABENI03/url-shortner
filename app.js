require('dotenv').config()
const express=require('express')
const bodyParser=require("body-parser")
const app=express()
// const port=process.env.PORT || 5000;
const mongoose=require("mongoose");
const UrlRoute = require('./Routes/urlRoutes');
  

mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    console.log("**--Database Connected--**")
})
  .catch(err=>{
      console.log(err)
  })
 
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json())
app.use(express.static(__dirname + '/Public'));
//  app.use(cors());


app.use('/api',UrlRoute)
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/Views/index.html')
  });
app.use('/*',(req,res)=>{
   
    res.sendFile(__dirname + '/Views/pageNotFound.html')
    // res.status(404).json({
    //     status:400,
    //     message:"Requested Route is Not Found"
    // })
})
const port=process.env.PORT
app.listen(port,()=>{
    console.log('Server is running ... on port ',port)

})