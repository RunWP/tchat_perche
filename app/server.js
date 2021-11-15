
//@ npm install cors
//@ npm install dotenv
//@ npm install express
//@ npm install formidable
//@ npm install mongodb
//@ npm install password-hash
//@ npm install socket.io
//* npm install cors dotenv express formidable mongodb password-hash socket.io

// ################################################################################
// Libraries requires

const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

// ################################################################################
// Modules requires

const signin = require("./modules/signin");
const login = require("./modules/login");
const db = require("./modules/db");
const auth = require("./modules/auth");
const lobby = require("./modules/lobby");


// ################################################################################
// Global constants

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = 8080;

// ################################################################################
// Global variables

// ################################################################################
// Main

app.use('/favicon.ico', express.static('assets/favicon.ico'));

// app.use(express.json());  // to support JSON-encoded bodies
app.use(express.urlencoded({ extended: true }));  // to support URL-encoded bodies

app.use(express.static("styles"));

app.set("views", "./views");
app.set("view engine", "pug");

// ------------------------------------------------------------

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/html/logIn.html");
});

app.get("/login/:status", (req, res) => {
    res.sendFile(__dirname + "/html/logIn.html");
});

app.post("/checklogin", function(reqt, resp) {
    login.process(reqt, resp);
});

// ------------------------------------------------------------

app.get("/signin", (req, res) => {
    res.sendFile(__dirname + "/html/signIn.html");
});

app.get("/signin/:status", (req, res) => {
    res.sendFile(__dirname + "/html/signIn.html");
});

app.post("/checksignin", function(reqt, resp) {
    signin.process(reqt, resp);
});

// ------------------------------------------------------------

app.get("/lobby/:auth", function(req, res) {
    lobby.process(req, res, __dirname + "/html/lobby.html");
});

// ------------------------------------------------------------
// API /auth
app.post("/auth", function(req, res) {
    auth.process(req, res);
});

// ------------------------------------------------------------

io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);
    // socket.broadcast.emit("hi","new client connected !");  // To all users (Emitter excluded)
    // io.emit("hi", "Client connected !");  // To all users (Emitter included)
    socket.emit("hi", "Client connected !");  // To emitter only

    socket.on("chat message", (msg) => {
        console.log(`Message from ${socket.id}: ${msg}`);
        // io.emit("chat message", msg);  // To all users (Emitter included)
        socket.broadcast.emit("chat message", msg);  // To all users (Emitter excluded)
        // socket.emit("chat message", msg);  // To emitter only
        // io.to(socket.id).emit("hi", msg);  // To individual socketid (private message)
    });

    socket.on("disconnect", () => {
        console.log(`User disconnected: ${socket.id}`);
    });
    
});

// ------------------------------------------------------------

server.listen(PORT, () => {
    console.log(`Server listening on: http://localhost:${PORT}`);
});

// ################################################################################
