// const thing = "I'm a thing"

const thing = function(req, res, next){
    // req.thing = "testy string"
    // return "testy string"
    res.myData = {
        "key" : "testy string"
    }
    next()
}

module.exports = thing