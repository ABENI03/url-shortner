const { Router } = require("express");
const { GetUrl, CreateUrl } = require("../Controllers/urlController");

const UrlRoute=Router()

UrlRoute.get('/shorturl/:url',GetUrl);

UrlRoute.post('/shorturl',CreateUrl);
UrlRoute.use('/*',(req,res)=>{
    res.status(404).json({
        status:400,
        message:"Requested Route is Not Found"
    })
})

module.exports=UrlRoute;