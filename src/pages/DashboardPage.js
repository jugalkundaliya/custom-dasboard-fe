import React, { useCallback, useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
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
import axiosInstance from "../api/axios";
import { GlobalContext } from "../contexts/GlobalContext";

const DashboardPage = () => {
  const { userData } = useSelector((state) => state.auth);
  const { loading, setLoading } = useContext(GlobalContext);
  const [data, setData] = useState([]);
  const fetchData = useCallback(() => {
    setLoading(true);
    axiosInstance
      .get("/dashboard")
      .then(({ data }) => {
        setData(data);
      })
      .catch((e) => {
        console.log({ e });
      })
      .finally(() => {
        setLoading(false);
      });
  }, [setLoading]);
  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <CircularProgress />;
  }
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4">Dashboard</Typography>
      <Typography variant="h6" sx={{ mt: 2 }}>
        Welcome, {userData?.username}
      </Typography>
      <Box sx={{ mt: 2 }}>
        <Container>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Phone</TableCell>
                  <TableCell>Company</TableCell>
                  <TableCell>Job Title</TableCell>
                  <TableCell>Created At</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.email}</TableCell>
                    <TableCell>{item.phone}</TableCell>
                    <TableCell>{item.company}</TableCell>
                    <TableCell>{item.jobTitle}</TableCell>
                    <TableCell>
                      {new Date(item.createdAt).toLocaleDateString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
      </Box>
    </Box>
  );
};

export default DashboardPage;
