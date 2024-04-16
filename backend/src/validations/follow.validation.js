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

export default class followValidation {
  static addFollow = {
    body: Joi.object().keys({
      token: Joi.string().required(),
    }),
    params: Joi.object().keys({
      userId: Joi.number().integer().required(),
    }),
  };

  static removeFollow = {
    body: Joi.object().keys({
      token: Joi.string().required(),
    }),
    params: Joi.object().keys({
      userId: Joi.number().integer().required(),
    }),
  };

  static getAllFollowers = {
    ...bodySchema,
  };
  static getAllFollowing = {
    ...bodySchema,
  };

  static getCountFollowers = {
    params: Joi.object().keys({
      userId: Joi.number().integer().required(),
    }),
  };
  static getCountFollowing = {
    params: Joi.object().keys({
      userId: Joi.number().integer().required(),
    }),
  };
}
