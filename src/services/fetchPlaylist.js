import { AxiosInstanceForYoutube } from "../config/axios";

export const fetchPlaylist = async () => {
  try {
    const res = await AxiosInstanceForYoutube.request({
      method: "GET",
      url: "/playlists",
      params: { page: "1", limit: "10" },
      headers: { accept: "application/json" },
    });
    // console.log(res.data);
    return res.data.data;
  } catch (error) {
    console.log(error);
  }
};
