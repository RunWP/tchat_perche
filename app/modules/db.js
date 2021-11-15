
// ################################################################################
// Libraries requires

let fs = require('fs');
const MongoClient = require('mongodb').MongoClient;

// ################################################################################
// Global constants

const url = "mongodb://tchatperche:tp_pswd@mongodb:27017/";
exports.url = url;

const dbName = "db_tchatperche";
exports.dbName = dbName;

const cUsers = "c_users";
exports.cUsers = cUsers;

const cLoggeds = "c_loggeds";
exports.cLoggeds = cLoggeds;

const loggedFile = "loggedUsers.txt";
// const loggedFile = "styles/loggedUsers.txt";
exports.loggedFile = loggedFile;

// ################################################################################
// Global variables

// let query;
// let projection;
// let data;

// ################################################################################
// Functions

const mdbCount = (url, dbName, cName, query, callback) => {
    MongoClient.connect(url, function(error, db) {
        if(error) {callback(error);}
        else {
            let dbo = db.db(dbName);
            dbo.collection(cName).count(query, function(error, count) {
                if(error) {callback(error);}
                else {
                    db.close();
                    callback(null, count);
                }
            });
        }
    }); 
}
exports.mdbCount = mdbCount;

// ################################################################################

const mdbRead = (url, dbName, cName, query, projection, callback) => {
    MongoClient.connect(url, function(error, db) {
        if(error) {callback(error);}
        else {
            let dbo = db.db(dbName);
            dbo.collection(cName).find(query, {projection: projection}).toArray(function(error, result) {
                if(error) {callback(error);}
                else {
                    db.close();
                    callback(null, result);
                }

            });
        }
    }); 
}
exports.mdbRead = mdbRead;

// ################################################################################

const mdbCreate = (url, dbName, cName, data, callback) => {
    MongoClient.connect(url, function(error, db) {
        if(error) {callback(error);}
        else {
            let dbo = db.db(dbName);
            dbo.collection(cName).insertOne(data, function(error, result) {
                if(error) {callback(error);}
                else {
                    db.close();
                    callback(null, result.insertedId);
                }
            });
        }
    }); 
}
exports.mdbCreate = mdbCreate;

// ################################################################################

const mdbUpdate = (url, dbName, cName, query, data, callback) => {
    MongoClient.connect(url, function(error, db) {
        if(error) {callback(error);}
        else {
            let dbo = db.db(dbName);
            dbo.collection(cName).updateOne(query, {$set: data}, function(error, result) {
                if(error) {callback(error);}
                else {
                    db.close();
                    callback(null, result.modifiedCount);
                }
            });
        }
    }); 
}
exports.mdbUpdate = mdbUpdate;

// ################################################################################

const mdbDelete = (url, dbName, cName, query, callback) => {
    MongoClient.connect(url, function(error, db) {
        if(error) {callback(error);}
        else {
            let dbo = db.db(dbName);
            dbo.collection(cName).deleteMany(query, function(error, result) {
                if(error) {callback(error);}
                else {
                    db.close();
                    callback(null, result.deletedCount);
                }
            });
        }
    }); 
}
exports.mdbDelete = mdbDelete;

// ################################################################################

const loadJsonArray = (file) => { 
    let res;
    try {res = JSON.parse(fs.readFileSync(file));}
    catch (_err) {res = [];}
    return res;
}
exports.loadJsonArray = loadJsonArray;

// ################################################################################

const saveJsonArray = (file, data) => {
    let res;
    try {
        fs.writeFileSync(file, JSON.stringify(data));
        res = true;
    }
    catch (_err) {res = false;}
    return res;
}
exports.saveJsonArray = saveJsonArray;

// ################################################################################

const addLogged = (json) => { 
    let logged = loadJsonArray(`./res/${loggedFile}`);
    logged.push(json);
    let saved = saveJsonArray(`./res/${loggedFile}`, logged)
    return saved;
}
exports.addLogged = addLogged;

// ################################################################################

const delLogged = (id) => {
    let logged = loadJsonArray(`./res/${loggedFile}`);
    let fnd = logged.findIndex(elm => elm.id === id);
    if (fnd >= 0) {logged.splice(fnd, 1);}
    let saved = saveJsonArray(`./res/${loggedFile}`, logged)
    return saved;
}
exports.delLogged = delLogged;

// ################################################################################
const getLogged = (hashedId) => {
    res = "";
    let logged = loadJsonArray(`./res/${loggedFile}`);
    let fnd = logged.findIndex(elm => elm.hashedId === hashedId);
    if (fnd >= 0) {res = logged[fnd].id;}
    return res;
}
exports.getLogged = getLogged;

// ################################################################################
// Usages

// query = {prenom: /^D|d$/};
// projection = {_id: 0, nom: 1, prenom: 1};  // nom, prenom only
// // projection = {_id: 1, nom: 1, prenom: 1};  // _id , nom, prenom
// // projection = {_id: 1};  // _id only
// // projection = {};  // All

// // ------------------------------------------------------------

// mdbCount(url, dbName, cName, query, function(err, count) {
//     if (err) {console.log(err.message);}
//     else {

//         console.log(`Records count: ${count}`);

//     }
// });

// mdbRead(url, dbName, cName, query, projection, function(err, result) {
//     if (err) {console.log(err.message);}
//     else {

//         console.table(result);
//         console.log("");

//     }
// });

// // --------------------------------------------------------------------------------
// data = {prenom: "Run"};
// // ------------------------------------------------------------

// mdbCreate(url, dbName, cName, data, function(err, insertedId) {
//     if (err) {console.log(err.message);}
//     else {

//         console.log(`Inserted Id: ${insertedId}`);

//     }
// });

// // --------------------------------------------------------------------------------
// query = {prenom: "Run"};
// data = {nom: "Will"};
// // ------------------------------------------------------------

// mdbUpdate(url, dbName, cName, query, data, function(err, modifiedCount) {
//     if (err) {console.log(err.message);}
//     else {

//         console.log(`Modified count: ${modifiedCount}`);

//     }
// });

// // --------------------------------------------------------------------------------
// query = {prenom: "Run"};
// // ------------------------------------------------------------

// mdbDelete(url, dbName, cName, query, function(err, deletedCount) {
//     if (err) {console.log(err.message);}
//     else {

//         console.log(`Deleted count: ${deletedCount}`);

//     }
// });

// ################################################################################
