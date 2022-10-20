const mongoose=require('mongoose');
const shortid = require('shortid');

const url_schema=new mongoose.Schema({
    original_url:String,
    short_url:String
  })

const URL=new mongoose.model('URL',url_schema)


const URLL = require("url").URL;

const isValidUrl = urlString=> {
  let url;
  try { 
        url =new URLL(urlString); 
    }
    catch(e){ 
      return false; 
    }
    return url.protocol === "http:" || url.protocol === "https:";
}
module.exports={
    getUrl:(data,callback)=>{
        try { 
            let url=data.params.url
            console.log(data.params)
            URL.findOne({short_url:url}).then((data)=>{
                    if(data){
                        return callback(null,data)
               
              } 
              else {
               return callback(err)
            
            }
            })
             
          
               }
            catch(err){
              console.log(err)
               res.status(500).json({ error: 'Server error..' });
            }
    },
    createUrl:async (req,callback)=>{
      
            var url=req.body.url
            var short=shortid.generate()
          
        
            if(!isValidUrl(url)){
             return callback({message:'invalid url'})
                 
            }
            else{
              try{
             let  findone= undefined;
            await URL.findOne({original_url:url}).then((data)=>{
              findone=data
             })
            
              if(findone){
                return callback(null,{
                    original_url:findone.original_url,
                    short_url:findone.short_url})
                
              }
              else{
                let findone=new URL({
                   original_url:url,
                   short_url:short
                })
                 findone.save()
                 return callback(null,{
                    original_url:findone.original_url,
                    short_url:findone.short_url})
              }
            }
            catch(err){
             return callback(err)
            }
            }
          }
    }
