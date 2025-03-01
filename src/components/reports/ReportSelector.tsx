import React, { useState } from "react";
import { Calendar, FileText, BarChart3, AlertTriangle } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import DatePickerWithRange from "@/components/ui/date-picker-with-range";

interface ReportSelectorProps {
  onReportTypeChange?: (reportType: string) => void;
  onParametersChange?: (parameters: any) => void;
  onGenerateReport?: () => void;
}

const ReportSelector = ({
  onReportTypeChange = () => {},
  onParametersChange = () => {},
  onGenerateReport = () => {},
}: ReportSelectorProps) => {
  const [reportType, setReportType] = useState("usage");

  const handleReportTypeChange = (value: string) => {
    setReportType(value);
    onReportTypeChange(value);
  };

  return (
    <Card className="w-full bg-white">
      <CardHeader>
        <CardTitle>Report Generator</CardTitle>
        <CardDescription>
          Select report type and parameters to generate inventory reports
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs
          defaultValue="usage"
          onValueChange={handleReportTypeChange}
          className="w-full"
        >
          <TabsList className="grid grid-cols-3 w-full mb-6">
            <TabsTrigger value="usage" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Usage Report
            </TabsTrigger>
            <TabsTrigger value="forecast" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Inventory Forecast
            </TabsTrigger>
            <TabsTrigger value="lowstock" className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              Low Stock Report
            </TabsTrigger>
          </TabsList>

          <TabsContent value="usage" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="department">Department</Label>
                <Select defaultValue="all">
                  <SelectTrigger id="department">
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Departments</SelectItem>
                    <SelectItem value="emergency">Emergency</SelectItem>
                    <SelectItem value="surgery">Surgery</SelectItem>
                    <SelectItem value="pediatrics">Pediatrics</SelectItem>
                    <SelectItem value="radiology">Radiology</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Item Category</Label>
                <Select defaultValue="all">
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="medications">Medications</SelectItem>
                    <SelectItem value="supplies">Medical Supplies</SelectItem>
                    <SelectItem value="equipment">Equipment</SelectItem>
                    <SelectItem value="ppe">PPE</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label>Date Range</Label>
                <DatePickerWithRange />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="forecast" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="forecast-department">Department</Label>
                <Select defaultValue="all">
                  <SelectTrigger id="forecast-department">
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Departments</SelectItem>
                    <SelectItem value="emergency">Emergency</SelectItem>
                    <SelectItem value="surgery">Surgery</SelectItem>
                    <SelectItem value="pediatrics">Pediatrics</SelectItem>
                    <SelectItem value="radiology">Radiology</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="forecast-period">Forecast Period</Label>
                <Select defaultValue="30">
                  <SelectTrigger id="forecast-period">
                    <SelectValue placeholder="Select period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7">7 Days</SelectItem>
                    <SelectItem value="30">30 Days</SelectItem>
                    <SelectItem value="90">90 Days</SelectItem>
                    <SelectItem value="180">6 Months</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="forecast-model">Forecast Model</Label>
                <Select defaultValue="linear">
                  <SelectTrigger id="forecast-model">
                    <SelectValue placeholder="Select model" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="linear">Linear Regression</SelectItem>
                    <SelectItem value="moving-avg">Moving Average</SelectItem>
                    <SelectItem value="seasonal">
                      Seasonal Adjustment
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confidence">Confidence Level</Label>
                <Select defaultValue="95">
                  <SelectTrigger id="confidence">
                    <SelectValue placeholder="Select confidence level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="90">90%</SelectItem>
                    <SelectItem value="95">95%</SelectItem>
                    <SelectItem value="99">99%</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="lowstock" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="lowstock-department">Department</Label>
                <Select defaultValue="all">
                  <SelectTrigger id="lowstock-department">
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Departments</SelectItem>
                    <SelectItem value="emergency">Emergency</SelectItem>
                    <SelectItem value="surgery">Surgery</SelectItem>
                    <SelectItem value="pediatrics">Pediatrics</SelectItem>
                    <SelectItem value="radiology">Radiology</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="threshold-type">Threshold Type</Label>
                <Select defaultValue="percentage">
                  <SelectTrigger id="threshold-type">
                    <SelectValue placeholder="Select threshold type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="percentage">Percentage</SelectItem>
                    <SelectItem value="absolute">Absolute Value</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="threshold-value">Threshold Value</Label>
                <Input
                  id="threshold-value"
                  type="number"
                  defaultValue="20"
                  min="1"
                  max="100"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="priority">Priority Level</Label>
                <Select defaultValue="all">
                  <SelectTrigger id="priority">
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Priorities</SelectItem>
                    <SelectItem value="critical">Critical</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </TabsContent>

          <div className="mt-6 flex justify-end">
            <Button
              onClick={onGenerateReport}
              className="flex items-center gap-2"
            >
              <Calendar className="h-4 w-4" />
              Generate Report
            </Button>
          </div>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ReportSelector;
