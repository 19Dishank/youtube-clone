import { AxiosInstanceForYoutube } from "../config/axios";

export const fetchChanelData = async () => {
  try {
    const res = await AxiosInstanceForYoutube.request({
      method: "GET",
      url: "/channel",
      headers: { accept: "application/json" },
    });
    // console.log(res.data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
