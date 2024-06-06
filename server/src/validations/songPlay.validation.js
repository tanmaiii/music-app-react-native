import Joi from "joi";

const querySchema = {
  query: Joi.object().keys({
    q: Joi.string().allow(null, "").optional(),
    sort: Joi.string().valid("old", "new").default("new"),
    limit: Joi.number().integer().required(),
    page: Joi.number().integer().required(),
  }),
};

export default class songValidation {
  static createSongPlay = {
    params: Joi.object().keys({
      songId: Joi.string().min(0).max(36).required(),
    }),
  };

  static countListened = {
    params: Joi.object().keys({
      songId: Joi.string().min(0).max(36).required(),
    }),
  }
}
