import express from "express";
const app = express();
import indexRouter from "./routers/indexRouter.mjs";
import "dotenv/config";
import path from "node:path";
import session from "express-session";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import pool from "./db/pool.mjs";

const __dirname = import.meta.dirname;

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(session({ secret: "cats", resave: false, saveUniitialized: false }));
app.use(passport.session());
app.use(express.urlencoded({ extended: true }));

passport.use(
    new LocalStrategy(async (username, password, done) => {
        try{
            const { rows } = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
            const user = rows[0];

            if (!user) {
                return done(null, false, { message: "Incorrect username" });
            }
            if (user.password !== password) {
                return done(null, false, { message: "Incorrect password" });
            }
            return done(null, user);
        } catch (err) {
            return done(err);
        }
    })
)

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [id])
        const user = rows[0];
    
        done(null, user);
    } catch(err) {
        done(err);
    }
})

function indexRouteGet(req, res) {
    res.render("index", { title: "User Login Page" });
}

function signUpFormGet(req, res) {
    res.render("sign-up-form")
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

app.get("/sign-up", signUpFormGet);

app.get("/", indexRouteGet);

app.post("/sign-up", signUpPost);

app.post("/log-in", passport.authenticate("local", { successRedirect: "/", failureRedirect: "/" }));

app.use("/", indexRouter);

app.listen(process.env.PORT, () => {
    console.log(`Server listening on port ${process.env.PORT}`);
})