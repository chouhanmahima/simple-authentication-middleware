const express = require("express");
const fs = require("node:fs");
const PORT = 4040;
const app = express();

const userData = []; // it will store the user data

// Middleware Function to verify User
function authenticationMiddleware(req, res, next) {
    const userExist = userData.find(elem => req.body.email === elem.email && req.body.password === elem.password);
    if(userExist){
        fs.appendFileSync("logger.log", `Request-URL : ${req.url}. User-Name : ${req.body.name}. Date and Time : ${new Date()} \n`)
        next();
    } 
    else{
        res.status(404).json({
            success: false,
            error: "INVALID CREDENTIALS (Middleware error)"
        });
    }
}

app.use(express.json()); // It will allow req.body to have data in it

// Sign-up (POST)
app.post("/signup", (req, res) => {
    userData.push(req.body);
    // console.log(userData)
    res.status(201).json({
        success : true,
        message : "Sign-up Successfully completed !",
    })
});

app.use(authenticationMiddleware);

// User Sign-in (GET)
app.get("/signin", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Sign-in Successfully completed !"
    });
});

// Undefined path handle
app.use("/*", (req, res) => {
    res.status(404).json({
        success: false,
        error: "Path Not Found"
    });
});


app.listen(PORT, () => {
    console.log(`Server is Running at port ${PORT}`);
});