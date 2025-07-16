import axios from "axios";
import { useState } from "react";
import config from "../config";

export const useTransportModelAPI = () => {
  // ХУК ДЛЯ РАБОТЫ С МОДЕЛЯМИ ТРАНСПОРТА
  const [loading, setLoading] = useState<boolean>(true);

  const [transportModels, setTransportModels] = useState<any[]>([]);
  async function getTransportModels(query_params: string | null = null) {
    // ЗАПРОС ВСЕХ МОДЕЛЕЙ ТРАНСПОРТА
    let url = config.api.baseUrl + "transport-model";
    if (query_params) {
      url += `?${query_params}`;
    }
    const response = await axios.get(url, {
      headers: {
        Authorization: `Token ${localStorage.getItem("token")}`,
      },
    });
    setTransportModels(response.data);
    setLoading(false);
  }
  return { getTransportModels, transportModels, loading };
};
