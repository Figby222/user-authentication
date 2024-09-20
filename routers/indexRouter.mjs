import { Router } from "express";
import * as indexController from "../controllers/indexController.mjs";

const indexRouter = Router();

indexRouter.get("/sign-up", indexController.signUpFormGet);

indexRouter.get("/", indexController.indexRouteGet);

export default indexRouter;