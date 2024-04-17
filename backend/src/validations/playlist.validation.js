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
    public: Joi.number().valid(0, 1),
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

// const cookieSchema = {
//   cookies: Joi.object().keys({
//     accessToken: Joi.string().required(),
//   }),
// };

export default class playlistValidator {
  static getPlaylist = {
    params: Joi.object().keys({
      playlistId: Joi.number().integer().required(),
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
      playlistId: Joi.number().integer().required(),
    }),
    ...bodyToken,
  };

  static destroyPlaylist = {
    params: Joi.object().keys({
      playlistId: Joi.number().integer().required(),
    }),
    ...bodyToken,
  };

  static restorePlaylist = {
    params: Joi.object().keys({
      playlistId: Joi.number().integer().required(),
    }),
    ...bodyToken,
  };

  static getAllPlaylist = {
    ...querySchema,
  };

  static getAllPlaylistByMe = {
    ...querySchema,
    ...bodyToken,
  };

  static getAllPlaylistByUser = {
    ...querySchema,
    params: Joi.object().keys({
      userId: Joi.number().integer().required(),
    }),
  };

  static getAllFavoritesByUser = {
    ...querySchema,
    ...bodyToken,
  };

  static like = {
    ...bodyToken,
    params: Joi.object().keys({
      playlistId: Joi.number().integer().required(),
    }),
  };

  static unLike = {
    ...bodyToken,
    params: Joi.object().keys({
      playlistId: Joi.number().integer().required(),
    }),
  };

  static addSong = {
    ...bodyToken,
    body: Joi.object().keys({
      playlist_id: Joi.number().min(1).max(255).required(),
      song_id: Joi.number().min(1).max(255).required(),
    }),
  };

  static unAddSong = {
    ...bodyToken,
    body: Joi.object().keys({
      playlist_id: Joi.number().min(1).max(255).required(),
      song_id: Joi.number().min(1).max(255).required(),
    }),
  };
}
