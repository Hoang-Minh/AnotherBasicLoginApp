var db = require("../models");
var bcrypt = require("bcrypt-nodejs");

module.exports = function(sequelize, DataTypes){
    var User = sequelize.define("User", {
        username: DataTypes.STRING,
        email: DataTypes.STRING
    });

    return User;
}

function encrypt(password){
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
}

// module.exports.getUserByEmail = function(email, callback){
//     db.User.findOne({
//         where:{
//             email: email
//         }
//     }, callback);
// }