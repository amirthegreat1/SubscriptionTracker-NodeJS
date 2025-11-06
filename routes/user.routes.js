import { Router } from "express";
import { getAllUsers, getUser } from "../controllers/user.controller.js";
import { authorize } from "../middlewares/auth.middleware.js";
const userRouter = Router();
// Define user routes
userRouter.get("/", getAllUsers);

userRouter.get("/:id", authorize, getUser);

userRouter.post("/", (req, res) => res.send({ title: "Create new user" }));

userRouter.put("/:id", (req, res) =>
  res.send({ title: `Update user with ID ${req.params.id}` })
);

userRouter.delete("/:id", (req, res) =>
  res.send({ title: `Delete user with ID ${req.params.id}` })
);
export default userRouter;
