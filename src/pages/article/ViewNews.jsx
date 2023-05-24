import { Image } from "@chakra-ui/react";
import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import api from "../../lib/axios";
import "./../../styles/styles.css";

const ViewNews = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    api.get(`/api/news/v1/${id}`).then((res) => {
      setLoading(true);
      setData(res.data.data);
      setLoading(false);
    });
  }, [id]);
  return (
    <React.Fragment>
      <div className="bg-gray-50">
        {loading && (
          <div className="spinner w-full bg-blue-300 flex justify-center">
            <ClipLoader color="#3182ce" className="absolute top-1/4 left-1/2" />
          </div>
        )}
        {data && (
          <div className="max-w-4xl px-6 py-16 mx-auto space-y-12">
            <article className="space-y-8 text-gray-900">
              <Link to={"/"} className={"underline text-blue-500"}>
                Kembali
              </Link>
              <div className="space-y-6">
                <Image src={data.image.image_url} />
                <h1 className="text-4xl font-bold md:tracking-tight md:text-5xl">
                  {data.title}
                </h1>
                <div className="flex flex-col items-start justify-between w-full md:flex-row md:items-center ">
                  <div className="flex items-center md:space-x-2">
                    <p className="text-sm">
                      {data.author} •{" "}
                      {format(new Date(data.createdAt), "do MMMM Y")}
                    </p>
                  </div>
                  <p className="flex-shrink-0 mt-3 text-sm md:mt-0">
                    4 min read • 1,570 views
                  </p>
                </div>
              </div>
              <div
                className="content"
                dangerouslySetInnerHTML={{ __html: data.content }}
              ></div>
            </article>
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

export default ViewNews;
