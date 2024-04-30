import { query } from "express";
import Joi from "joi";

const querySchema = {
  query: Joi.object().keys({
    q: Joi.string().allow(null, "").optional(),
    sortBy: Joi.string().valid("old", "new", "alpha").default("new"),
    limit: Joi.number().integer().required(),
    page: Joi.number().integer().required(),
  }),
};

export default class userValidation {
  static getAlL = {
    ...querySchema,
  };
  static getSongs = {
    ...querySchema,
  };
}
