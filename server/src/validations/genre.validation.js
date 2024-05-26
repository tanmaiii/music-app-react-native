import { query } from "express";
import Joi from "joi";

const bodySchema = {
  body: Joi.object().keys({
    title: Joi.string().min(1).max(255),
    image_path: Joi.string().min(10).max(255),
  }),
};

const querySchema = {
  query: Joi.object().keys({
    q: Joi.string().allow(null, "").optional(),
    sortBy: Joi.string().valid("old", "new", 'count').default("count"),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const cookieSchema = {
  cookies: Joi.object().keys({
    accessToken: Joi.string().required(),
  }),
};
export default class genreValidation {
  static getGenre = {
    params: Joi.object().keys({
      genreId: Joi.number().integer().required(),
    }),
  };

  static createGenre = {
    ...bodySchema,
    ...cookieSchema,
  };

  static updateGenre = {
    params: Joi.object().keys({
      genreId: Joi.number().integer().required(),
    }),
    ...bodySchema,
    ...cookieSchema,
  };

  static deleteGenre = {
    params: Joi.object().keys({
      genreId: Joi.number().integer().required(),
    }),
    ...cookieSchema,
  };

  static getAllGenres = {
    ...querySchema,
  };

  static getAllSongsGenre = {
    params: Joi.object().keys({
      genreId: Joi.number().integer().required(),
    }),
    ...querySchema,
  };
}
