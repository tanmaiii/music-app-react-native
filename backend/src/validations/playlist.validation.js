import Joi from "joi";

const bodySchema = {
  body: Joi.object().keys({
    title: Joi.string().min(0).max(255),
    genre_id: Joi.number(),
    image_path: Joi.string().min(0).max(255),
    public: Joi.number().valid(0, 1),
  }),
};

const querySchema = {
  query: Joi.object().keys({
    q: Joi.string(),
    sort: Joi.string().valid("old", "new").default("new"),
    limit: Joi.number().integer().required(),
    page: Joi.number().integer().required(),
  }),
};

const cookieSchema = {
  cookies: Joi.object().keys({
    accessToken: Joi.string().required(),
  }),
};

export default class playlistValidator {
  static getPlaylist = {
    params: Joi.object().keys({
      playlistId: Joi.number().integer().required(),
    }),
  };

  static createPlaylist = {
    ...bodySchema,
    ...cookieSchema,
  };

  static updatePlaylist = {
    ...bodySchema,
    ...cookieSchema,
  };

  static deletePlaylist = {
    params: Joi.object().keys({
      playlistId: Joi.number().integer().required(),
    }),
    ...cookieSchema,
  };

  static getAllPlaylist = {
    ...querySchema,
  };

  static getAllPlaylistByMe = {
    ...querySchema,
    ...cookieSchema,
  };

  static getAllPlaylistByUser = {
    ...querySchema,
    params: Joi.object().keys({
      userId: Joi.number().integer().required(),
    }),
  };

  static getAllFavoritesByUser = {
    ...querySchema,
    ...cookieSchema,
  };

  static like = {
    ...cookieSchema,
    params: Joi.object().keys({
      playlistId: Joi.number().integer().required(),
    }),
  };

  static unLike = {
    ...cookieSchema,
    params: Joi.object().keys({
      playlistId: Joi.number().integer().required(),
    }),
  };

  static addSong = {
    ...cookieSchema,
    body: Joi.object().keys({
      playlist_id: Joi.number().min(1).max(255).required(),
      song_id: Joi.number().min(1).max(255).required(),
    }),
  };

  static unAddSong = {
    ...cookieSchema,
    body: Joi.object().keys({
      playlist_id: Joi.number().min(1).max(255).required(),
      song_id: Joi.number().min(1).max(255).required(),
    }),
  };
}
