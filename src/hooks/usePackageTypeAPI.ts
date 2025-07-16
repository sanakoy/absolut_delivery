import axios from "axios";
import { useState } from "react";
import config from "../config";

export const usePackageTypeAPI = () => {
  // ХУК ДЛЯ РАБОТЫ С ТИПАМИ УПАКОВОК
  const [loading, setLoading] = useState<boolean>(true);

  const [packageTypes, setPackageTypes] = useState<any[]>([]);
  async function getPackageTypes(query_params: string | null = null) {
    // ЗАПРОС ВСЕХ ТИПОВ УПАКОВОК
    let url = config.api.baseUrl + "package-type";
    if (query_params) {
      url += `?${query_params}`;
    }
    const response = await axios.get(url, {
      headers: {
        Authorization: `Token ${localStorage.getItem("token")}`,
      },
    });
    setPackageTypes(response.data);
    setLoading(false);
  }
  return { getPackageTypes, packageTypes, loading };
};
