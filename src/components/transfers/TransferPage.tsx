import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Sidebar from "../layout/Sidebar";
import PendingTransfers from "./PendingTransfers";
import TransferForm from "./TransferForm";

interface TransferPageProps {
  defaultTab?: "pending" | "initiate";
}

const TransferPage: React.FC<TransferPageProps> = ({
  defaultTab = "pending",
}) => {
  const [activeTab, setActiveTab] = useState<"pending" | "initiate">(
    defaultTab,
  );

  const handleApproveTransfer = (transferId: string) => {
    console.log(`Approved transfer ${transferId}`);
    // In a real app, this would call an API to approve the transfer
  };

  const handleRejectTransfer = (transferId: string) => {
    console.log(`Rejected transfer ${transferId}`);
    // In a real app, this would call an API to reject the transfer
  };

  const handleViewTransfer = (transferId: string) => {
    console.log(`Viewing transfer details for ${transferId}`);
    // In a real app, this would open a detailed view or navigate to a details page
  };

  const handleTransferSubmit = (values: any) => {
    console.log("Transfer submitted:", values);
    setActiveTab("pending");
    // In a real app, this would call an API to create the transfer
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />

      <div className="flex-1 overflow-auto p-6">
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => window.history.back()}
            >
              <ArrowLeft className="h-4 w-4 mr-1" /> Back
            </Button>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">
            Transfer Management
          </h1>
          <p className="text-gray-500">
            Manage inventory transfers between departments
          </p>
        </div>

        <Tabs
          value={activeTab}
          onValueChange={(value) => setActiveTab(value as any)}
        >
          <div className="flex justify-between items-center mb-4">
            <TabsList>
              <TabsTrigger value="pending">Pending Transfers</TabsTrigger>
              <TabsTrigger value="initiate">Initiate Transfer</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="pending" className="space-y-4">
            <PendingTransfers
              onApprove={handleApproveTransfer}
              onReject={handleRejectTransfer}
              onView={handleViewTransfer}
            />
          </TabsContent>

          <TabsContent value="initiate">
            <div className="max-w-2xl mx-auto">
              <TransferForm onSubmit={handleTransferSubmit} />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default TransferPage;
