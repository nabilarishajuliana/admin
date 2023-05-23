import axios from "../../../lib/axios";

export const fetchNews = async () => {
  try {
    const news = await axios.get("/api/news/v1?quantity=50");

    return Promise.resolve({
      status: "success",
      data: news.data.data,
    });
  } catch (err) {
    return Promise.resolve(err);
  }
};
