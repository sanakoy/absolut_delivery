import React, { useState, useEffect } from "react";
import { Autocomplete, TextField, Box } from "@mui/material";
import { useServiceTypeAPI } from "../hooks/useServiceTypeAPI";
import DeliveryDateTimePicker from "./DeliveryDateTimePicker";

const Filters: React.FC<{
  getDeliveries: Function;
}> = ({ getDeliveries }) => {
  // ФИЛТРЫ ДЛЯ ТИПОВ УСЛГУ И ДАТЫ ДОСТАВКИ
  const [selectedServiceType, setSelectedServiceType] = useState<any>(null);
  const [queryParams, setQueryParams] = useState<string | null>(null);
  const { getServiceTypes, serviceTypes, loading } = useServiceTypeAPI();
  const [dateDelivery, setDateDelivery] = useState<any>(null);
  const onSelectionChange = (newValue: any) => {
    setSelectedServiceType(newValue);
  };

  useEffect(() => {
    getServiceTypes();
  }, []);

  useEffect(() => {
    // ПОСТРОЕНИЕ ПАРАМЕТРОВ ДЛЯ ЗАПРОСА
    let queryParamsList = [];
    if (selectedServiceType) {
      queryParamsList.push(`service_type=${selectedServiceType.id}`);
    }
    if (dateDelivery) {
      queryParamsList.push(`date_delivery=${dateDelivery}`);
    }
    const queryParamsString = queryParamsList.join("&");
    setQueryParams(queryParamsString);
  }, [selectedServiceType, dateDelivery]);

  useEffect(() => {
    // ЗАПРОС ДОСТАВОК С ПОЛЬЗОАВТЕЛЬСКИМИ ПАРАМЕТРАМИ
    getDeliveries(queryParams);
  }, [queryParams]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        gap: 2,
        alignItems: "center",
        width: "50%",
      }}
    >
      <Autocomplete
        sx={{
          width: "50%",
        }}
        options={serviceTypes}
        getOptionLabel={(option) => option.name}
        value={selectedServiceType}
        onChange={(_, newValue) => onSelectionChange(newValue)}
        loading={loading}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Тип услуги"
            placeholder="Выберите тип услуги"
          />
        )}
      />
      <DeliveryDateTimePicker
        label={"Дата и время доставки"}
        setDateDelivery={setDateDelivery}
        isReadOnly={false}
        defaultValue={null}
      />
    </Box>
  );
};

export default Filters;
