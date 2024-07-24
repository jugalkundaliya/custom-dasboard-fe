import React, { useContext, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../redux/slices/authSlice";
import { TextField, Box, Typography, Container } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import axiosInstance from "../api/axios";
import { GlobalContext } from "../contexts/GlobalContext";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, setLoading } = useContext(GlobalContext);

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    axiosInstance
      .post("/signin", { email: username, password })
      .then((data) => {
        localStorage.setItem(
          "token",
          data.data.AuthenticationResult.AccessToken
        );
        localStorage.setItem("userData", JSON.stringify({ username }));
        dispatch(
          login({
            userData: { username },
          })
        );
        navigate("/dashboard");
      })
      .catch((e) => {
        console.log({ e });
      })
      .finally(() => setLoading(false));
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <form
          onSubmit={handleSubmit}
          style={{ width: "100%", marginTop: "1rem" }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            type="password"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <LoadingButton
            type="submit"
            fullWidth
            loading={loading}
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Login
          </LoadingButton>
        </form>
      </Box>
    </Container>
  );
};

export default LoginPage;
