import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import "react-quill/dist/quill.snow.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { withAuth } from "../../components/WithAuth";
import AdminLayout from "../../layouts/AdminLayout";
import api from "../../lib/axios";
import Content from "./fragments/Content";

const UpdateNews = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [content, setContent] = useState(null);
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    api.get(`/api/news/v1/${id}`).then((res) => {
      setLoading(true);
      setData(res.data.data);
      setContent(res.data.data.content);
      setLoading(false);
    });
  }, [id]);

  const handleFileInputChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("category", data.category);
    formData.append("author", data.author);
    formData.append("content", content);

    if (selectedFile != null) {
      formData.append("image", selectedFile);
    }

    for (var pair of formData.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }

    try {
      await api.put(`/api/news/v1/${data._id}`, formData);
      toast({
        title: "Success updating news item.",
        status: "success",
        position: "top",
        variant: "top-accent",
        duration: 3000,
        isClosable: true,
      });
      navigate("/");
    } catch (error) {
      toast({
        title: "Error updating news item.",
        description: error.message,
        status: "error",
        position: "top",
        variant: "top-accent",
        duration: 3000,
        isClosable: true,
      });
    }
    setLoading(false);
  };

  return (
    <AdminLayout>
      <div className="container p-2 mx-auto sm:p-4">
        <h2 className="text-2xl font-semibold text-gray-900 mb-5">
          Update News
        </h2>
        <Link
          to={"/"}
          className="px-5 py-2 rounded-md bg-green-700 text-white text-md font-medium tracking-wider"
        >
          Kembali
        </Link>
        {loading && (
          <div className="spinner w-full bg-blue-300  flex justify-center">
            <ClipLoader color="#3182ce" className="absolute top-1/4 left-1/2" />
          </div>
        )}
        {data && (
          <form className="mt-6" onSubmit={handleSubmit}>
            <FormControl mt={4} isRequired>
              <FormLabel>Title</FormLabel>
              <Input
                type="text"
                name="title"
                value={data.title}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl mt={4} isRequired>
              <FormLabel>Author</FormLabel>
              <Input
                type="text"
                name="author"
                value={data.author}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl mt={4} isRequired>
              <FormLabel>Category</FormLabel>
              <Select
                placeholder="Select category"
                value={data.category}
                onChange={(e) => handleInputChange(e)}
                name="category"
              >
                <option value={"football"}>Football</option>
              <option value={"volly"}>Volly</option>
              <option value={"badminton"}>Badminton</option>
              <option value={"basket"}>Basket</option>
              </Select>
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Image</FormLabel>
              <Input
                type="file"
                name="image"
                onChange={(e) => handleFileInputChange(e)}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Content</FormLabel>
              <Content theme="snow" value={content} onChange={setContent} />
            </FormControl>

            <Button mt={4} colorScheme="blue" isLoading={loading} type="submit">
              Submit
            </Button>
          </form>
        )}
      </div>
    </AdminLayout>
  );
};

export default withAuth(UpdateNews);
