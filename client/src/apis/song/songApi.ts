import { TUser } from "./../../types/user.type";
import { ListResponse, TSong } from "../../types";
import axiosClient from "../axiosClient";

interface CheckLikedResponse {
  isLiked: boolean;
}

const songApi = {
  getAll(limit: number, page: number, q?: string, sort?: string): Promise<ListResponse<TSong>> {
    const url = "song";
    return axiosClient.get(url, {
      params: {
        page: page,
        limit: limit,
        q: q,
        sort: sort,
      },
    });
  },
  getDetail(songId: number, token: string): Promise<TSong> {
    const url = "song/detail/";
    return axiosClient.post(url + songId, { token });
  },
  getAllByUserId(
    userId: number,
    limit: number,
    page: number,
    q?: string,
    sort?: string
  ): Promise<ListResponse<TSong>> {
    const url = "song/user/";
    return axiosClient.get(url + userId, {
      params: {
        page: page,
        limit: limit,
        sort: sort,
        q: q,
      },
    });
  },
  getAllByPlaylistId(
    playlistId: number,
    limit: number,
    page: number,
    q?: string,
    sort?: string
  ): Promise<ListResponse<TSong>> {
    const url = `song/playlist/${playlistId}`;
    return axiosClient.get(url, {
      params: {
        page: page,
        limit: limit,
        sort: sort,
        q: q,
      },
    });
  },
  getAllFavoritesByUser(
    userId: number,
    limit: number,
    page: number,
    q?: string,
    sort?: string
  ): Promise<ListResponse<TSong>> {
    const url = `song/like/${userId}`;
    return axiosClient.get(url, {
      params: {
        page: page,
        limit: limit,
        sort: sort,
        q: q,
      },
    });
  },
  getAllArtistInSong(songId: number, token: string): Promise<TUser[]> {
    const url = "userSong/";
    return axiosClient.post(url + songId, { token });
  },
  checkLikedSong(songId: number, token: string): Promise<CheckLikedResponse> {
    const url = "song/checkLiked/";
    return axiosClient.post(url + songId, { token });
  },
  likeSong(songId: number, token: string) {
    const url = "song/like/";
    return axiosClient.post(url + songId, { token });
  },
  unLikeSong(songId: number, token: string) {
    const url = "song/like/";
    return axiosClient.delete(url + songId, { data: { token: token } });
  },
};

export default songApi;
