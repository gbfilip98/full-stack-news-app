import axios from "axios";
import { Response } from "express";
import { INewsApiResponse } from "../types/Article";
import { IAuthRequest } from "../types/Auth";
import dotenv from "dotenv";

dotenv.config();

export const getArticles = async (req: IAuthRequest, res: Response) => {
  const { page, pageSize, q, category } = req.query;

  try {
    const response = await axios.get<INewsApiResponse>(
      process.env.NEWS_API_URL!,
      {
        params: {
          q: q || "a", // default q for NewsAPI is "a"
          category: category,
          pageSize: pageSize,
          page: page,
          apiKey: process.env.NEWS_API_KEY,
        },
        headers: {
          Accept: "application/json",
        },
      }
    );

    res.status(201).json(response.data);
  } catch (err: unknown) {
    let errorMessage = "";

    if (err instanceof Error) {
      errorMessage = err.message;
    } else {
      errorMessage = "Failed to fetch news articles.";
    }

    res.status(500).json({ message: errorMessage });
  }
};
