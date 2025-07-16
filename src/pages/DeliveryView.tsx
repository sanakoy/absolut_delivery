import { useEffect, useState } from "react";
import { useDeliveryAPI } from "../hooks/useDeliveryAPI";
import {
  Autocomplete,
  Button,
  Divider,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useParams } from "react-router-dom";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import DeliveryDateTimePicker from "../components/DeliveryDateTimePicker";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { useServiceTypeAPI } from "../hooks/useServiceTypeAPI";
import { usePackageTypeAPI } from "../hooks/usePackageTypeAPI";
import MarkunreadMailboxIcon from "@mui/icons-material/MarkunreadMailbox";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import SettingsIcon from "@mui/icons-material/Settings";
import { useStatusAPI } from "../hooks/useStatusAPI.";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import CancelIcon from "@mui/icons-material/Cancel";
import SaveIcon from "@mui/icons-material/Save";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import { useTransportModelAPI } from "../hooks/useTransportModelAPI";

const DeliveryView: React.FC<{}> = () => {
  // СТРАНИЦА ПРОСМОТРА, УДАЛЕНИЯ И ОБНОВЛЕНИЯ ДОСТАВКИ
  const navigate = useNavigate();
  const { deliveryId } = useParams<{ deliveryId: string }>();
  const { getDelivery, delivery, setDelivery, updateDelivery, deleteDelivery } =
    useDeliveryAPI();
  const { getServiceTypes, serviceTypes } = useServiceTypeAPI();
  const { getPackageTypes, packageTypes } = usePackageTypeAPI();
  const { getTransportModels, transportModels } = useTransportModelAPI();
  const { getStatuses, statuses } = useStatusAPI();

  const [isEdit, setIsEdit] = useState<boolean>(false);
  const technicalConditions = [
    { id: 1, name: "Исправно" },
    { id: 2, name: "Неисправно" },
  ];

  const handleSave = async () => {
    // ОБНОВЛЕНИЕ ДОСТАВКИ
    await updateDelivery(delivery);
    setIsEdit(false);
  };

  const handleCompleteDelivery = async () => {
    // ПРОВЕДЕНИЕ ДОСТАВКИ
    for (const status of statuses) {
      if (status.name === "Проведено") {
        await updateDelivery({ status: status });
      }
    }
  };
  useEffect(() => {
    // ЗАГРУЗКА ВСЕХ ТИПОВ УСЛУГ, МОДЕЛЕЙ ТРАНСПОРТА, УПАКОВОК И СТАТУСОВ
    getDelivery(deliveryId);
    getServiceTypes();
    getPackageTypes();
    getTransportModels();
    getStatuses();
  }, [deliveryId]);

  const handleDeleteDelivery = async () => {
    // УДАЛЕНИЕ ДОСТАВКИ
    await deleteDelivery();
    navigate("-1");
  };

  return (
    <Stack
      sx={{
        display: "flex",
        alignItems: "center",
        marginTop: "40px",
        marginBottom: "40px",
      }}
    >
      <Stack sx={{ width: "60%" }} gap={2}>
        <Stack
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: 2,
            alignItems: "center",
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
            variant="h5"
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              gap: 2,
              alignItems: "center",
            }}
          >
            №
            <Autocomplete
              readOnly={!isEdit}
              sx={{ width: "30%" }}
              options={transportModels}
              getOptionLabel={(option) => option.name}
              value={
                transportModels.find(
                  (opt) => opt.id === delivery?.transport_model?.id
                ) || null
              }
              onChange={(_, newValue) => {
                setDelivery((prev: any) => ({
                  ...prev,
                  transport_model: newValue,
                }));
              }}
              loading={false}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Модель транспорта"
                  placeholder="Выберите модель транспорта"
                />
              )}
            />
          </Typography>
        </Stack>
        <Divider />
        <Stack gap={2}>
          <Stack
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
            gap={1}
          >
            <Stack
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
              gap={2}
            >
              <AccessTimeIcon sx={{ fontSize: 30 }} />
              <Typography variant="h6">Время в пути:</Typography>
            </Stack>
            <Stack gap={0.5} sx={{ display: "flex", flexDirection: "row" }}>
              <Typography
                variant="h6"
                sx={{ display: "flex", flexDirection: "row" }}
                gap={0.5}
              >
                {delivery?.delivery_duration} ч
              </Typography>
            </Stack>
          </Stack>
          <Stack
            gap={2}
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography>Отправка:</Typography>
            <DeliveryDateTimePicker
              label={"Дата и время отправки"}
              setDateDelivery={(newDate: any) => {
                setDelivery((prev: any) => ({
                  ...prev,
                  date_sending: newDate,
                }));
              }}
              isReadOnly={!isEdit}
              defaultValue={delivery?.date_sending}
            />
          </Stack>
          <Stack
            gap={2}
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography>Доставка:</Typography>
            <DeliveryDateTimePicker
              label={"Дата и время доставки"}
              setDateDelivery={(newDate: any) => {
                setDelivery((prev: any) => ({
                  ...prev,
                  date_delivery: newDate,
                }));
              }}
              isReadOnly={!isEdit}
              defaultValue={delivery?.date_delivery}
            />
          </Stack>
        </Stack>
        <Divider />
        <Stack
          gap={2}
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Stack
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
            gap={2}
          >
            <LocalShippingIcon sx={{ fontSize: 30 }} />
            <Typography variant="h6">Дистанция:</Typography>
          </Stack>
          <Stack
            gap={0.5}
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <TextField
              InputProps={{
                readOnly: !isEdit,
              }}
              value={delivery?.distance || ""}
              onChange={(e) => {
                setDelivery((prev: any) => ({
                  ...prev,
                  distance: e.target.value,
                }));
              }}
            />
            км
          </Stack>
        </Stack>
        <Divider />
        <Stack
          gap={2}
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Stack
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
            gap={2}
          >
            <InsertDriveFileIcon sx={{ fontSize: 30 }} />
            <Typography variant="h6">Медиафайл:</Typography>
          </Stack>
          <Stack gap={0.5} sx={{ display: "flex", flexDirection: "row" }}>
            <Typography
              variant="h6"
              sx={{ display: "flex", flexDirection: "row" }}
              gap={0.5}
            >
              {delivery?.file}
            </Typography>
          </Stack>
        </Stack>
        <Divider />
        <Stack
          gap={2}
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Stack
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
            gap={2}
          >
            <ErrorOutlineIcon sx={{ fontSize: 30 }} />
            <Typography variant="h6">Услуга:</Typography>
          </Stack>
          <Autocomplete
            readOnly={!isEdit}
            sx={{ width: "30%" }}
            options={serviceTypes}
            getOptionLabel={(option) => option.name}
            value={
              serviceTypes.find(
                (opt) => opt.id === delivery?.service_type?.id
              ) || null
            }
            onChange={(_, newValue) => {
              setDelivery((prev: any) => ({
                ...prev,
                service_type: newValue,
              }));
            }}
            loading={false}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Тип услуги"
                placeholder="Выберите тип услуги"
              />
            )}
          />
        </Stack>
        <Divider />
        <Stack
          gap={2}
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Stack
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
            gap={2}
          >
            <MarkunreadMailboxIcon sx={{ fontSize: 30 }} />
            <Typography variant="h6">Тип упаковки:</Typography>
          </Stack>
          <Autocomplete
            readOnly={!isEdit}
            sx={{ width: "30%" }}
            options={packageTypes}
            getOptionLabel={(option) => option.name}
            value={
              packageTypes.find(
                (opt) => opt.id === delivery?.package_type?.id
              ) || null
            }
            onChange={(_, newValue) => {
              setDelivery((prev: any) => ({
                ...prev,
                package_type: newValue,
              }));
            }}
            loading={false}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Тип упаковки"
                placeholder="Выберите тип упаковки"
              />
            )}
          />
        </Stack>
        <Divider />
        <Stack
          gap={2}
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Stack
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
            gap={2}
          >
            <AutorenewIcon sx={{ fontSize: 30 }} />
            <Typography variant="h6">Статус доставки:</Typography>
          </Stack>
          {/* <Stack gap={0.5} sx={{ display: "flex", flexDirection: "row" }}> */}
          {isEdit ? (
            <Autocomplete
              readOnly={!isEdit}
              sx={{ width: "30%" }}
              options={statuses}
              getOptionLabel={(option) => option.name}
              value={
                statuses.find((opt) => opt.id === delivery?.status?.id) || null
              }
              onChange={(_, newValue) => {
                setDelivery((prev: any) => ({
                  ...prev,
                  status: newValue,
                }));
              }}
              loading={false}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Статус доставки"
                  placeholder="Выберите статус доставки"
                />
              )}
            />
          ) : (
            <>
              {delivery?.status?.name === "В ожидании" ? (
                <Stack
                  sx={{
                    borderRadius: "15px",
                    background: "#c98f42",
                    color: "#faf6af",
                    padding: "5px",
                    whiteSpace: "nowrap",
                  }}
                >
                  {delivery?.status?.name}
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
                  {delivery?.status?.name}
                </Stack>
              )}
            </>
          )}
          {/* </Stack> */}
        </Stack>
        <Divider />
        <Stack
          gap={2}
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Stack
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
            gap={2}
          >
            <SettingsIcon sx={{ fontSize: 30 }} />
            <Typography variant="h6">Тех. исправность:</Typography>
          </Stack>
          {isEdit ? (
            <Autocomplete
              readOnly={!isEdit}
              sx={{ width: "30%" }}
              options={technicalConditions}
              getOptionLabel={(option) => option.name}
              value={
                technicalConditions.find(
                  (opt) => opt.name === delivery?.technical_condition
                ) || null
              }
              onChange={(_, newValue) => {
                setDelivery((prev: any) => ({
                  ...prev,
                  technical_condition: newValue?.name,
                }));
              }}
              loading={false}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Техническое состояние"
                  placeholder="Выберите техническое состояние"
                />
              )}
            />
          ) : (
            <>
              {delivery?.technical_condition === "Неисправно" ? (
                <Stack
                  sx={{
                    borderRadius: "15px",
                    background: "#b84040",
                    color: "#e3b1b1",
                    padding: "5px",
                    whiteSpace: "nowrap",
                  }}
                >
                  {delivery?.technical_condition}
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
                  {delivery?.technical_condition}
                </Stack>
              )}
            </>
          )}
        </Stack>
        <Divider />
        <Stack
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: 2,
            justifyContent: "center",
          }}
        >
          {isEdit ? (
            <>
              <Button
                startIcon={<SaveIcon />}
                variant="contained"
                onClick={handleSave}
              >
                Сохранить
              </Button>
              <Button
                startIcon={<CancelIcon />}
                variant="contained"
                onClick={() => setIsEdit(false)}
                color="inherit"
              >
                Отмена
              </Button>
            </>
          ) : (
            <>
              <Button
                startIcon={<EditIcon />}
                variant="contained"
                onClick={() => setIsEdit(true)}
              >
                Редактировать
              </Button>
              <Button
                startIcon={<CheckIcon />}
                variant="contained"
                onClick={handleCompleteDelivery}
                color="success"
              >
                Провести
              </Button>
              <Button
                startIcon={<DeleteIcon />}
                variant="contained"
                onClick={handleDeleteDelivery}
                color="error"
              >
                Удалить
              </Button>
            </>
          )}
        </Stack>
      </Stack>
    </Stack>
  );
};

export default DeliveryView;
