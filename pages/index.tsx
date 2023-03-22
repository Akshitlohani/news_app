import axios, { AxiosResponse } from "axios";
import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { useEffect, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [healthdata, sethealthdata] = useState<any>([]);
  const abc = async (category: string) => {
    const result = {};
    await axios
      .get(`/api/hello?category=${category}`)
      .then((result: AxiosResponse<any, any>) => {
        const data: any = result.data.data;
        sethealthdata(data.articles);
        result = data;
      })
      .catch((error: any) => {
        console.log(error);
      });
    return result;
  };
  const renderhealthdata = () => {
    console.log(healthdata);
    return (
      healthdata &&
      healthdata.length > 0 &&
      healthdata.map((data: any, index: number) => {
        return (
          <div key={index}>
            <h1>{data.title}</h1>
            <img src={data.urlToImage} />
          </div>
        );
      })
    );
  };
  useEffect(() => {
    abc("buisness");
  }, []);

  return (
    <>
      <Head>
        <title>News app</title>
      </Head>
      <main className={styles.main}>{renderhealthdata()}</main>
    </>
  );
}
