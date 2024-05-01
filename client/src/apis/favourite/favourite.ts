import { ListResponse, TSong, TPlaylist, ResFavourite } from "../../types";
import axiosClient from "../../configs/axios/axiosClient";

const favouriteApi = {
  getAll(
    token: string,
    page: number,
    limit: number,
    sort?: string,
    q?: string
  ): Promise<ListResponse<ResFavourite>> {
    const url = "favourite";
    return axiosClient.get(url, {
      params: {
        page: page,
        limit: limit,
        q: q,
        sortBy: sort,
      },
      headers: {
        authorization: token,
      },
    });
  },
  getPlaylists(
    token: string,
    page: number,
    limit: number,
    sort?: string,
    q?: string
  ): Promise<ListResponse<ResFavourite>> {
    const url = "favourite/playlists";
    return axiosClient.get(url, {
      params: {
        page: page,
        limit: limit,
        q: q,
        sortBy: sort,
      },
      headers: {
        authorization: token,
      },
    });
  },
  getArtists(
    token: string,
    page: number,
    limit: number,
    sort?: string,
    q?: string
  ): Promise<ListResponse<ResFavourite>> {
    const url = "favourite/artists";
    return axiosClient.get(url, {
      params: {
        page: page,
        limit: limit,
        q: q,
        sortBy: sort,
      },
      headers: {
        authorization: token,
      },
    });
  },

  getSongs(
    token: string,
    page: number,
    limit: number,
    sort?: string,
    q?: string
  ): Promise<ListResponse<TSong>> {
    const url = "favourite/songs";
    return axiosClient.get(url, {
      params: {
        page: page,
        limit: limit,
        q: q,
        sortBy: sort,
      },
      headers: {
        authorization: token,
      },
    });
  },
};

export default favouriteApi;
