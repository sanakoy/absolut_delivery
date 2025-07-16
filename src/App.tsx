import { Navigate, Route, Routes } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import Login from "./pages/Login";
import Deilveries from "./pages/Deliveries";
import DeliveryView from "./pages/DeliveryView";
import DeliveryCreatePage from "./pages/DeliveryCreatePage";

function App() {
  // МАРШРУТЫ
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/deliveries"
        element={
          <PrivateRoute>
            <Deilveries />
          </PrivateRoute>
        }
      />
      <Route
        path="/delivery/create"
        element={
          <PrivateRoute>
            <DeliveryCreatePage />
          </PrivateRoute>
        }
      />
      <Route
        path="/delivery/:deliveryId"
        element={
          <PrivateRoute>
            <DeliveryView />
          </PrivateRoute>
        }
      />

      {/* Другие защищенные маршруты */}
      <Route path="*" element={<Navigate to="/deliveries" replace />} />
    </Routes>
  );
}

export default App;
