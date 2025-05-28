var mongoose= require('mongoose')

function dbase(){
    mongoose.connect("mongodb://localhost:27017/autolead")
    .then(()=>{
        console.log("connected successfully");})
    .catch(err=>{
        console.error(err)
        
    })
}

module.exports=dbase