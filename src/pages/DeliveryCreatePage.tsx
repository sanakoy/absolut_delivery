import {
  Autocomplete,
  Divider,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useServiceTypeAPI } from "../hooks/useServiceTypeAPI";
import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import { useDeliveryAPI } from "../hooks/useDeliveryAPI";
import { useTransportModelAPI } from "../hooks/useTransportModelAPI";
import { usePackageTypeAPI } from "../hooks/usePackageTypeAPI";
import { useStatusAPI } from "../hooks/useStatusAPI.";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import MarkunreadMailboxIcon from "@mui/icons-material/MarkunreadMailbox";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import SettingsIcon from "@mui/icons-material/Settings";
import DeliveryDateTimePicker from "../components/DeliveryDateTimePicker";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useNavigate } from "react-router-dom";

const technicalConditions = [
  { id: 1, name: "Исправно" },
  { id: 2, name: "Неисправно" },
];

const DeliveryCreatePage: React.FC<{}> = () => {
  // СТРАНИЦА СОЗДАНИЯ ДОСТАВКИ
  const navigate = useNavigate();

  const {
    serviceTypes,
    getServiceTypes,
    loading: serviceTypesLoading,
  } = useServiceTypeAPI();
  const {
    transportModels,
    getTransportModels,
    loading: transportModelsLoading,
  } = useTransportModelAPI();
  const {
    packageTypes,
    getPackageTypes,
    loading: packageTypesLoading,
  } = usePackageTypeAPI();
  const [selectedServiceType, setSelectedServiceType] = useState<any>(null);
  const [selectedTransportModel, setSelectedTransportModel] =
    useState<any>(null);
  const [selectedPackageType, setSelectedPackageType] = useState<any>(null);
  const [dateSending, setDateSending] = useState<any>(null);
  const [dateDelivery, setDateDelivery] = useState<any>(null);
  const [distance, setDistance] = useState<any>(null);
  const { createDelivery, setNewDelivery } = useDeliveryAPI();
  const { statuses, getStatuses, loading: statusesLoading } = useStatusAPI();
  const [selectedStatus, setSelectedStatus] = useState<any>(null);

  const [selectedTechnicalCondition, setSelectedTechnicalCondition] =
    useState<any>(null);

  const handleSave = () => {
    // СОЗДАНИЕ ДОСТАВКИ
    createDelivery();
    navigate(-1);
  };

  useEffect(() => {
    // ЗАГРУЗКА ВСЕХ ТИПОВ УСЛУГ, МОДЕЛЕЙ ТРАНСПОРТА, УПАКОВОК И СТАТУСОВ
    getServiceTypes();
    getTransportModels();
    getPackageTypes();
    getStatuses();
  }, []);

  const handleAddServiceType = (_: any, newValue: any) => {
    // ДОБАВЛЕНИЕ ТИПА УСЛУГИ К ДОСТАВКЕ
    if (!newValue) return;
    setSelectedServiceType(newValue);
    setNewDelivery((prev: any) => ({
      ...prev,
      service_type: newValue?.id,
    }));
  };

  const handleAddTransportModel = (_: any, newValue: any) => {
    // ДОБАВЛЕНИЕ МОДЕЛИ ТРАНСПОРТА К ДОСТАВКЕ
    if (!newValue) return;
    setSelectedTransportModel(newValue);
    setNewDelivery((prev: any) => ({
      ...prev,
      transport_model: newValue?.id,
    }));
  };

  const handleAddPackageType = (_: any, newValue: any) => {
    // ДОБАВЛЕНИЕ ТИПА УПАКОВКИ К ДОСТАВКЕ
    if (!newValue) return;
    setSelectedPackageType(newValue);
    setNewDelivery((prev: any) => ({
      ...prev,
      package_type: newValue?.id,
    }));
  };

  const handleAddDistance = (e: any) => {
    // ДОБАВЛЕНИЕ ДИСТАНЦИИ К ДОСТАВКЕ
    setDistance(e.target.value);
    setNewDelivery((prev: any) => ({
      ...prev,
      distance: e.target.value,
    }));
  };

  const handleAddTechnicalCondition = (_: any, newValue: any) => {
    // ДОБАВЛЕНИЕ ТЕХНИЧЕСКОГО СОСТОЯНИЯ К ДОСТАВКЕ
    if (!newValue) return;
    setSelectedTechnicalCondition(newValue);
    setNewDelivery((prev: any) => ({
      ...prev,
      technical_condition: newValue?.name,
    }));
  };

  const handleAddStatus = (_: any, newValue: any) => {
    // ДОБАВЛЕНИЕ СТАТУСА К ДОСТАВКЕ
    if (!newValue) return;
    setSelectedStatus(newValue);
    setNewDelivery((prev: any) => ({
      ...prev,
      status: newValue?.id,
    }));
  };
  useEffect(() => {
    // ДОБАВЛЕНИЕ ДАТЫ ОТПРАВКИ К ДОСТАВКЕ
    if (!dateSending) return;
    setNewDelivery((prev: any) => ({
      ...prev,
      date_sending: dateSending,
    }));
  }, [dateSending]);

  useEffect(() => {
    // ДОБАВЛЕНИЕ ДАТЫ ДОСТАВКИ К ДОСТАВКЕ
    if (!dateDelivery) return;
    setNewDelivery((prev: any) => ({
      ...prev,
      date_delivery: dateDelivery,
    }));
  }, [dateDelivery]);

  return (
    <Stack sx={{ marginTop: "40px" }} gap={2}>
      <Stack
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: 2,
          alignItems: "center",
          marginLeft: "20px",
        }}
      >
        <Button
          color="inherit"
          variant="contained"
          startIcon={<ArrowBackIosIcon sx={{ fontSize: 30 }} />}
          onClick={() => navigate("-1")}
          sx={{ padding: "20px 5px 20px 20px" }}
        />
        <Typography
          sx={{ display: "flex", justifyContent: "center" }}
          variant="h5"
        >
          Создание доставки
        </Typography>
      </Stack>
      <Divider />
      <Stack sx={{ display: "flex", alignItems: "center" }}>
        <Stack gap={2}>
          <Stack
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: 2,
              alignItems: "center",
            }}
          >
            <Typography variant="h6">№</Typography>
            <Autocomplete
              sx={{ width: "50%" }}
              options={transportModels}
              getOptionLabel={(option) => option.name}
              value={selectedTransportModel}
              onChange={handleAddTransportModel}
              loading={transportModelsLoading}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Модель транспорта"
                  placeholder="Выберите модель транспорта"
                />
              )}
            />
          </Stack>
          <Stack
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: 2,
              alignItems: "center",
            }}
          >
            <ErrorOutlineIcon />
            <Autocomplete
              sx={{ width: "50%" }}
              options={serviceTypes}
              getOptionLabel={(option) => option.name}
              value={selectedServiceType}
              onChange={handleAddServiceType}
              loading={serviceTypesLoading}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Тип услуги"
                  placeholder="Выберите тип услуги"
                />
              )}
            />
          </Stack>
          <Stack
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: 2,
              alignItems: "center",
            }}
          >
            <MarkunreadMailboxIcon />
            <Autocomplete
              sx={{ width: "50%" }}
              options={packageTypes}
              getOptionLabel={(option) => option.name}
              value={selectedPackageType}
              onChange={handleAddPackageType}
              loading={packageTypesLoading}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Тип упаковки"
                  placeholder="Выберите тип упаковки"
                />
              )}
            />
          </Stack>
          <Stack
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: 2,
              alignItems: "center",
            }}
          >
            <AccessTimeIcon />
            <DeliveryDateTimePicker
              label={"Дата и время отправки"}
              setDateDelivery={setDateSending}
              isReadOnly={false}
              defaultValue={dateSending}
            />
            <DeliveryDateTimePicker
              label={"Дата и время доставки"}
              setDateDelivery={setDateDelivery}
              isReadOnly={false}
              defaultValue={dateDelivery}
            />
          </Stack>
          <Stack
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: 2,
              alignItems: "center",
            }}
          >
            <LocalShippingIcon />
            <TextField
              sx={{ width: "50%" }}
              label="Дистанция"
              type="number"
              value={distance}
              onChange={handleAddDistance}
              placeholder="Введите дистанцию"
              inputProps={{
                min: 0,
              }}
            />
          </Stack>
          <Stack
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: 2,
              alignItems: "center",
            }}
          >
            <SettingsIcon />
            <Autocomplete
              sx={{ width: "50%" }}
              options={technicalConditions}
              getOptionLabel={(option) => option.name}
              value={selectedTechnicalCondition}
              onChange={handleAddTechnicalCondition}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Техническое состояние"
                  placeholder="Выберите техническое состояние"
                />
              )}
            />
          </Stack>
          <Stack
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: 2,
              alignItems: "center",
            }}
          >
            <AutorenewIcon />
            <Autocomplete
              sx={{ width: "50%" }}
              options={statuses}
              getOptionLabel={(option) => option.name}
              value={selectedStatus}
              onChange={handleAddStatus}
              loading={statusesLoading}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Статус"
                  placeholder="Выберите статус"
                />
              )}
            />
          </Stack>
          <Stack sx={{ display: "flex", alignItems: "center" }}>
            <Button
              variant="contained"
              startIcon={<SaveIcon />}
              sx={{ width: "150px" }}
              onClick={handleSave}
            >
              Сохранить
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default DeliveryCreatePage;
