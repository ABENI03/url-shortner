const { getUrl, createUrl } = require("../Models/urlModel")


module.exports={
    GetUrl:(req, res)=>{
        getUrl(req,(err,data)=>{
            if(err){
                return res.status(404)
                        .json({
                            status:404,
                            message:"No URL found"
                        })
            }
            else{
                return res.redirect(data.original_url)
            }
        })
       
     },
     CreateUrl:(req,res)=>{
        createUrl(req,(err,data)=>{
            if(err){
                return res.status(404)
                        .json({
                            status:404,
                            message:err.message
                        })
            }
            else{
                return res.json({
                            status:200,
                            message:"Success",
                            data:data
                        })
            }
        })
     }
}
