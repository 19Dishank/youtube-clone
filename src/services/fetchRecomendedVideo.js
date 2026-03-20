import { AxiosInstanceForYoutube } from "../config/axios";

export const fetchRecommendedVideos = async (limit = 10, page = 1, videoId) => {
  if (!videoId) {
    throw new Error("videoId is required to fetch recommended videos");
  }

  try {
    const res = await AxiosInstanceForYoutube.request({
      method: "GET",
      url: `/related/${videoId}`,
      params: {
        page,
        limit,
      },
      headers: { accept: "application/json" },
    });

    return res.data.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
