import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import "react-quill/dist/quill.snow.css";
import { Link, useNavigate } from "react-router-dom";
import { withAuth } from "../../components/WithAuth";
import AdminLayout from "../../layouts/AdminLayout";
import api from "../../lib/axios";
import Content from "./fragments/Content";

const AddNews = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [content, setContent] = useState(null);
  const toast = useToast();
  const navigate = useNavigate();

  const handleFileInputChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
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
      await api.post("/api/news/v1", formData).then(() => {
        toast({
          title: "Success add new news.",
          status: "success",
          position: "top",
          variant: "top-accent",
          duration: 3000,
          isClosable: true,
        });
        navigate("/news");
      });
    } catch (error) {
      toast({
        title: "failed add new news.",
        status: "error",
        position: "top",
        variant: "top-accent",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="container p-2 mx-auto sm:p-4">
        <h2 className="text-2xl font-semibold text-gray-900 mb-5">
          Tambah Berita
        </h2>
        <Link
          to={"/news"}
          className="px-5 py-2 rounded-md bg-green-700 text-white text-md font-medium tracking-wider"
        >
          Kembali
        </Link>
        <form className="mt-6" onSubmit={handleSubmit}>
          <FormControl mt={4} isRequired>
            <FormLabel>Title</FormLabel>
            <Input
              type="text"
              name="title"
              onChange={(e) => handleInputChange(e)}
            />
          </FormControl>
          <FormControl mt={4} isRequired>
            <FormLabel>Author</FormLabel>
            <Input
              type="text"
              name="author"
              onChange={(e) => handleInputChange(e)}
            />
          </FormControl>
          <FormControl mt={4} isRequired>
            <FormLabel>Category</FormLabel>
            <Select
              placeholder="Select category"
              onChange={(e) => handleInputChange(e)}
              name="category"
            >
              <option value={"sosial"}>Sosial</option>
              <option value={"bisnis"}>Bisnis</option>
              <option value={"sharing"}>Sharing</option>
              <option value={"edukasi"}>Edukasi</option>
              <option value={"lifestyle"}>Lifestyle</option>
              <option value={"world"}>World</option>
              <option value={"foods"}>Foods</option>
              <option value={"technology"}>Technology</option>
              <option value={"sports"}>Sports</option>
              <option value={"travel"}>Travel</option>
              <option value={"music"}>Music</option>
              <option value={"health"}>Health</option>
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
      </div>
    </AdminLayout>
  );
};

export default withAuth(AddNews);
