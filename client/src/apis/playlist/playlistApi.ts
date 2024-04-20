import { TUser } from "./../../types/user.type";
import { ListResponse, TSong, TPlaylist } from "../../types";
import axiosClient from "../axiosClient";

const playlistApi = {
  getAll(limit: number, page: number, q?: string, sort?: string): Promise<ListResponse<TPlaylist>> {
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
    return axiosClient.post(url + playlistId, { token });
  },
  getAllByUserId(
    userId: number,
    limit: number,
    page: number,
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
};

export default playlistApi;
