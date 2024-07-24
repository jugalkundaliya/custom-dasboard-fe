import React, { useCallback, useContext, useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Container,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";
import { GlobalContext } from "../contexts/GlobalContext";
import axiosInstance from "../api/axios";

const AdminPage = () => {
  const [isAdmin, setIsAdmin] = useState();

  const { loading, setLoading } = useContext(GlobalContext);
  const [data, setData] = useState([]);
  const fetchData = useCallback(() => {
    setLoading(true);
    axiosInstance
      .get("/users")
      .then(({ data }) => {
        setData(data);
        setIsAdmin(true);
      })
      .catch((e) => {
        console.log({ e });
        setIsAdmin(false);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [setLoading]);

  useEffect(() => {
    fetchData();
  }, []);

  if (isAdmin === false) {
    return <Typography variant="h5">Access Denied</Typography>;
  }
  if (!isAdmin) {
    return null;
  }

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4">Admin Page</Typography>
      <Typography variant="body1" sx={{ mt: 2, mb: 6 }}>
        Welcome to the Admin page. Here you can manage everything.
      </Typography>
      <Container>
        <Typography variant="h4" component="h1" gutterBottom>
          User Activity
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Activity</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((item) => (
                <TableRow key={item._id}>
                  <TableCell>{item._id}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.email}</TableCell>
                  <TableCell>
                    {new Date(item.date).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{item.activity}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </Box>
  );
};

export default AdminPage;
