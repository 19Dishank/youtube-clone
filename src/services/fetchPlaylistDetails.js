import { AxiosInstanceForYoutube } from "../config/axios";

export const fetchPlaylistDetails = async (
  playlistId,
  limit = 20,
  page = 1,
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
    // console.log(playlistId);
    // console.log(res.data);
    return res.data.data;
  } catch (error) {
    console.log(error);
  }
};
