import axiosClient from "../../configs/axios/axiosClient";
import { TGenre } from "../../types/genre.type";
import { ListResponse, TPlaylist, TSong } from "./../../types";

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
  getDetail(genreId: string): Promise<TGenre> {
    const url = "genre/";
    return axiosClient.get(url + genreId);
  },
  getSongs(
    genreId: string,
    page?: number,
    limit?: number,
    q?: string,
    sort?: string
  ): Promise<ListResponse<TSong>> {
    const url = "genre/songs/";
    return axiosClient.get(url + genreId, {
      params: {
        page: page,
        limit: limit,
        q: q,
        sortBy: sort,
      },
    });
  },
  getPlaylists(
    genreId: string,
    page?: number,
    limit?: number,
    q?: string,
    sort?: string
  ): Promise<ListResponse<TPlaylist>> {
    const url = "genre/playlists/";
    return axiosClient.get(url + genreId, {
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
