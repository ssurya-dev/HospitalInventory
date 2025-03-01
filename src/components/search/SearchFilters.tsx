import React, { useState } from "react";
import { Search, Filter, X } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface SearchFiltersProps {
  onSearch?: (searchTerm: string) => void;
  onFilterChange?: (filters: FilterOptions) => void;
}

interface FilterOptions {
  category: string;
  department: string;
  status: string;
}

const SearchFilters = ({
  onSearch = () => {},
  onFilterChange = () => {},
}: SearchFiltersProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState<FilterOptions>({
    category: "",
    department: "",
    status: "",
  });
  const [showFilters, setShowFilters] = useState(false);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    onSearch(e.target.value);
  };

  const handleFilterChange = (
    value: string,
    filterType: keyof FilterOptions,
  ) => {
    const newFilters = { ...filters, [filterType]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearFilters = () => {
    const resetFilters = {
      category: "",
      department: "",
      status: "",
    };
    setFilters(resetFilters);
    onFilterChange(resetFilters);
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  // Mock data for filters
  const categories = [
    { value: "medications", label: "Medications" },
    { value: "equipment", label: "Equipment" },
    { value: "supplies", label: "Supplies" },
    { value: "instruments", label: "Instruments" },
  ];

  const departments = [
    { value: "emergency", label: "Emergency" },
    { value: "surgery", label: "Surgery" },
    { value: "pediatrics", label: "Pediatrics" },
    { value: "cardiology", label: "Cardiology" },
    { value: "radiology", label: "Radiology" },
  ];

  const statuses = [
    { value: "in-stock", label: "In Stock" },
    { value: "low-stock", label: "Low Stock" },
    { value: "out-of-stock", label: "Out of Stock" },
    { value: "on-order", label: "On Order" },
  ];

  return (
    <Card className="w-full bg-white">
      <CardContent className="p-4">
        <div className="space-y-4">
          {/* Search bar */}
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by item name, ID, or description..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="pl-10 w-full"
            />
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1"
              onClick={toggleFilters}
              aria-label="Toggle filters"
            >
              <Filter className="h-4 w-4" />
            </Button>
          </div>

          {/* Advanced filters */}
          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <div className="space-y-2">
                <label className="text-sm font-medium">Category</label>
                <Select
                  value={filters.category}
                  onValueChange={(value) =>
                    handleFilterChange(value, "category")
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Categories</SelectItem>
                    {categories.map((category) => (
                      <SelectItem key={category.value} value={category.value}>
                        {category.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Department</label>
                <Select
                  value={filters.department}
                  onValueChange={(value) =>
                    handleFilterChange(value, "department")
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Departments</SelectItem>
                    {departments.map((department) => (
                      <SelectItem
                        key={department.value}
                        value={department.value}
                      >
                        {department.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Status</label>
                <Select
                  value={filters.status}
                  onValueChange={(value) => handleFilterChange(value, "status")}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Statuses</SelectItem>
                    {statuses.map((status) => (
                      <SelectItem key={status.value} value={status.value}>
                        {status.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="md:col-span-3 flex justify-end">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={clearFilters}
                  className="flex items-center gap-1"
                >
                  <X className="h-3 w-3" /> Clear Filters
                </Button>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default SearchFilters;
