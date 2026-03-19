import { AxiosInstanceForYoutube } from "../config/axios";

export const fetchRelatedVideos = async () => {
  try {
    const res = await AxiosInstanceForYoutube.request({
      method: "GET",
      url: "/related/eLyISYdoVac",
      params: { page: "1", limit: "46" },
      headers: { accept: "application/json" },
    });
    // console.log(res.data);
    return res.data.data;
  } catch (error) {
    console.log(error);
  }
};
