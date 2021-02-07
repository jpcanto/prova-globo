import Router from "express";

import SessionController from "./controllers/SessionController";

const routes = new Router();

routes.get("/sessions", SessionController.list);
routes.put("/sessions/:user_id", SessionController.update);
routes.delete("/sessions/:user_id", SessionController.destroy);
routes.post("/sessions", SessionController.store);

export default routes;
