const { check, validationResult } = require("express-validator");

module.exports = {
  checkLogin: [
    check("password")
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters")
      .bail()
      .withMessage(
        "Password must be at least 8 characters, has at least one big letter and special character"
      )
      .matches("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])")
  ],
  checkRegister: [
    check("mail")
      .normalizeEmail()
      .isEmail()
      .withMessage("You must provide email")
      .isLength({ max: 50 })
      .withMessage("Mail must be shorter than 50 characters"),
    //find is mail already in base
    //   .custom(mail => {}),
    check("password", "repeatPassword")
      .isLength({ min: 8, max: 100 })
      .withMessage("Password must be at least 8 characters")
      .bail()
      .withMessage(
        "Password must be at least 8 characters, has at least one big letter and special character"
      )
      .matches("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])")
      .bail()
      .custom((value, { req, loc, path }) => {
        if (value !== req.body.repeatPassword) {
          throw new Error("Passwords don't match");
        } else {
          return value;
        }
      })
      .withMessage("Passwords don't match"),
    check("username")
      .trim()
      .notEmpty()
      .isLength({ min: 3, max: 15 })
      .withMessage("Login must contain from 3 to 15 characters"),
    check("name")
      .isLength({ min: 2, max: 25 })
      .withMessage("Name must be at least 2 characters")
      .isAlpha()
      .withMessage("Name must contain only letters"),
    check("surname")
      .isLength({ min: 2, max: 50 })
      .withMessage("Surname must be at least 2 characters")
      .isAlpha()
      .withMessage("Surname must contain only letters"),
    check("birth_date")
      .isBefore(new Date(Date.now() - 1000 * 60 * 60 * 24 * 365 * 18).toString())
      .withMessage("You must be adult!")
  ]
};
