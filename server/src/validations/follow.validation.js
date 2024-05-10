import { query } from "express";
import Joi from "joi";

const bodySchema = {
  body: Joi.object().keys({
    email: Joi.string().email().max(255),
    password: Joi.string().min(6).max(255),
    name: Joi.string().min(6).max(255),
    image_path: Joi.string().min(10).max(255),
    verified: Joi.number().valid(0, 1),
    is_admin: Joi.number().valid(0, 1),
  }),
};

const querySchema = {
  query: Joi.object().keys({
    page: Joi.number().integer().required(),
    limit: Joi.number().integer().required(),
    q: Joi.string().allow(null, "").optional(),
    sortBy: Joi.string().valid("old", "new").default("new"),
  }),
};

export default class followValidation {
  static addFollow = {
    params: Joi.object().keys({
      userId: Joi.string().min(0).max(36).required(),
    }),
  };

  static removeFollow = {
    params: Joi.object().keys({
      userId: Joi.string().min(0).max(36).required(),
    }),
  };

  static getAllFollowers = {
    ...querySchema,
  };
  static getAllFollowing = {
    ...querySchema,
  };

  static getCountFollowers = {
    params: Joi.object().keys({
      userId: Joi.string().min(0).max(36).required(),
    }),
  };
  static getCountFollowing = {
    params: Joi.object().keys({
      userId: Joi.string().min(0).max(36).required(),
    }),
  };
  static checkFollowing = {
    params: Joi.object().keys({
      userId: Joi.string().min(0).max(36).required(),
    }),
  };
}
