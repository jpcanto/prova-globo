import Router from "express";

import SessionController from "./controllers/SessionController";
import ChallengeController from "./controllers/ChallengeController";

const routes = new Router();

routes.get("/sessions", SessionController.list);
routes.put("/sessions/:user_id", SessionController.update);
routes.delete("/sessions/:user_id", SessionController.destroy);
routes.post("/sessions", SessionController.store);

routes.get("/challenge/:string", ChallengeController.two);

export default routes;
