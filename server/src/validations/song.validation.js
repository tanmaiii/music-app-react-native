import Joi from "joi";

const bodySchema = {
  body: Joi.object().keys({
    title: Joi.string().min(0).max(255),
    genre_id: Joi.number(),
    image_path: Joi.string().min(0).max(255),
    song_path: Joi.string().min(0).max(255),
    public: Joi.number().valid(0, 1),
    is_deleted: Joi.number().valid(0, 1),
  }),
};

const querySchema = {
  query: Joi.object().keys({
    q: Joi.string().allow(null, "").optional(),
    sortBy: Joi.string().valid("old", "new").default("new"),
    limit: Joi.number().integer().required(),
    page: Joi.number().integer().required(),
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
    params: Joi.object().keys({
      songId: Joi.string().min(0).max(36).required(),
    }),
  };

  static destroySong = {
    params: Joi.object().keys({
      songId: Joi.string().min(0).max(36).required(),
    }),
  };

  static restoreSong = {
    params: Joi.object().keys({
      songId: Joi.string().min(0).max(36).required(),
    }),
  };

  static getSong = {
    params: Joi.object().keys({
      songId: Joi.string().min(0).max(36).required(),
    }),
  };

  static getAllSong = {
    ...querySchema,
  };

  static getAllSongByMe = {
    ...querySchema,
  };

  static getAllFavoritesByUser = {
    ...querySchema,
    params: Joi.object().keys({
      userId: Joi.string().min(0).max(36).required(),
    }),
  };

  static getAllSongByUser = {
    ...querySchema,
    params: Joi.object().keys({
      userId: Joi.string().min(0).max(36).required(),
    }),
  };

  static getAllSongByPlaylist = {
    ...querySchema,
    params: Joi.object().keys({
      playlistId: Joi.string().min(0).max(36).required(),
    }),
  };

  static like = {
    params: Joi.object().keys({
      songId: Joi.string().min(0).max(36).required(),
    }),
  };

  static unLike = {
    params: Joi.object().keys({
      songId: Joi.string().min(0).max(36).required(),
    }),
  };
  static checkSongLiked = {
    params: Joi.object().keys({
      songId: Joi.string().min(0).max(36).required(),
    }),
  };
}
