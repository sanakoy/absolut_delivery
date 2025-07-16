import axios from "axios";
import { useState } from "react";
import config from "../config";

export const useStatusAPI = () => {
  // ХУК ДЛЯ РАБОТЫ С СТАТУСАМИ
  const [loading, setLoading] = useState<boolean>(true);

  const [statuses, setStatuses] = useState<any[]>([]);
  async function getStatuses(query_params: string | null = null) {
    // ЗАПРОС ВСЕХ СТАТУСОВ
    let url = config.api.baseUrl + "status";
    if (query_params) {
      url += `?${query_params}`;
    }
    const response = await axios.get(url, {
      headers: {
        Authorization: `Token ${localStorage.getItem("token")}`,
      },
    });
    setStatuses(response.data);
    setLoading(false);
  }
  return { getStatuses, statuses, loading };
};
