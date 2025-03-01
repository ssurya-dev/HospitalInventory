import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  BarChart,
  LineChart,
  PieChart,
  Package,
  TrendingUp,
  TrendingDown,
  AlertCircle,
} from "lucide-react";
import {
  ResponsiveContainer,
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
} from "recharts";

interface InventoryOverviewProps {
  data?: {
    departmentDistribution?: Array<{
      name: string;
      value: number;
      color: string;
    }>;
    categoryDistribution?: Array<{
      name: string;
      value: number;
      color: string;
    }>;
    inventoryTrends?: Array<{
      month: string;
      inflow: number;
      outflow: number;
    }>;
    summaryStats?: {
      totalItems: number;
      lowStockItems: number;
      outOfStockItems: number;
      recentTransactions: number;
    };
  };
}

const InventoryOverview: React.FC<InventoryOverviewProps> = ({
  data = {
    departmentDistribution: [
      { name: "Emergency", value: 400, color: "#8884d8" },
      { name: "Surgery", value: 300, color: "#82ca9d" },
      { name: "Pediatrics", value: 200, color: "#ffc658" },
      { name: "Radiology", value: 150, color: "#ff8042" },
      { name: "Cardiology", value: 250, color: "#0088fe" },
    ],
    categoryDistribution: [
      { name: "Medications", value: 500, color: "#0088FE" },
      { name: "Equipment", value: 300, color: "#00C49F" },
      { name: "Supplies", value: 400, color: "#FFBB28" },
      { name: "PPE", value: 200, color: "#FF8042" },
      { name: "Instruments", value: 100, color: "#8884D8" },
    ],
    inventoryTrends: [
      { month: "Jan", inflow: 400, outflow: 300 },
      { month: "Feb", inflow: 350, outflow: 320 },
      { month: "Mar", inflow: 500, outflow: 450 },
      { month: "Apr", inflow: 420, outflow: 400 },
      { month: "May", inflow: 380, outflow: 410 },
      { month: "Jun", inflow: 450, outflow: 380 },
    ],
    summaryStats: {
      totalItems: 1500,
      lowStockItems: 45,
      outOfStockItems: 12,
      recentTransactions: 78,
    },
  },
}) => {
  const [activeTab, setActiveTab] = useState("department");

  const renderSummaryCards = () => {
    const { summaryStats } = data;

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card className="bg-white">
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Items</p>
                <h3 className="text-2xl font-bold mt-1">
                  {summaryStats?.totalItems}
                </h3>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <Package className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Low Stock Items
                </p>
                <h3 className="text-2xl font-bold mt-1">
                  {summaryStats?.lowStockItems}
                </h3>
              </div>
              <div className="p-3 bg-yellow-100 rounded-full">
                <AlertCircle className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Out of Stock
                </p>
                <h3 className="text-2xl font-bold mt-1">
                  {summaryStats?.outOfStockItems}
                </h3>
              </div>
              <div className="p-3 bg-red-100 rounded-full">
                <AlertCircle className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Recent Transactions
                </p>
                <h3 className="text-2xl font-bold mt-1">
                  {summaryStats?.recentTransactions}
                </h3>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  return (
    <div className="w-full bg-gray-50">
      {renderSummaryCards()}

      <Card className="bg-white">
        <CardHeader>
          <CardTitle>Inventory Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger
                value="department"
                className="flex items-center gap-2"
              >
                <BarChart className="h-4 w-4" />
                By Department
              </TabsTrigger>
              <TabsTrigger value="category" className="flex items-center gap-2">
                <PieChart className="h-4 w-4" />
                By Category
              </TabsTrigger>
              <TabsTrigger value="trends" className="flex items-center gap-2">
                <LineChart className="h-4 w-4" />
                Inventory Trends
              </TabsTrigger>
            </TabsList>

            <TabsContent value="department" className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsBarChart
                  data={data.departmentDistribution}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" name="Items" fill="#8884d8" />
                </RechartsBarChart>
              </ResponsiveContainer>
            </TabsContent>

            <TabsContent value="category" className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart>
                  <Pie
                    data={data.categoryDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={true}
                    label={({ name, percent }) =>
                      `${name}: ${(percent * 100).toFixed(0)}%`
                    }
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {data.categoryDistribution?.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </RechartsPieChart>
              </ResponsiveContainer>
            </TabsContent>

            <TabsContent value="trends" className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsBarChart
                  data={data.inventoryTrends}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="inflow" name="Items In" fill="#82ca9d" />
                  <Bar dataKey="outflow" name="Items Out" fill="#8884d8" />
                </RechartsBarChart>
              </ResponsiveContainer>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default InventoryOverview;
