import { AxiosInstanceForYoutube } from "../config/axios";

export const fetchVideoById = async (videoId) => {
  try {
    const res = await AxiosInstanceForYoutube.request({
      method: "GET",
      url: `/videos/${videoId}`,
      headers: { accept: "application/json" },
    });

    return res.data.data;
  } catch (error) {
    console.log(error);
  }
};
