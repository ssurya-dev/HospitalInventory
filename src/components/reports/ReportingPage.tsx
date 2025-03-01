import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import ReportSelector from "./ReportSelector";
import ReportDisplay from "./ReportDisplay";

interface ReportingPageProps {
  defaultReportType?: "usage" | "forecast" | "lowStock";
}

const ReportingPage = ({ defaultReportType = "usage" }: ReportingPageProps) => {
  const [reportType, setReportType] = useState<
    "usage" | "forecast" | "lowStock"
  >(defaultReportType);
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date }>({
    from: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    to: new Date(),
  });
  const [department, setDepartment] = useState<string>("All Departments");
  const [category, setCategory] = useState<string>("All Categories");
  const [isReportGenerated, setIsReportGenerated] = useState<boolean>(false);

  const handleReportTypeChange = (type: string) => {
    setReportType(type as "usage" | "forecast" | "lowStock");
    setIsReportGenerated(false);
  };

  const handleParametersChange = (parameters: any) => {
    if (parameters.dateRange) {
      setDateRange(parameters.dateRange);
    }
    if (parameters.department) {
      setDepartment(parameters.department);
    }
    if (parameters.category) {
      setCategory(parameters.category);
    }
    setIsReportGenerated(false);
  };

  const handleGenerateReport = () => {
    // In a real application, this would trigger an API call to generate the report
    setIsReportGenerated(true);
  };

  return (
    <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="flex items-center gap-2 mb-1">
        <Button variant="ghost" size="sm" onClick={() => window.history.back()}>
          <ArrowLeft className="h-4 w-4 mr-1" /> Back
        </Button>
      </div>
      <h1 className="text-3xl font-bold mb-8">Reporting Dashboard</h1>

      <div className="space-y-8">
        <ReportSelector
          onReportTypeChange={handleReportTypeChange}
          onParametersChange={handleParametersChange}
          onGenerateReport={handleGenerateReport}
        />

        {isReportGenerated && (
          <ReportDisplay
            reportType={reportType}
            dateRange={dateRange}
            department={department}
            category={category}
          />
        )}

        {!isReportGenerated && (
          <div className="flex flex-col items-center justify-center p-12 border border-dashed border-gray-300 rounded-lg bg-white">
            <div className="text-gray-400 text-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16 mx-auto mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <h3 className="text-lg font-medium mb-2">
                No Report Generated Yet
              </h3>
              <p className="max-w-md">
                Select your report parameters above and click "Generate Report"
                to view your data.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportingPage;
