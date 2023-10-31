module.exports = (req, res, next)=>{
    if(req.cookies){
        console.log(req.cookies)
    }
}