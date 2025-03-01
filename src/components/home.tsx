import React from "react";
import { Link } from "react-router-dom";
import Sidebar from "./layout/Sidebar";
import InventoryOverview from "./dashboard/InventoryOverview";
import LowStockAlerts from "./dashboard/LowStockAlerts";
import RecentTransactions from "./dashboard/RecentTransactions";

const Home = () => {
  const handleViewAllTransactions = () => {
    // Navigate to transactions page
    console.log("Navigate to transactions page");
  };

  const handleViewTransaction = (id: string) => {
    console.log(`View transaction details for ${id}`);
  };

  const handleViewItemDetails = (id: string) => {
    console.log(`View item details for ${id}`);
  };

  const handleOrderSupplies = (id: string) => {
    console.log(`Order supplies for item ${id}`);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />

      <div className="flex-1 overflow-auto p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-gray-500">
            Hospital Department Inventory Management
          </p>
        </div>

        <div className="space-y-6">
          <InventoryOverview />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <LowStockAlerts
              onViewDetails={handleViewItemDetails}
              onOrderSupplies={handleOrderSupplies}
            />

            <RecentTransactions
              onViewAll={handleViewAllTransactions}
              onViewTransaction={handleViewTransaction}
            />
          </div>

          <div className="mt-8 flex justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold">Quick Actions</h2>
              <p className="text-gray-500">Common inventory management tasks</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link to="/transactions">
              <div className="p-6 bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Transaction Log</h3>
                    <p className="text-sm text-gray-500">
                      View and manage all transactions
                    </p>
                  </div>
                </div>
              </div>
            </Link>

            <Link to="/transfers">
              <div className="p-6 bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Transfer Management</h3>
                    <p className="text-sm text-gray-500">
                      Manage department transfers
                    </p>
                  </div>
                </div>
              </div>
            </Link>

            <Link to="/reports">
              <div className="p-6 bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Generate Reports</h3>
                    <p className="text-sm text-gray-500">
                      Create inventory reports
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
