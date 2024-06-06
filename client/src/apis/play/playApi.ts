import { TSong } from "@/types";
import axiosClient from "../../configs/axios/axiosClient";

const playApi = {
  playSong(songId: string, token: string): Promise<TSong> {
    const url = "songPlay/";
    return axiosClient.post(url + songId, undefined, {
      headers: {
        authorization: token,
      },
    });
  },
};

export default playApi;
