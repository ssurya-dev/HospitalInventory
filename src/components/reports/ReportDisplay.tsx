import React, { useState } from "react";
import { Card, CardContent } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Button } from "../ui/button";
import {
  Download,
  Printer,
  BarChart3,
  PieChart,
  LineChart,
  Table,
} from "lucide-react";

interface ReportDisplayProps {
  reportType?: "usage" | "forecast" | "lowStock";
  dateRange?: { from: Date; to: Date };
  department?: string;
  category?: string;
}

const ReportDisplay = ({
  reportType = "usage",
  dateRange = {
    from: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    to: new Date(),
  },
  department = "All Departments",
  category = "All Categories",
}: ReportDisplayProps) => {
  const [viewType, setViewType] = useState<"chart" | "table">("chart");
  const [chartType, setChartType] = useState<"bar" | "line" | "pie">("bar");

  // Mock data for different report types
  const mockData = {
    usage: [
      { name: "Surgical Gloves", quantity: 1200, department: "Surgery" },
      { name: "IV Catheters", quantity: 850, department: "Emergency" },
      { name: "Syringes", quantity: 1500, department: "Pharmacy" },
      { name: "Bandages", quantity: 950, department: "Wound Care" },
      { name: "Surgical Masks", quantity: 2000, department: "General" },
    ],
    forecast: [
      { name: "Surgical Gloves", current: 500, forecast: 1200, threshold: 300 },
      { name: "IV Catheters", current: 200, forecast: 850, threshold: 150 },
      { name: "Syringes", current: 600, forecast: 1500, threshold: 400 },
      { name: "Bandages", current: 350, forecast: 950, threshold: 200 },
      { name: "Surgical Masks", current: 800, forecast: 2000, threshold: 500 },
    ],
    lowStock: [
      { name: "Surgical Gloves", current: 250, threshold: 300, status: "Low" },
      {
        name: "IV Catheters",
        current: 100,
        threshold: 150,
        status: "Critical",
      },
      { name: "Syringes", current: 350, threshold: 400, status: "Low" },
      { name: "Bandages", current: 180, threshold: 200, status: "Low" },
      { name: "Surgical Masks", current: 450, threshold: 500, status: "Low" },
    ],
  };

  const getReportTitle = () => {
    switch (reportType) {
      case "usage":
        return "Usage Report";
      case "forecast":
        return "Inventory Forecast";
      case "lowStock":
        return "Low Stock Report";
      default:
        return "Report";
    }
  };

  const renderChartPlaceholder = () => {
    return (
      <div className="flex flex-col items-center justify-center h-80 bg-gray-100 rounded-lg">
        {chartType === "bar" && (
          <BarChart3 className="w-16 h-16 text-gray-400 mb-4" />
        )}
        {chartType === "line" && (
          <LineChart className="w-16 h-16 text-gray-400 mb-4" />
        )}
        {chartType === "pie" && (
          <PieChart className="w-16 h-16 text-gray-400 mb-4" />
        )}
        <p className="text-gray-500">Chart visualization would appear here</p>
        <p className="text-sm text-gray-400 mt-2">
          {reportType === "usage" && "Showing item usage data by quantity"}
          {reportType === "forecast" &&
            "Showing inventory forecast vs current levels"}
          {reportType === "lowStock" && "Showing items below threshold levels"}
        </p>
      </div>
    );
  };

  const renderTablePlaceholder = () => {
    return (
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 text-left font-medium text-gray-600">
                Item Name
              </th>
              {reportType === "usage" && (
                <>
                  <th className="p-3 text-left font-medium text-gray-600">
                    Quantity Used
                  </th>
                  <th className="p-3 text-left font-medium text-gray-600">
                    Department
                  </th>
                </>
              )}
              {reportType === "forecast" && (
                <>
                  <th className="p-3 text-left font-medium text-gray-600">
                    Current Stock
                  </th>
                  <th className="p-3 text-left font-medium text-gray-600">
                    Forecasted Need
                  </th>
                  <th className="p-3 text-left font-medium text-gray-600">
                    Threshold
                  </th>
                </>
              )}
              {reportType === "lowStock" && (
                <>
                  <th className="p-3 text-left font-medium text-gray-600">
                    Current Stock
                  </th>
                  <th className="p-3 text-left font-medium text-gray-600">
                    Threshold
                  </th>
                  <th className="p-3 text-left font-medium text-gray-600">
                    Status
                  </th>
                </>
              )}
            </tr>
          </thead>
          <tbody>
            {reportType === "usage" &&
              mockData.usage.map((item, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-200 hover:bg-gray-50"
                >
                  <td className="p-3">{item.name}</td>
                  <td className="p-3">{item.quantity}</td>
                  <td className="p-3">{item.department}</td>
                </tr>
              ))}
            {reportType === "forecast" &&
              mockData.forecast.map((item, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-200 hover:bg-gray-50"
                >
                  <td className="p-3">{item.name}</td>
                  <td className="p-3">{item.current}</td>
                  <td className="p-3">{item.forecast}</td>
                  <td className="p-3">{item.threshold}</td>
                </tr>
              ))}
            {reportType === "lowStock" &&
              mockData.lowStock.map((item, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-200 hover:bg-gray-50"
                >
                  <td className="p-3">{item.name}</td>
                  <td className="p-3">{item.current}</td>
                  <td className="p-3">{item.threshold}</td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-1 rounded text-xs ${item.status === "Critical" ? "bg-red-100 text-red-800" : "bg-yellow-100 text-yellow-800"}`}
                    >
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <Card className="w-full bg-white">
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              {getReportTitle()}
            </h2>
            <p className="text-gray-500">
              {dateRange.from.toLocaleDateString()} -{" "}
              {dateRange.to.toLocaleDateString()} • {department} • {category}
            </p>
          </div>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => console.log("Export report")}
            >
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => console.log("Print report")}
            >
              <Printer className="h-4 w-4 mr-2" />
              Print
            </Button>
          </div>
        </div>

        <div className="mb-6">
          <Tabs
            defaultValue="chart"
            onValueChange={(value) => setViewType(value as "chart" | "table")}
          >
            <div className="flex justify-between items-center">
              <TabsList>
                <TabsTrigger value="chart">Chart View</TabsTrigger>
                <TabsTrigger value="table">Table View</TabsTrigger>
              </TabsList>

              {viewType === "chart" && (
                <div className="flex space-x-2">
                  <Button
                    variant={chartType === "bar" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setChartType("bar")}
                  >
                    <BarChart3 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={chartType === "line" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setChartType("line")}
                  >
                    <LineChart className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={chartType === "pie" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setChartType("pie")}
                  >
                    <PieChart className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>

            <TabsContent value="chart" className="mt-4">
              {renderChartPlaceholder()}
            </TabsContent>

            <TabsContent value="table" className="mt-4">
              {renderTablePlaceholder()}
            </TabsContent>
          </Tabs>
        </div>

        <div className="text-sm text-gray-500">
          <p>Report generated on {new Date().toLocaleString()}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReportDisplay;
