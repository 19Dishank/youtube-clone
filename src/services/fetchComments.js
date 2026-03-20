import { AxiosInstanceForYoutube } from "../config/axios";

export const fetchComments = async (videoId) => {
  try {
    const res = await AxiosInstanceForYoutube.request({
      method: "GET",
      url: `/comments/${videoId}`,
      headers: { accept: "application/json" },
    });

    return res.data.data;
  } catch (error) {
    console.log(error);
  }
};
