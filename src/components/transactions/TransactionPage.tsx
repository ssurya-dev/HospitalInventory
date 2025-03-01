import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { PlusCircle, FileDown, Printer, ArrowLeft } from "lucide-react";
import TransactionFilters from "./TransactionFilters";
import TransactionTable from "./TransactionTable";
import TransactionForm from "./TransactionForm";

interface TransactionPageProps {
  defaultTab?: "view" | "book-in" | "book-out";
}

const TransactionPage: React.FC<TransactionPageProps> = ({
  defaultTab = "view",
}) => {
  const [activeTab, setActiveTab] = useState<"view" | "book-in" | "book-out">(
    defaultTab,
  );
  const [showFilters, setShowFilters] = useState(true);
  const [isExporting, setIsExporting] = useState(false);
  const [isPrinting, setIsPrinting] = useState(false);

  const handleExport = () => {
    setIsExporting(true);
    // Simulate export process
    setTimeout(() => {
      setIsExporting(false);
      console.log("Exported transaction data");
    }, 1500);
  };

  const handlePrint = () => {
    setIsPrinting(true);
    // Simulate print process
    setTimeout(() => {
      setIsPrinting(false);
      console.log("Printed transaction data");
    }, 1500);
  };

  const handleBookInSubmit = (values: any) => {
    console.log("Book In transaction:", values);
    setActiveTab("view");
  };

  const handleBookOutSubmit = (values: any) => {
    console.log("Book Out transaction:", values);
    setActiveTab("view");
  };

  return (
    <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => window.history.back()}
            >
              <ArrowLeft className="h-4 w-4 mr-1" /> Back
            </Button>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Transaction Log</h1>
          <p className="text-gray-500">
            Track and manage inventory transactions
          </p>
        </div>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleExport}
            disabled={isExporting}
          >
            <FileDown className="mr-2 h-4 w-4" />
            {isExporting ? "Exporting..." : "Export Data"}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handlePrint}
            disabled={isPrinting}
          >
            <Printer className="mr-2 h-4 w-4" />
            {isPrinting ? "Printing..." : "Print"}
          </Button>
        </div>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={(value) => setActiveTab(value as any)}
      >
        <div className="flex justify-between items-center mb-4">
          <TabsList>
            <TabsTrigger value="view">View Transactions</TabsTrigger>
            <TabsTrigger value="book-in">Book In</TabsTrigger>
            <TabsTrigger value="book-out">Book Out</TabsTrigger>
          </TabsList>

          {activeTab === "view" && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
            >
              {showFilters ? "Hide Filters" : "Show Filters"}
            </Button>
          )}
        </div>

        <TabsContent value="view" className="space-y-4">
          {showFilters && <TransactionFilters />}
          <TransactionTable />
        </TabsContent>

        <TabsContent value="book-in">
          <div className="max-w-2xl mx-auto">
            <TransactionForm type="in" onSubmit={handleBookInSubmit} />
          </div>
        </TabsContent>

        <TabsContent value="book-out">
          <div className="max-w-2xl mx-auto">
            <TransactionForm type="out" onSubmit={handleBookOutSubmit} />
          </div>
        </TabsContent>
      </Tabs>

      {activeTab === "view" && (
        <div className="fixed bottom-6 right-6">
          <Button
            onClick={() => setActiveTab("book-in")}
            size="lg"
            className="rounded-full h-14 w-14 shadow-lg"
          >
            <PlusCircle className="h-6 w-6" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default TransactionPage;
