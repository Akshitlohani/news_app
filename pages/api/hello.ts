import type { NextApiRequest, NextApiResponse } from "next";
import axios, { AxiosResponse } from "axios";

type Data = {
  data: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const category = (req.query.url as string) || "";
  console.log(category);
  let result1 = "not found";
  await axios
    .get(
      `https://newsapi.org/v2/top-headlines?country=in&category=${category.toLowerCase()}&apiKey=57aa688d1b0b4efd8de6798717986003&pageSize=10`
    )
    .then((result: AxiosResponse<any, any>) => {
      const data1: any = result.data;
      result1 = data1;
    })
    .catch((error: any) => {
      result1 = error;
    });
  res.status(200).json({ data: result1 });
}
