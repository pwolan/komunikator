const { check, validationResult } = require("express-validator");
const User = require("../model/user");

module.exports = {
  checkLogin: [
    check("username")
      .notEmpty()
      .withMessage("Provide a username")
      .custom(async (value, { req, res }) => {
        const { username, password } = req.body;
        let { succes } = await User.promiseLogin(username, password);
        if (succes) {
          return value;
        } else {
          throw new Error("Invalid username or password");
        }
      }),
    check("password")
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters")
      .bail()
      .withMessage(
        "Password must be at least 8 characters, has at least one big letter and special character"
      )
      .matches("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])"),
  ],
  checkRegister: [
    check("mail", "cos")
      .normalizeEmail()
      .isEmail()
      .withMessage("You must provide email")
      .isLength({ max: 50 })
      .withMessage("Mail must be shorter than 50 characters")
      .bail()
      .custom(async (value, { req, res, next }) => {
        if (await User.isMailExist(value)) {
          throw new Error("Mail already exist");
        } else {
          return value;
        }
      }),
    check("password")
      .isLength({ min: 8, max: 100 })
      .withMessage("Password must be at least 8 characters")
      .matches("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])")
      .withMessage(
        "Password must be at least 8 characters, has at least one big letter and special character"
      ),
    check("repeatPassword")
      .isLength({ min: 8, max: 100 })
      .withMessage("Password must be at least 8 characters")
      .matches("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])")
      .withMessage(
        "Password must be at least 8 characters, has at least one big letter and special character"
      )
      .bail()
      .custom((value, { req, loc, path }) => {
        if (value !== req.body.repeatPassword) {
          throw new Error("Passwords don't match");
        } else {
          return value;
        }
      }),
    check("username")
      .trim()
      .notEmpty()
      .isLength({ min: 3, max: 15 })
      .withMessage("Login must contain from 3 to 15 characters"),
    check("name")
      .isLength({ min: 2, max: 25 })
      .withMessage("Name must be at least 2 characters")
      // .matches(/^[A-Za-z-zżźćńółęąśŻŹĆĄŚĘŁÓŃ]+$/)
      .isAlpha("pl-PL")
      .withMessage("Name must contain only letters"),
    check("surname")
      .isLength({ min: 2, max: 50 })
      .withMessage("Surname must be at least 2 characters")
      .isAlpha("pl-PL")
      .withMessage("Surname must contain only letters"),
    check("birth_date")
      .isBefore(new Date(Date.now() - 1000 * 60 * 60 * 24 * 365 * 18).toString())
      .withMessage("You must be adult!"),
    check("sex").notEmpty().withMessage("Are you genderless!? Come on!"),
    check("terms", "You must accept before you get into!").notEmpty(),
  ],
  validation(req, templateFields) {
    const errors = validationResult(req);
    const err = errors.array();
    let fields = templateFields.map((field) => {
      // console.log("field", field);
      let obj = err.find((e) => e.param === field.name);
      // console.log(obj);
      let returnValue = {
        ...field,
        errorMsg: obj ? obj.msg : "",
        value: req.body[field.name],
      };
      if (field.name == "password" || field.name == "repeatPassword") {
        delete returnValue.value;
      }
      return returnValue;
    });
    return {
      succes: errors.isEmpty(),
      fields,
    };
  },
};
