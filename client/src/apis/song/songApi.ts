import { TUser } from "./../../types/user.type";
import { ListResponse, TSong } from "../../types";
import axiosClient from "../axiosClient";

interface CheckLikedResponse {
  isLiked: boolean;
}

const songApi = {
  getAll(): Promise<ListResponse<TSong>> {
    const url = "song";
    return axiosClient.get(url, {
      params: {
        page: 1,
        limit: 4,
      },
    });
  },
  getDetail(songId: number, token: string): Promise<TSong> {
    const url = "song/detail/";
    return axiosClient.post(url + songId, { token });
  },
  getAllByUserId(userId: number, page: number, limit: number): Promise<ListResponse<TSong>> {
    const url = "song/user/";
    return axiosClient.get(url + userId, {
      params: {
        page,
        limit,
      },
    });
  },
  getAllFavoritesByUser(
    userId: number,
    limit: number,
    page: number,
    sort?: string,
    q?: string
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
    return axiosClient.get(url + songId);
  },
  checkLikedSong(songId: number): Promise<CheckLikedResponse> {
    const url = "song/checkLiked/";
    return axiosClient.get(url + songId);
  },
  likeSong(songId: number) {
    const url = "song/like/";
    return axiosClient.post(url + songId);
  },
  unLikeSong(songId: number) {
    const url = "song/like/";
    return axiosClient.delete(url + songId);
  },
};

export default songApi;
