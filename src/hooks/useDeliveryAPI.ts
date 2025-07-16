import axios from "axios";
import { useState } from "react";
import config from "../config";

export const useDeliveryAPI = () => {
  // ХУК ДЛЯ РАБОТЫ С ДОСТАВКАМИ
  const [loading, setLoading] = useState<boolean>(true);
  const [delivery, setDelivery] = useState<any>(null);
  const [deliveries, setDeliveries] = useState<any[]>([]);
  const [newDelivery, setNewDelivery] = useState<any>(null);

  async function getDeliveries(query_params: string | null = null) {
    // ЗАПРОС ВСЕХ ДОСТАВОК
    let url = "http://localhost:8000/api/v1/deliveries";
    if (query_params) {
      url += `?${query_params}`;
    }
    const response = await axios.get(url, {
      headers: {
        Authorization: `Token ${localStorage.getItem("token")}`,
      },
    });
    setDeliveries(response.data);
    setLoading(false);
  }

  async function getDelivery(deliveryId: string | undefined) {
    // ЗАПРОС ДОСТАВКИ ПО ID
    if (!deliveryId) return;
    setLoading(true);
    const response = await axios.get(
      config.api.baseUrl + `deliveries/${deliveryId}/details`,
      {
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      }
    );
    setDelivery(response.data);
    setLoading(false);
  }

  async function createDelivery() {
    // СОЗДАНИЕ ДОСТАВКИ
    setLoading(true);
    const response = await axios.post(
      config.api.baseUrl + `deliveries/`,
      newDelivery,
      {
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      }
    );
    setNewDelivery(null);
    setLoading(false);
  }

  async function updateDelivery(data: any) {
    // ОБНОВЛЕНИЕ ДОСТАВКИ
    if (!delivery) return;
    setLoading(true);
    const response = await axios.patch(
      config.api.baseUrl + `deliveries/${delivery.id}/`,
      data,
      {
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      }
    );
    setDelivery(response.data);
    setLoading(false);
  }

  async function deleteDelivery() {
    // УДАЛЕНИЕ ДОСТАВКИ
    if (!delivery) return;
    setLoading(true);
    const response = await axios.delete(
      config.api.baseUrl + `deliveries/${delivery.id}/`,
      {
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      }
    );
    setDelivery(null);
    setLoading(false);
  }

  return {
    getDeliveries,
    deliveries,
    loading,
    getDelivery,
    delivery,
    createDelivery,
    newDelivery,
    setNewDelivery,
    setDelivery,
    updateDelivery,
    deleteDelivery,
  };
};
