import { Router } from "express";
import { authorize } from "../middlewares/auth.middleware.js";
import {
  createSubscription,
  getAllSubscriptionsbyUserId,
  getAllSubscriptions,
  updateSubscription,
  deleteSubscription,
  cancelSubscription,
  getAllUpcomingRenewals,
} from "../controllers/subscription.controller.js";

const subscriptionRouter = Router();
// Define subscription routes
// GET all subscriptions
subscriptionRouter.get("/", authorize, getAllSubscriptions);
// GET all upcoming renewals (MUST be before /:id route to avoid route conflict)
subscriptionRouter.get("/upcoming", authorize, getAllUpcomingRenewals);
// GET subscription by subscription id
subscriptionRouter.get("/:id", authorize, createSubscription);
// POST create subscription
subscriptionRouter.post("/", authorize, createSubscription);
// PUT update subscription
subscriptionRouter.put("/:id", authorize, updateSubscription);
// DELETE delete subscription
subscriptionRouter.delete("/:id", authorize, deleteSubscription);
// GET all subscriptions by user id
subscriptionRouter.get("/user/:id", authorize, getAllSubscriptionsbyUserId);
// PUT cancel subscription
subscriptionRouter.put("/user/:id/cancel", authorize, cancelSubscription);

export default subscriptionRouter;
