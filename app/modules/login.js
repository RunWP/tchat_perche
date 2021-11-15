
// ################################################################################
// Libraries requires

const passwordHash = require('password-hash');

// ################################################################################
// Modules requires

const db = require("../modules/db");

// ################################################################################

const process = (req, res) => {

    // console.log(`User: ${req.body.username}`);
    // console.log(`Pswd: ${req.body.password}`);

    let query = {username: req.body.username};
    let projection = {_id: 1, password: 1};  // _id and password

    db.mdbRead(db.url, db.dbName, db.cUsers, query, projection, function(err, result) {
        if (err) {console.log(err.message);}
        else {

            // console.log(`Result length: ${result.length}`);
            // console.log(result);
            if (result.length <= 0) {
                res.redirect("/login/incorrectName");

            } else {
                if (result[0].password !== req.body.password) {
                    res.redirect("/login/incorrectPass");

                } else {
                    
                    let hashedId = passwordHash.generate(result[0]._id.toString());
                    // let id = result[0]._id.toString();
                    // console.log(`Id: ${id} - type: ${typeof(id)}`);
                    // console.log(`Hashed id: ${hashedId} - type: ${typeof(hashedId)}`);

                    let query = {_id: result[0]._id};

                    db.mdbDelete(db.url, db.dbName, db.cLoggeds, query, function(err, deletedCount) {
                        if (err) {console.log(err.message);}
                        else {

                            // console.log(`Deleted count: ${deletedCount}`);
                            null;

                        }
                    });

                    let data = {
                        _id: result[0]._id,
                        hashed: hashedId
                    }
                    // db.addLogged(json);
                    db.mdbCreate(db.url, db.dbName, db.cLoggeds, data, function(err, insertedId) {
                        if (err) {console.log(err.message);}
                        else {
                    
                            // console.log(`Inserted Id: ${insertedId}`);
                            null;
                    
                        }
                    });
                
                    res.redirect(`/login/${hashedId}`);

                }
            }
        }
    });
}
exports.process = process;

// ################################################################################
