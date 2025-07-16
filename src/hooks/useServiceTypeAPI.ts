import axios from "axios";
import { useState } from "react";
import config from "../config";

export const useServiceTypeAPI = () => {
  // ХУК ДЛЯ РАБОТЫ С ТИПАМИ УСЛУГ
  const [loading, setLoading] = useState<boolean>(true);

  const [serviceTypes, setServiceTypes] = useState<any[]>([]);
  async function getServiceTypes(query_params: string | null = null) {
    // ЗАПРОС ВСЕХ ТИПОВ УСЛУГ
    let url = config.api.baseUrl + "service-type";
    if (query_params) {
      url += `?${query_params}`;
    }
    const response = await axios.get(url, {
      headers: {
        Authorization: `Token ${localStorage.getItem("token")}`,
      },
    });
    setServiceTypes(response.data);
    setLoading(false);
  }
  return { getServiceTypes, serviceTypes, loading };
};
