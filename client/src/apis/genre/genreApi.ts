import { ResVerifyForgotPassword } from "./../../types/auth.type";
import { TUser, ResLoginApi, ListResponse } from "./../../types";
import axiosClient from "../../configs/axios/axiosClient";
import { TGenre } from "../../types/genre.type";

const genreApi = {
  getAll(page?: number, limit?: number, q?: string, sort?: string): Promise<ListResponse<TGenre>> {
    const url = "genre";
    return axiosClient.get(url, {
      params: {
        page: page,
        limit: limit,
        q: q,
        sortBy: sort,
      },
    });
  },
};

export default genreApi;
