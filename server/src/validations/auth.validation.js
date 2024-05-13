import Joi from "joi";

export default class authValidation {
  static signup = {
    body: Joi.object().keys({
      email: Joi.string().email().max(255).empty().required(),
      password: Joi.string()
        .min(6)
        .max(50)
        // .pattern(
        //   new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{3,30}$")
        // )
        .required(),
      name: Joi.string().empty().max(50).required(),
      gender: Joi.string().empty().max(45),
      brithday: Joi.string().empty().max(50),
    }),
  };
  static signin = {
    body: Joi.object().keys({
      email: Joi.string().email().max(255).empty().required().messages({
        "string.string": `Email must be a string!`,
        "string.email": `Invalid email!`,
        "string.max": `Email is too long!`,
        "string.empty": `Email is empty!`,
        "any.required": `Email is a required field!`,
      }),
      password: Joi.string()
        .min(6)
        .max(50)
        // .pattern(
        //   new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{3,30}$")
        // )
        .required()
        .messages({
          "string.string": `Password must be a string!`,
          "string.min": `Password at least 6 characters!`,
          "string.max": `Password maximum 50 characters`,
          "string.empty": `Password is empty!`,
          "any.required": `Password is a required field!`,
        }),
    }),
  };
  static forgotPassword = {
    body: Joi.object().keys({
      email: Joi.string().email().max(255).empty().required(),
    }),
  };
  static resetPassword = {
    query: Joi.object().keys({
      token: Joi.string().required(),
    }),
    body: Joi.object().keys({
      password: Joi.string()
        .min(6)
        .max(50)
        // .pattern(
        //   new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{3,30}$")
        // )
        .required(),
    }),
  };
  static sendVerify = {
    body: Joi.object().keys({
      email: Joi.string().email().max(255).empty().required().messages({
        "string.string": `Email must be a string!`,
        "string.email": `Invalid email!`,
        "string.max": `Email is too long!`,
        "string.empty": `Email is empty!`,
        "any.required": `Email is a required field!`,
      }),
    }),
  };
  static verifyAccount = {
    body: Joi.object().keys({
      email: Joi.string().email().max(255).empty().required().messages({
        "string.string": `Email must be a string!`,
        "string.email": `Invalid email!`,
        "string.max": `Email is too long!`,
        "string.empty": `Email is empty!`,
        "any.required": `Email is a required field!`,
      }),
      code: Joi.number().required(),
    }),
  };
  static verifyForgotPassword = {
    body: Joi.object().keys({
      email: Joi.string().email().max(255).empty().required().messages({
        "string.string": `Email must be a string!`,
        "string.email": `Invalid email!`,
        "string.max": `Email is too long!`,
        "string.empty": `Email is empty!`,
        "any.required": `Email is a required field!`,
      }),
      code: Joi.number().required(),
    }),
  };
  static verifyEmail = {
    body: Joi.object().keys({
      email: Joi.string().email().max(255).empty().required().messages({
        "string.string": `Email must be a string!`,
        "string.email": `Invalid email!`,
        "string.max": `Email is too long!`,
        "string.empty": `Email is empty!`,
        "any.required": `Email is a required field!`,
      }),
      code: Joi.string().min(4).max(4).required(),
    }),
  };
  static changePassword = {
    body: Joi.object().keys({
      password: Joi.string()
        .min(6)
        .max(50)
        // .pattern(
        //   new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{3,30}$")
        // )
        .required()
        .messages({
          "string.string": `Password must be a string!`,
          "string.min": `Password at least 6 characters!`,
          "string.max": `Password maximum 50 characters`,
          "string.empty": `Password is empty!`,
          "any.required": `Password is a required field!`,
        }),
      passwordOld: Joi.string()
        .min(6)
        .max(50)
        // .pattern(
        //   new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{3,30}$")
        // )
        .required()
        .messages({
          "string.string": `Password must be a string!`,
          "string.min": `Password at least 6 characters!`,
          "string.max": `Password maximum 50 characters`,
          "string.empty": `Password is empty!`,
          "any.required": `Password is a required field!`,
        }),
    }),
  };
}
