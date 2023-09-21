const db = require("../database/db");
const createError = require("../utils/createError");

const registerUser = async(req, res, next) => {
    try {
        const {username, password} = req.body;
        const result = await db.query("SELECT * FROM users WHERE username = ?", [username]);
        if(result[0].length > 0) return next(createError(400, "Username is already taken."));
        await db.query("INSERT INTO users (username, password) VALUES (?, ?)", [username, password]);
        res.status(201).send({message: "User is created."});
    }catch(err) {
        next(createError(500, "Internal server error"));
    };
};

const loginUser = async(req, res, next) => {
    try{
        const {username, password} = req.body;
        const result = await db.query("SELECT * FROM users WHERE username = ? AND password = ?", [username, password]);
        if(result[0].length === 0) return next(createError(400, "Username or password is wrong"));
        res.status(201).send({message: "Login is success."});
    }catch(err) {
        next(createError(500, "Internal server error"));
    };
};

const updateUser = async(req, res, next) => {
    try{
        const {username, newPassword} = req.body;
        const result = await db.query("SELECT * FROM users WHERE username = ?", [username]);
        if(result[0].length === 0) return next(createError(400, "User not found."));
        await db.query("UPDATE users SET password = ? WHERE username = ?", [newPassword, username]);
        res.status(200).send({message: "Update is success."});
    }catch(err) {
        next(createError(500, "Internal server error"));
    };
};

module.exports = {
    loginUser,
    registerUser,
    updateUser,
};