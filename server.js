const express = require("express");
const cors = require("cors")
const jwt = require("jsonwebtoken")

const app = express();

const port = process.env.PORT || 8000;

app.use(cors());

app.use(express.json())

function authenticateToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.USERFRONT_PUBLIC_KEY, (err, auth) => {
        if (err) return res.sendStatus(403);
        req.auth = auth;
        next()
    })
}


app.listen(port, () => {
    console.log("Now listening on http://localhost:" + port)
})