import { Router } from "express";
const subscriptionRouter = Router();
// Define subscription routes
subscriptionRouter.get("/", (req, res) =>
  res.send({ title: "GET all subscriptions" })
);
subscriptionRouter.get("/:id", (req, res) =>
  res.send({ title: `GET subscription with ID ${req.params.id}` })
);
subscriptionRouter.post("/", (req, res) =>
  res.send({ title: "Create new subscription" })
);
subscriptionRouter.put("/:id", (req, res) =>
  res.send({ title: `Update subscription with ID ${req.params.id}` })
);
subscriptionRouter.delete("/:id", (req, res) =>
  res.send({ title: `Delete subscription with ID ${req.params.id}` })
);
subscriptionRouter.get("/user/:id", (req, res) =>
  res.send({ title: `GET subscriptions for user with ID ${req.params.userId}` })
);
subscriptionRouter.put("/user/:id/cancel", (req, res) =>
  res.send({
    title: `Cancel subscription for user with ID ${req.params.userId}`,
  })
);
subscriptionRouter.get("/all-upcoming-renewals"),
  (req, res) => res.send({ title: "GET all subscriptions" });

export default subscriptionRouter;
