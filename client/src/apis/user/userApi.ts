import axiosClient from "../../configs/axios/axiosClient";
import { ListResponse, TUser } from "../../types";

interface CheckFollowingResponse {
  isFollowing: boolean;
}

const userApi = {
  getAll(page: number, limit: number , q?: string, sort?: string): Promise<ListResponse<TUser>> {
    const url = "user";
    return axiosClient.get(url, {
      params: {
        page: page,
        limit: limit,
        sort: sort,
        q: q,
      },
    });
  },
  getDetail(userId: number): Promise<TUser> {
    const url = "user/";
    return axiosClient.get(url + userId);
  },
  getMe(token: string): Promise<TUser> {
    const url = "user/me";
    return axiosClient.post(url, { token });
  },
  findByEmail(email: string) {
    const url = "user/email";
    return axiosClient.post(url, { email });
  },
  getCountFollowing(userId: number): Promise<number> {
    const url = `follow/following/${userId}/count`;
    return axiosClient.get(url);
  },
  getCountFollowers(userId: number): Promise<number> {
    const url = `follow/followers/${userId}/count`;
    return axiosClient.get(url);
  },
  getFollowing(
    userId: number,
    page: number,
    limit: number,
    q?: string,
    sort?: string
  ): Promise<ListResponse<TUser>> {
    const url = "/follow/following/";
    return axiosClient.get(url + userId, {
      params: {
        page: page,
        limit: limit,
        sortBy: sort,
        q: q,
      },
    });
  },
  getFollowers(
    userId: number,
    page: number,
    limit: number,
    q?: string,
    sort?: string
  ): Promise<ListResponse<TUser>> {
    const url = "/follow/followers/";
    return axiosClient.get(url + userId, {
      params: {
        page: page,
        limit: limit,
        sortBy: sort,
        q: q,
      },
    });
  },
  checkFollowing(userId: number, token: string): Promise<CheckFollowingResponse> {
    const url = `follow/${userId}/check`;
    return axiosClient.post(url, { token });
  },
  follow(userId: number, token: string) {
    const url = `follow/${userId}`;
    return axiosClient.post(url, { token });
  },
  unFollow(userId: number, token: string) {
    const url = `follow/${userId}`;
    return axiosClient.delete(url, { data: { token: token } });
  },
};

export default userApi;
