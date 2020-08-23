// const thing = "I'm a thing"

// const thing = function(req, res, next){
//     // req.thing = "testy string"
//     // return "testy string"
//     res.myData = {
//         "key" : "testy string"
//     }
//     next()
// }

const test = function (){
    return {"Key" : "test function in thing.js reached"}
    // return "test function in thing.js reached"
}

const thing = {
    "Key" : "Value"
}

module.exports = test