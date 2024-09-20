import pool from "../db/pool.mjs";

function indexRouteGet(req, res) {
    res.render("index", { title: "User Login Page" });
}

function signUpFormGet(req, res) {
    res.render("/sign-up-form")
}

async function signUpPost(req, res) {
    try {
        await pool.query("INSERT INTO users (username, password) VALUES ($1, $2)", [
            req.body.username,
            req.body.password
        ])

        res.redirect("/");
    } catch (err) {
        return next(err);
    }
}

export { indexRouteGet, signUpFormGet, signUpPost };