import { axiosClient } from "../../configs";
import { ListResponse, ResFavourite, ResSoPaAr } from "../../types";

const searchApi = {
  getAll(
    token: string,
    page: number,
    limit: number,
    q?: string,
    sort?: string
  ): Promise<ListResponse<ResSoPaAr>> {
    const url = "search";
    return axiosClient.get(url, {
      headers: {
        authorization: token,
      },
      params: {
        page: page,
        limit: limit,
        q: q,
        sortBy: sort,
      },
    });
  },
};

export default searchApi;
