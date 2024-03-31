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
      gender: Joi.string().empty().max(45).required(),
      brithday: Joi.string().empty().max(50).required(),
    }),
  };
  static signin = {
    body: Joi.object().keys({
      email: Joi.string().email().max(255).empty().required().messages({
        "string.string": `Email phải là một chuổi !`,
        "string.email": `Email không hợp lệ !`,
        "string.max": `Email quá dài !`,
        "string.empty": `Email đang rỗng !`,
        "any.required": `Email là trường bắt buộc !`,
      }),
      password: Joi.string()
        .min(6)
        .max(50)
        // .pattern(
        //   new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{3,30}$")
        // )
        .required()
        .messages({
          "string.string": `password phải là một chuổi !`,
          "string.min": `password ít nhất 6 kí tự !`,
          "string.max": `password tối đa 50 kí tự`,
          "string.empty": `password đang rỗng !`,
          "any.required": `password là trường bắt buộc !`,
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
      password: Joi.string().email().max(255).empty().required(),
    }),
  };
  static sendVerificationEmail = {
    body: Joi.object().keys({
      email: Joi.string().email().max(255).empty().required(),
    }),
  };
  static verifyEmail = {
    query: Joi.object().keys({
      token: Joi.string().required(),
    }),
  };
  static changePassword = {
    cookies: Joi.object().keys({
      accessToken: Joi.string().required().messages({
        "string.all": `Người dùng chưa đăng nhập !`,
        "any.required": `Người dùng chưa đăng nhập !`,
      }),
    }),
    body: Joi.object().keys({
      password: Joi.string()
        .min(6)
        .max(50)
        // .pattern(
        //   new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{3,30}$")
        // )
        .required(),
      passwordOld: Joi.string()
        .min(6)
        .max(50)
        // .pattern(
        //   new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{3,30}$")
        // )
        .required(),
    }),
  };
}
