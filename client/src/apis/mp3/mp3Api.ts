import { axiosClient } from "../../configs";

const mp3Api = {
  upload: (formdata: any, token: string): Promise<{ mp3: string }> => {
    const url = "mp3";
    return axiosClient.post(url, formdata, {
      headers: { "Content-Type": "multipart/form-data", authorization: token },
    });
  },
  delete: (fileName: string) => {
    const url = "mp3";
    return axiosClient.delete(url, {
      data: {
        fileName: fileName,
      },
    });
  },
};

export default mp3Api;
