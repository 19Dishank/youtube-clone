import { AxiosInstanceForYoutube } from "../config/axios";

export const fetchVideos = async (limit = 20, page = 1) => {
  try {
    const res = await AxiosInstanceForYoutube.request({
      method: "GET",
      url: "/videos",
      params: {
        page,
        limit,
      },
      headers: { accept: "application/json" },
    });

    return res.data.data;
  } catch (error) {
    console.log(error);
  }
};
