
// ################################################################################
// Modules requires

const db = require("../modules/db");

// ################################################################################

const process = (req, res) => {

    // console.log(`Mail: ${req.body.email}`);
    // console.log(`User: ${req.body.username}`);
    // console.log(`Pswd: ${req.body.password}`);
    // console.log(`PwCk: ${req.body.pswdcheck}`);

    if (req.body.password !== req.body.pswdcheck) {
        res.redirect("/signin/notMatch");

    } else {
        let query = {username: req.body.username};

        db.mdbCount(db.url, db.dbName, db.cUsers, query, function(err, count) {
            if (err) {console.log(err.message);}
            else {
                // console.log(`Records count: ${count}`);
                if (count > 0) {
                    res.redirect("/signin/alreadyExists");
    
                } else {
                    let data = {
                        mail: req.body.email,
                        username: req.body.username,
                        password: req.body.password,
                        avatar: "/assets/defaultAvatar.png"
                    };
 
                    db.mdbCreate(db.url, db.dbName, db.cUsers, data, function(err, insertedId) {
                        if (err) {console.log(err.message);}
                        else {
                    
                            // console.log(`Inserted Id: ${insertedId}`);
                            res.redirect("/signin/success");
                    
                        }
                    });
                }
            }
        });
    }
}
exports.process = process;

// ################################################################################
