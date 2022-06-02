module.exports = (err,req,res,next) => {
   
    console.log('Error')
    console.log(err)

    return res.status(500).json({message : "Error"})
}