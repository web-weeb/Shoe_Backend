const express = require("express");
const authRouter = express.Router();
const authcontrollers = require("../controllers/auth-controller");
const { signupSchema, loginSchema } = require("../validators/auth-validator");
const valiadte = require("../middlewares/validate-middleware");


authRouter.route("/").get(authcontrollers.home);
authRouter
  .route("/register")
  .post(valiadte(signupSchema), authcontrollers.register);
authRouter.route("/login").post(valiadte(loginSchema), authcontrollers.login);


module.exports = authRouter;