import express from "express";
const app = express();
import indexRouter from "./routers/indexRouter.mjs";
import "dotenv/config";
import path from "node:path";
import session from "express-session";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";

const __dirname = import.meta.dirname;

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(session({ secret: "cats", resave: false, saveUniitialized: false }));
app.use(passport.session());
app.use(express.urlencoded({ extended: true }));

app.use("/", indexRouter);

app.listen(process.env.PORT, () => {
    console.log(`Server listening on port ${process.env.PORT}`);
})