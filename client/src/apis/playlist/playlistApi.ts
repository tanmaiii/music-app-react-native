import { TUser } from "./../../types/user.type";
import { ListResponse, TSong } from "../../types";
import axiosClient from "../axiosClient";

const playlistApi = {
  getAll(limit: number, page: number, q?: string, sort?: string): Promise<ListResponse<TSong>> {
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
