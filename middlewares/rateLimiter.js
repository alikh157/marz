import validationError from "../Exceptions/validationError";
import rateLimiting from "express-rate-limit";
export default rateLimiting({
    windowMs: 60 * 1000,
    max: 5, // limit each IP to 1 requests per windowMs
    handler: function (req, res, next) {
        console.log(req.rateLimit);
        req.rateLimit
            ? next(
                  new validationError(
                      "TooManyRequest",
                      "You try too many request, please try again later ",
                      43,
                      429,
                      "",
                      {
                          type: "many request .",
                      }
                  )
              )
            : next();
    },
});
