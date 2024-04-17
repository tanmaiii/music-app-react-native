import Joi from "joi";

const bodyToken = {
  body: Joi.object().keys({
    token: Joi.string().required(),
  }),
};

const bodySchema = {
  body: Joi.object().keys({
    title: Joi.string().min(0).max(255),
    genre_id: Joi.number(),
    image_path: Joi.string().min(0).max(255),
    song_path: Joi.string().min(0).max(255),
    public: Joi.number().valid(0, 1),
    is_deleted: Joi.number().valid(0, 1),
    token: Joi.string().required(),
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

const cookieSchema = {
  cookies: Joi.object().keys({
    accessToken: Joi.string().required(),
  }),
};

export default class songValidation {
  static createSong = {
    ...bodySchema,
  };

  static updateSong = {
    ...bodySchema,
  };

  static deleteSong = {
    ...bodyToken,
    params: Joi.object().keys({
      songId: Joi.number().integer().required(),
    }),
  };

  static destroySong = {
    ...bodyToken,
    params: Joi.object().keys({
      songId: Joi.number().integer().required(),
    }),
  };

  static restoreSong = {
    ...bodyToken,
    params: Joi.object().keys({
      songId: Joi.number().integer().required(),
    }),
  };

  static getSong = {
    ...bodyToken,
    params: Joi.object().keys({
      songId: Joi.number().integer().required(),
    }),
  };

  static getAllSong = {
    ...querySchema,
  };

  static getAllSongByMe = {
    ...bodyToken,
    ...querySchema,
  };

  static getAllFavoritesByUser = {
    //...bodyToken,
    ...querySchema,
    // ...cookieSchema,
    params: Joi.object().keys({
      userId: Joi.number().integer().required(),
    }),
  };

  static getAllSongByUser = {
    ...querySchema,
    params: Joi.object().keys({
      userId: Joi.number().integer().required(),
    }),
  };

  static getAllSongByPlaylist = {
    ...querySchema,
    params: Joi.object().keys({
      playlistId: Joi.number().integer().required(),
    }),
  };

  static like = {
    ...bodyToken,
    params: Joi.object().keys({
      songId: Joi.number().integer().required(),
    }),
  };

  static unLike = {
    ...bodyToken,
    params: Joi.object().keys({
      songId: Joi.number().integer().required(),
    }),
  };
  static checkSongLiked = {
    ...bodyToken,
    params: Joi.object().keys({
      songId: Joi.number().integer().required(),
    }),
  };
}
