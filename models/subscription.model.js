import mongoose from "mongoose";
const subscriptionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlenght: 2,
      maxlenght: 20,
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price must be greater than 0"],
    },
    currency: {
      type: String,
      required: [true, "Currency is required"],
      enum: ["USD", "EUR", "GBP"],
      default: "USD",
    },
    frequency: {
      type: String,
      required: [true, "Frequency is required"],
      enum: ["daily", "Weekly", "Monthly", "Yearly"],
      default: "Monthly",
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      enum: ["Health", "Fitness", "Nutrition", "Wellness"],
    },
    PayementMethod: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ["active", "cancelled", "expired"],
      default: "active",
    },
    startDate: {
      type: Date,
      required: true,
      validate: {
        validator: function (value) {
          return value <= Date.now();
        },
        message: "Start date must be in the past",
      },
    },
    renewalDate: {
      type: Date,
      validator: {
        validator: function (value) {
          return value > this.startDate;
        },
        message: "Renewal date must be after the start date",
      },
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
  },
  { timestamp: true }
);
//Auto calculate renewal date
subscriptionSchema.pre("save", function (next) {
  if (!this.renewalDate) {
    const renewalperiods = {
      daily: 1,
      Weekly: 7,
      Monthly: 30,
      Yearly: 365,
    };
    this.renewalDate = new Date();
    this.renewalDate.setDate(
      this.renewalDate.getDate() + renewalperiods[this.frequency]
    );
  }
  // auto update status when renewal date is reached
  if (this.renewalDate <= new Date()) {
    this.status = "expired";
  }
  next();
});
const Subscription = mongoose.model("Subscription", subscriptionSchema);
export default Subscription;
