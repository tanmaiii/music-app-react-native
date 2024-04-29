import { TUser } from "./../../types/user.type";
import { ListResponse, TSong, TPlaylist } from "../../types";
import axiosClient from "../../configs/axios/axiosClient";

interface CheckLikedResponse {
  isLiked: boolean;
}

const playlistApi = {
  getAll(page: number, limit: number, q?: string, sort?: string): Promise<ListResponse<TPlaylist>> {
    const url = "playlist";
    return axiosClient.get(url, {
      params: {
        page: page,
        limit: limit,
        q: q,
        sortBy: sort,
      },
    });
  },
  getDetail(playlistId: string, token: string): Promise<TPlaylist> {
    const url = "playlist/detail/";
    return axiosClient.get(url + playlistId, {
      headers: {
        authorization: token,
      },
    });
  },
  getAllByUserId(
    userId: string,
    page: number,
    limit: number,
    q?: string,
    sort?: string,
  ): Promise<ListResponse<TPlaylist>> {
    const url = "playlist/user/";
    return axiosClient.get(url + userId, {
      params: {
        page: page,
        limit: limit,
        sortBy: sort,
        q: q,
      },
    });
  },
  getMe(
    token: string,
    page: number,
    limit: number,
    q?: string,
    sort?: string,
  ): Promise<ListResponse<TPlaylist>> {
    const url = "playlist/me";
    return axiosClient.get(url, {
      params: {
        page: page,
        limit: limit,
        sortBy: sort,
        q: q,
      },
      headers: {
        authorization: token,
      },
    });
  },
  getAllFavoritesByUser(
    token: string,
    page: number,
    limit: number,
    q?: string,
    sort?: string
  ): Promise<ListResponse<TPlaylist>> {
    const url = `playlist/like`;
    return axiosClient.get(url, {
      headers: {
        authorization: token,
      },
      params: {
        page: page,
        limit: limit,
        sortBy: sort,
        q: q,
      },
    });
  },
  checkLikedPlaylist(playlistId: string, token: string): Promise<CheckLikedResponse> {
    const url = "playlist/checkLiked/";
    return axiosClient.get(url + playlistId, {
      headers: {
        authorization: token,
      },
    });
  },
  likePlaylist(playlistId: string, token: string) {
    const url = "playlist/like/";
    return axiosClient.post(url + playlistId, undefined, {
      headers: {
        authorization: token,
      },
    });
  },
  unLikePlaylist(playlistId: string, token: string) {
    const url = "playlist/like/";
    return axiosClient.delete(url + playlistId, {
      headers: {
        authorization: token,
      },
    });
  },
  checkSongInPlaylist(
    playlistId: string,
    songId: string,
    token: string
  ): Promise<{ isAdd: boolean }> {
    const url = "playlist/checkSong";
    return axiosClient.post(
      url,
      { song_id: songId, playlist_id: playlistId },
      {
        headers: {
          authorization: token,
        },
      }
    );
  },
  addSong(playlistId: string, songId: string, token: string) {
    const url = "playlist/song/";
    return axiosClient.post(
      url,
      {
        song_id: songId,
        playlist_id: playlistId,
      },
      {
        headers: {
          authorization: token,
        },
      }
    );
  },
  removeSong(playlistId: string, songId: string, token: string) {
    const url = "playlist/song/";
    return axiosClient.delete(url, {
      data: {
        song_id: songId,
        playlist_id: playlistId,
      },
      headers: {
        authorization: token,
      },
    });
  },
};

export default playlistApi;
