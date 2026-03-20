import { AxiosInstanceForYoutube } from "../config/axios";

export const fetchComments = async () => {
  try {
    const res = await AxiosInstanceForYoutube.request({
      method: "GET",
      url: "/comments/cv-6bAeYsOY",
      headers: { accept: "application/json" },
    });

    return res.data.data;
  } catch (error) {
    console.log(error);
  }
};
