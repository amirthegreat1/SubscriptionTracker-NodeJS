import Subscription from "../models/subscription.model.js";

export const getAllSubscriptions = async (req, res, next) => {
  try {
    const subscriptions = await Subscription.find();
    res.status(200).json({
      success: true,
      message: "Subscriptions fetched successfully",
      data: subscriptions,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllSubscriptionsbyUserId = async (req, res, next) => {
  try {
    if (req.user.id !== req.params.id) {
      const error = new Error("you are not the owner of this subscription");
      error.statusCode = 403;
      throw error;
    }
    const subscriptions = await Subscription.find({ user: req.user._id });
    res.status(200).json({
      success: true,
      message: "Subscriptions fetched successfully",
      data: subscriptions,
    });
  } catch (error) {
    next(error);
  }
};

export const createSubscription = async (req, res, next) => {
  try {
    const subscription = await Subscription.create({
      ...req.body,
      user: req.user._id,
    });
    res.status(201).json({
      success: true,
      message: "Subscription created successfully",
      data: subscription,
    });
  } catch (error) {
    next(error);
  }
};

export const updateSubscription = async (req, res, next) => {
  try {
    const subscription = await Subscription.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: "Subscription updated successfully",
      data: subscription,
    });
  } catch (error) {
    next(error);
  }
};
export const deleteSubscription = async (req, res, next) => {
  try {
    const subscription = await Subscription.findByIdAndDelete(req.params.id);
    if (!subscription) {
      const error = new Error("Subscription not found");
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({
      success: true,
      message: "Subscription deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
export const cancelSubscription = async (req, res, next) => {
  try {
    const subscription = await Subscription.findByIdAndUpdate(
      req.params.id,
      { status: "cancelled" },
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: "Subscription cancelled successfully",
      data: subscription,
    });
  } catch (error) {
    next(error);
  }
};
export const getAllUpcomingRenewals = async (req, res, next) => {
  try {
    // Filter by user and only get active subscriptions with upcoming renewal dates
    const subscriptions = await Subscription.find({
      user: req.user._id,
      status: "active",
      renewalDate: { $gt: new Date() },
    }).sort({ renewalDate: 1 }); // Sort by renewal date (earliest first)

    res.status(200).json({
      success: true,
      message: "Upcoming renewals fetched successfully",
      data: subscriptions,
    });
  } catch (error) {
    next(error);
  }
};
