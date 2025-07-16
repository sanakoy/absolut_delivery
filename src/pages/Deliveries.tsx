import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Typography,
  Container,
  Stack,
  Box,
  Divider,
  Button,
  useTheme,
} from "@mui/material";
import { useDeliveryAPI } from "../hooks/useDeliveryAPI";
import MarkunreadMailboxIcon from "@mui/icons-material/MarkunreadMailbox";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import Filters from "../components/Filters";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import AddIcon from "@mui/icons-material/Add";

const Deliveries = () => {
  // ВЫВОД ВСЕХ ДОСТАВОК
  const theme = useTheme();
  const navigate = useNavigate();
  const { getDeliveries, deliveries, loading } = useDeliveryAPI();

  useEffect(() => {
    getDeliveries();
  }, []);

  useEffect(() => {
    // ПРОВЕРКА АВТОРИЗАЦИИ
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }
  }, [navigate]);

  const handleLogout = () => {
    // УДАЛЕНИЕ ТОКЕНА, ВЫХОД ИЗ АККАУНТА
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (loading) {
    // ДЕФОЛТНАЯ СТРАНИЦА ПРИ ЗАГРУЗКЕ ДОСТАВОК
    return (
      <Container
        maxWidth="md"
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Typography variant="h6">Загрузка...</Typography>
      </Container>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Stack
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: 2,
          width: "100%",
          justifyContent: "space-between",
          padding: "20px 20px",
          position: "fixed",
          backgroundColor: theme.palette.background.default,
        }}
      >
        <Stack
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: 2,
            width: "50%",
          }}
        >
          <Filters getDeliveries={getDeliveries} />
          <Button
            variant="contained"
            onClick={() => navigate("/delivery/create")}
            startIcon={<AddIcon />}
          >
            Добавить
          </Button>
        </Stack>
        <Button color="inherit" variant="contained" onClick={handleLogout}>
          Выйти
        </Button>
      </Stack>
      <Stack sx={{ width: "800px", marginTop: "100px" }} gap={2}>
        <Box maxWidth="md" width="100%">
          {deliveries.length > 0 ? (
            deliveries.map((delivery) => (
              <Stack
                key={delivery.id}
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
                gap={4}
                onClick={() => navigate(`/delivery/${delivery.id}`)}
              >
                <Stack
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                  }}
                  gap={4}
                >
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    №{delivery.transport_model}
                  </Typography>
                  <Stack
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                    gap={2}
                  >
                    <Stack
                      sx={{ display: "flex", flexDirection: "row", gap: 2 }}
                    >
                      <Stack
                        sx={{ display: "flex", flexDirection: "row" }}
                        gap={0.5}
                      >
                        <LocalShippingIcon />
                        <Box sx={{ display: "flex", flexWrap: "nowrap" }}>
                          <Box>{delivery.distance}</Box> <Box>км</Box>
                        </Box>
                      </Stack>

                      <Stack
                        sx={{ display: "flex", flexDirection: "row" }}
                        gap={0.5}
                      >
                        <AccessTimeIcon />
                        {delivery.delivery_duration_hours}ч
                      </Stack>
                      <Stack
                        sx={{ display: "flex", flexDirection: "row" }}
                        gap={0.5}
                      >
                        <MarkunreadMailboxIcon />
                        {delivery.package_type}
                      </Stack>
                      <Stack
                        sx={{ display: "flex", flexDirection: "row" }}
                        gap={0.5}
                      >
                        <ErrorOutlineIcon />
                        {delivery.service_type}
                      </Stack>
                    </Stack>

                    <Stack
                      sx={{ display: "flex", flexDirection: "row" }}
                      gap={2}
                    >
                      {delivery.status === "В ожидании" ? (
                        <Stack
                          sx={{
                            borderRadius: "15px",
                            background: "#c98f42",
                            color: "#faf6af",
                            padding: "5px",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {delivery.status}
                        </Stack>
                      ) : (
                        <Stack
                          sx={{
                            borderRadius: "15px",
                            background: "#4e964f",
                            color: "#ace6ad",
                            padding: "5px",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {delivery.status}
                        </Stack>
                      )}
                      {delivery.technical_condition === "Неисправно" ? (
                        <Stack
                          sx={{
                            borderRadius: "15px",
                            background: "#b84040",
                            color: "#e3b1b1",
                            padding: "5px",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {delivery.technical_condition}
                        </Stack>
                      ) : (
                        <Stack
                          sx={{
                            borderRadius: "15px",
                            background: "#4e964f",
                            color: "#ace6ad",
                            padding: "5px",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {delivery.technical_condition}
                        </Stack>
                      )}
                    </Stack>
                  </Stack>

                  <Divider sx={{ color: "black" }} />
                </Stack>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <ArrowForwardIosIcon />
                </Box>
              </Stack>
            ))
          ) : (
            <Typography variant="h6">Нет доступных доствок</Typography>
          )}
        </Box>
      </Stack>
    </Box>
  );
};

export default Deliveries;
