const db = require("../database/db");
const createError = require("../utils/createError");

const getTodo = async(req, res, next) => {
    try {
        const {title, userId} = req.body;
        if(title !== undefined && userId !== undefined){
            const result = await db.query("SELECT * FROM todos WHERE title = ? AND user_id = ?", [title, userId]);
            return res.status(200).send(result[0]);
        }
        if(title !== undefined){
            const result = await db.query("SELECT * FROM todos WHERE title = ?", [title]);
            return res.status(200).send(result[0]);
        }
        if(userId !== undefined){
            const result = await db.query("SELECT * FROM todos WHERE user_id = ?", [userId]);
            return res.status(200).send(result[0]);
        }
        const result = await db.query("SELECT * FROM todos");
        res.status(200).send(result[0]);
    }catch(err) {
        next(createError(500, "Internal server error"));
    };
};

const createTodo = async(req, res, next) => {
    try {
        const {title, completed, userId} = req.body;
        await db.query("INSERT INTO todos (title, completed, user_id) VALUES (?, ?, ?)", [title, completed, userId]);
        res.status(201).send({message: "Create Todo is success."});
    }catch(err) {
        next(createError(500, "Internal server error"));
    };
};

const updateTodo = async(req, res, next) => {
    try {
        const id = req.params.id; 
        const {title, completed} = req.body; 
        const result = await db.query("SELECT * FROM todos WHERE id = ?", [id]);
        if(result[0].length === 0) return next(createError(400, "Todo with id not found."));
        await db.query("UPDATE todos SET title = ?, completed = ? WHERE id = ?", [title, completed, id]);
        res.status(200).send({message: "Update Todo is success."});
    }catch(err) {
        next(createError(500, "Internal server error"));
    };
};

const deleteTodo = async(req, res, next) => {
    try {
        const id = req.params.id;
        const result = await db.query("SELECT * FROM todos WHERE id = ?", [id]);
        if(result[0].length === 0) return next(createError(400, "Todo with id not found."));
        await db.query("DELETE FROM todos WHERE id = ?", [id]);
        res.status(200).send({message: "Delete Todo is success."});
    }catch(err) {
        next(createError(500, "Internal server error"));
    };
};

module.exports = {
    getTodo,
    createTodo,
    updateTodo,
    deleteTodo,
};