import { Suspense } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import TransactionPage from "./components/transactions/TransactionPage";
import TransferPage from "./components/transfers/TransferPage";
import SearchPage from "./components/search/SearchPage";
import ReportingPage from "./components/reports/ReportingPage";
import HospitalManagementPage from "./components/hospitals/HospitalManagementPage";
import UserManagementPage from "./components/users/UserManagementPage";
import SettingsPage from "./components/settings/SettingsPage";
import routes from "tempo-routes";

function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/transactions" element={<TransactionPage />} />
          <Route path="/transfers" element={<TransferPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/reports" element={<ReportingPage />} />
          <Route path="/hospitals" element={<HospitalManagementPage />} />
          <Route path="/users" element={<UserManagementPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
        {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
      </>
    </Suspense>
  );
}

export default App;
