import { DeleteIcon, EditIcon, ViewIcon } from "@chakra-ui/icons";
import {
  Button,
  Image,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { withAuth } from "../../components/WithAuth";
import AdminLayout from "../../layouts/AdminLayout";
import api from "../../lib/axios";
import { fetchNews } from "./api/apiHandler";

const News = () => {
  const [datas, setDatas] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const toast = useToast();

  const fetchDatas = async () => {
    try {
      const res = await fetchNews();
      setDatas(res.data);
      toast({
        title: "Success get news.",
        status: "success",
        position: "top",
        variant: "top-accent",
        duration: 3000,
        isClosable: true,
      });
    } catch (err) {
      toast({
        title: "Failed get news.",
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

  useEffect(() => {
    fetchDatas();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDelete = async (event, id) => {
    event.preventDefault();

    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        setLoadingDelete(true);
        await api.delete(`/api/news/v1/${id}`).then(() => {
          toast({
            title: "Success delete news.",
            status: "success",
            position: "top",
            variant: "top-accent",
            duration: 3000,
            isClosable: true,
          });
        });
      } catch (err) {
        toast({
          title: "Failed delete news.",
          status: "error",
          position: "top",
          variant: "top-accent",
          duration: 3000,
          isClosable: true,
        });
      } finally {
        setLoadingDelete(false);
      }
    }
  };

  return (
    <AdminLayout>
      <div className="container p-2 mx-auto sm:p-4">
        <h2 className="mb-4 text-2xl font-semibold leading-tight">Data News</h2>
        <Link
          to={"/new"}
          className="px-5 py-2 rounded-md bg-green-700 text-white text-md font-medium tracking-wider"
        >
          Tambah
        </Link>
        {loading && (
          <div className="spinner w-full bg-blue-300  flex justify-center">
            <ClipLoader color="#F97C24" className="absolute top-1/4 left-1/2" />
          </div>
        )}
        <TableContainer mt={6}>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>No.</Th>
                <Th>Image</Th>
                <Th>Title</Th>
                <Th>Category</Th>
                <Th>Author</Th>
                <Th>Action</Th>
              </Tr>
            </Thead>
            {datas && (
              <Tbody>
                {datas.map((item, index) => {
                  return (
                    <Tr key={item._id}>
                      <Td>{index + 1}</Td>
                      <Td>
                        <Image
                          boxSize="100px"
                          objectFit="cover"
                          src={item.image.image_url}
                          alt="Dan Abramov"
                        />
                      </Td>
                      <Td>{item.title}</Td>
                      <Td>{item.category}</Td>
                      <Td>{item.author}</Td>
                      <Td>
                        <Link to={"/view/" + item._id}>
                          <Button colorScheme="blue" type="button" mx={2}>
                            <ViewIcon />
                          </Button>
                        </Link>

                        <Link to={"/edit/" + item._id}>
                          <Button colorScheme="green" type="button" mx={2}>
                            <EditIcon />
                          </Button>
                        </Link>

                        <Button
                          colorScheme="red"
                          isLoading={loadingDelete}
                          type="submit"
                          onClick={(event) => handleDelete(event, item._id)}
                        >
                          <DeleteIcon />
                        </Button>
                      </Td>
                    </Tr>
                  );
                })}
              </Tbody>
            )}
          </Table>
        </TableContainer>
      </div>
    </AdminLayout>
  );
};

export default withAuth(News);
