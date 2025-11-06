import { aj } from "../config/arcjet.js";
import { isSpoofedBot } from "@arcjet/inspect";

export const arcjetMiddleware = async (req, res, next) => {
  try {
    const decision = await aj.protect(req, { requested: 1 });

    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        res.status(429).json({ error: "Too Many Requests" });
        return;
      } else if (decision.reason.isBot()) {
        res.status(403).json({ error: "No bots allowed" });
        return;
      } else {
        res.status(403).json({ error: "Forbidden" });
        return;
      }
    }

    if (decision.ip.isHosting()) {
      // Requests from hosting IPs are likely from bots, so they can usually be
      // blocked. However, consider your use case - if this is an API endpoint
      // then hosting IPs might be legitimate.
      // https://docs.arcjet.com/blueprints/vpn-proxy-detection
      res.status(403).json({ error: "Forbidden" });
      return;
    }

    if (decision.results.some(isSpoofedBot)) {
      // Paid Arcjet accounts include additional verification checks using IP data.
      // Verification isn't always possible, so we recommend checking the decision
      // separately.
      // https://docs.arcjet.com/bot-protection/reference#bot-verification
      res.status(403).json({ error: "Forbidden" });
      return;
    }

    // Request is allowed, continue to next middleware
    next();
  } catch (error) {
    next(error);
  }
};
