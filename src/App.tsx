import { Suspense } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import TransactionPage from "./components/transactions/TransactionPage";
import TransferPage from "./components/transfers/TransferPage";
import SearchPage from "./components/search/SearchPage";
import ReportingPage from "./components/reports/ReportingPage";
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
        </Routes>
        {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
      </>
    </Suspense>
  );
}

export default App;
