import { TUser } from "./../../types/user.type";
import { ListResponse, TSong, TPlaylist } from "../../types";
import axiosClient from "../axiosClient";

const playlistApi = {
  getAll(page: number,limit: number, q?: string, sort?: string): Promise<ListResponse<TPlaylist>> {
    const url = "playlist";
    return axiosClient.get(url, {
      params: {
        page: page,
        limit: limit,
        q: q,
        sort: sort,
      },
    });
  },
  getDetail(playlistId: number, token: string): Promise<TPlaylist> {
    const url = "playlist/detail/";
    return axiosClient.get(url + playlistId, {
      headers: {
        token: token,
      },
    });
  },
  getAllByUserId(
    userId: number,
    page: number,
    limit: number,
    q?: string,
    sort?: string
  ): Promise<ListResponse<TPlaylist>> {
    const url = "playlist/user/";
    return axiosClient.get(url + userId, {
      params: {
        page: page,
        limit: limit,
        sort: sort,
        q: q,
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
        token: token,
      },
      params: {
        page: page,
        limit: limit,
        sort: sort,
        q: q,
      },
    });
  },
};

export default playlistApi;
