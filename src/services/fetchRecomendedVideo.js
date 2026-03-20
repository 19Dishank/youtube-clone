import { AxiosInstanceForYoutube } from "../config/axios";

export const fetchRecommendedVideos = async (limit = 10, page = 1) => {
  try {
    const res = await AxiosInstanceForYoutube.request({
      method: "GET",
      url: "/related/eLyISYdoVac",
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
