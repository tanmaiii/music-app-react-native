import { query } from "express";
import Joi from "joi";

const bodySchema = {
  body: Joi.object().keys({
    email: Joi.string().email().max(255),
    password: Joi.string().min(6).max(255),
    name: Joi.string().min(6).max(255),
    gender: Joi.string().min(0).max(10).allow(null, ""),
    image_path: Joi.string().min(10).max(255),
    verified: Joi.number().valid(0, 1),
    is_admin: Joi.number().valid(0, 1),
    email_verified_at: Joi.string().min(0).max(255),
  }),
};

const querySchema = {
  query: Joi.object().keys({
    q: Joi.string().allow(null, "").optional(),
    sort: Joi.string().valid("old", "new").default("new"),
    limit: Joi.number().integer().required(),
    page: Joi.number().integer().required(),
  }),
};

export default class userValidation {
  static getUser = {
    params: Joi.object().keys({
      userId: Joi.string().min(0).max(36).required(),
    }),
  };
  static getMe = {};
  static updateUser = {
    ...bodySchema,
  };
  static getAllUser = {
    ...querySchema,
  };
  static findByEmail = {
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
}
