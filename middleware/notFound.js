module.exports = (req, res) => {
    res.status(400).send({message: "resource not found."});
};