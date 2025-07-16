const config = {
  // КОНФИГУРАЦИЯ API
  api: {
    baseUrl:
      import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api/v1",
    endpoints: {
      deliveries: {
        details: (id: string) =>
          `${config.api.baseUrl}/deliveries/${id}/details`,
      },
    },
  },
};

export default config;
