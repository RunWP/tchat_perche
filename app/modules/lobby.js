
// ################################################################################
// Libraries requires

const passwordHash = require('password-hash');

// ################################################################################
// Modules requires

const db = require("../modules/db");

// ################################################################################

const process = (req, res, rect) => {

    // console.log(`Hash id: ${req.params.auth}`);

    let query = {hashed: req.params.auth};
    let projection = {_id: 1};  // _id only

    // db.mdbCount(db.url, db.dbName, db.cLoggeds, query, function(err, count) {
    db.mdbRead(db.url, db.dbName, db.cLoggeds, query, projection, function(err, result) {
        if (err) {console.log(err.message);}
        else {
            // console.log(`Result length: ${result.length}`);
            // console.log(`Result id: ${result._id}`);
            // console.table(result);
            // console.log(result);

            // if (count > 0) {
            if (result.length > 0) {
                // res.sendFile(__dirname + "/html/lobby.html");
                res.sendFile(rect);

            } else {
                res.redirect("/");

            }
        }
    });
}
exports.process = process;

// ################################################################################
// res.render("index", {title: "myTitle", message: "In the bottle", mylink: "google.com"});
// sha1$d5616ccd$1$8364d0541af12b8ac571411c6cc5c51624a464bd
// console.log(`Auth: ${req.params.auth}`);
// let userId = db.getLogged(req.params.auth);
// if (userId) {
//     res.sendFile(__dirname + "/html/lobby.html");
// } else {
//     res.redirect("/");
// }
