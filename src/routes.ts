import { Router } from "express";
import { UserController } from "./Controllers/UserController";
import { LoginController } from "./Controllers/LoginController";
import { TasksController } from "./Controllers/TasksController";
import { authMiddleware } from "./middlewares/authMiddleware";

const routes = Router();

routes.post("/user", new UserController().create);
routes.post("/login", new LoginController().create);

routes.use(authMiddleware);

routes.post("/task", new TasksController().create);
routes.put("/task/:id", new TasksController().update);
routes.get("/task", new TasksController().get);
routes.get("/task/:id", new TasksController().getById);
routes.delete("/task/:id", new TasksController().delete);

export default routes;
