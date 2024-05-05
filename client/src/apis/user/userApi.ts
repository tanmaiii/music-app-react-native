import axiosClient from "../../configs/axios/axiosClient";
import { ListResponse, TUser } from "../../types";

interface CheckFollowingResponse {
  isFollowing: boolean;
}

const userApi = {
  getAll(page: number, limit: number, q?: string, sort?: string): Promise<ListResponse<TUser>> {
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
  getDetail(userId: string): Promise<TUser> {
    const url = "user/";
    return axiosClient.get(url + userId);
  },
  getMe(token: string): Promise<TUser> {
    const url = "user/me";
    return axiosClient.get(url, {
      headers: {
        authorization: token,
      },
    });
  },
  update: (token: string, body: any) => {
    const url = "user";
    return axiosClient.put(url, body, {
      headers: {
        authorization: token,
      },
    });
  },
  findByEmail(email: string) {
    const url = "user/email";
    return axiosClient.post(url, { email: email });
  },
  getCountFollowing(userId: string): Promise<number> {
    const url = `follow/following/${userId}/count`;
    return axiosClient.get(url);
  },
  getCountFollowers(userId: string): Promise<number> {
    const url = `follow/followers/${userId}/count`;
    return axiosClient.get(url);
  },
  getFollowing(
    userId: string,
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
    userId: string,
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
  checkFollowing(userId: string, token: string): Promise<CheckFollowingResponse> {
    const url = `follow/${userId}/check`;
    return axiosClient.get(url, {
      headers: {
        authorization: token,
      },
    });
  },
  follow(userId: string, token: string) {
    const url = `follow/${userId}`;
    return axiosClient.post(url, undefined, {
      headers: {
        authorization: token,
      },
    });
  },
  unFollow(userId: string, token: string) {
    const url = `follow/${userId}`;
    return axiosClient.delete(url, {
      headers: {
        authorization: token,
      },
    });
  },
};

export default userApi;
