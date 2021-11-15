
// ################################################################################
// Libraries requires

// const passwordHash = require('password-hash');

// ################################################################################
// Modules requires

const db = require("../modules/db");

// ################################################################################

const process = (req, res) => {

    // console.log(req.body.hashed);
    let query = {hashed: req.body.hashed};
    let projection = {_id: 1};  // _id only

    db.mdbRead(db.url, db.dbName, db.cLoggeds, query, projection, function(err, result) {
        if (err) {console.log(err.message);}
        else {
            // console.log(`Result length: ${result.length}`);
            let userId = "";
            if (result.length > 0) {userId = result[0]._id;}
            // console.log(`user id: ]${userId}[`);
            res.writeHead(200, {"Content-Type": "application/json"});
            res.end(JSON.stringify({"userdId": userId}));
        }
    });
}
exports.process = process;

// ################################################################################
