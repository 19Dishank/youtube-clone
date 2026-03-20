import { AxiosInstanceForYoutube } from "../config/axios";

export const fetchPlaylistDetails = async (
  limit = 20,
  page = 1,
  playlistId = "PLRAV69dS1uWSx4erHGq8hW_GE-Eaj60r-",
) => {
  try {
    const res = await AxiosInstanceForYoutube.request({
      method: "GET",
      url: `/playlists/${playlistId}`,
      params: {
        page,
        limit,
      },
      headers: { accept: "application/json" },
    });
    console.log(res.data);
    return res.data.data;
  } catch (error) {
    console.log(error);
  }
};
