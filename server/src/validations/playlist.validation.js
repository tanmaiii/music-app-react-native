import Joi from "joi";

const bodySchema = {
  body: Joi.object().keys({
    title: Joi.string().min(0).max(255).messages({
      "string.base": "Title is error",
      "string.max": "Title must be less than or equal to 255 characters long",
    }),
    desc: Joi.string().min(0).max(500),
    genre_id: Joi.number(),
    image_path: Joi.string().min(0).max(255),
    public: Joi.number().valid(0, 1),
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

export default class playlistValidator {
  static getPlaylist = {
    params: Joi.object().keys({
      playlistId: Joi.string().min(0).max(36).required(),
    }),
  };

  static createPlaylist = {
    ...bodySchema,
  };

  static updatePlaylist = {
    ...bodySchema,
  };

  static deletePlaylist = {
    params: Joi.object().keys({
      playlistId: Joi.string().min(0).max(36).required(),
    }),
  };

  static destroyPlaylist = {
    params: Joi.object().keys({
      playlistId: Joi.string().min(0).max(36).required(),
    }),
  };

  static restorePlaylist = {
    params: Joi.object().keys({
      playlistId: Joi.string().min(0).max(36).required(),
    }),
  };

  static getAllPlaylist = {
    ...querySchema,
  };

  static getAllPlaylistByMe = {
    ...querySchema,
  };

  static getAllPlaylistByUser = {
    ...querySchema,
    params: Joi.object().keys({
      userId: Joi.string().min(0).max(36).required(),
    }),
  };

  static getAllFavoritesByUser = {
    ...querySchema,
  };

  static checkLike = {
    params: Joi.object().keys({
      playlistId: Joi.string().min(0).max(36).required(),
    }),
  };

  static like = {
    params: Joi.object().keys({
      playlistId: Joi.string().min(0).max(36).required(),
    }),
  };

  static unLike = {
    params: Joi.object().keys({
      playlistId: Joi.string().min(0).max(36).required(),
    }),
  };

  static checkSong = {
    body: Joi.object().keys({
      playlist_id: Joi.string().min(0).max(36).required(),
      song_id: Joi.string().min(0).max(36).required(),
    }),
  };

  static addSong = {
    body: Joi.object().keys({
      playlist_id: Joi.string().min(0).max(36).required(),
      song_id: Joi.string().min(0).max(36).required(),
    }),
  };

  static unAddSong = {
    body: Joi.object().keys({
      playlist_id: Joi.string().min(0).max(36).required(),
      song_id: Joi.string().min(0).max(36).required(),
    }),
  };
}
