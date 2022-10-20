const mongoose=require('mongoose');
const shortid = require('shortid');

const url_schema=new mongoose.Schema({
    original_url:String,
    short_url:String
  })

const URL=new mongoose.model('URL',url_schema)


const isValidUrl = urlString=> {
    let url;
    try { 
          url =new URL(urlString); 
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
    createUrl:(req,callback)=>{
      
            var url=req.body.url
            var short=shortid.generate()
            if(!isValidUrl(url)){
             return callback({message:'invalid url'})
                 
            }
            else{
              try{
             let  findone=  url.findOne({original_url:url})
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
