import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios, { AxiosError } from "axios";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Container,
  Alert,
} from "@mui/material";
import type { LoginData, AuthResponse, ErrorResponse } from "../types/auth";
import config from "../config";

const Login = () => {
  // СТРАНИЦА ВХОДА
  const [loginData, setLoginData] = useState<LoginData>({
    username: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Получаем предыдущий маршрут или используем '/deliveries' по умолчанию
  const from = location.state?.from?.pathname || "/deliveries";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // ОБНОВЛЕНИЕ ДАННЫХ ВХОДА
    const { name, value } = e.target;
    setLoginData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    // ОТПРАВКА ДАННЫХ ВХОДА
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post<AuthResponse>(
        config.api.baseUrl + "/auth/login/",
        loginData
      );

      localStorage.setItem("token", response.data.token);
      navigate(from, { replace: true });
    } catch (err) {
      const axiosError = err as AxiosError<ErrorResponse>;
      setError(axiosError.response?.data?.error || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="xs">
      <Paper elevation={3} sx={{ p: 4, mt: 8 }}>
        <Typography variant="h4" component="h1" align="center" gutterBottom>
          Login
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            margin="normal"
            label="Username"
            name="username"
            value={loginData.username}
            onChange={handleChange}
            required
          />

          <TextField
            fullWidth
            margin="normal"
            label="Password"
            name="password"
            type="password"
            value={loginData.password}
            onChange={handleChange}
            required
          />

          <Button
            fullWidth
            variant="contained"
            color="primary"
            type="submit"
            disabled={loading}
            sx={{ mt: 3 }}
          >
            {loading ? "Logging in..." : "Login"}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;
