const errorHandler  = (err, req, res, next) =>{
    res.json({method: req.method, error: err.message})
    console.log(`/${req.method} - ${err.message}`)
}

module.exports = errorHandler