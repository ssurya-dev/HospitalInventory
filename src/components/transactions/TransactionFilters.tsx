import React, { useState } from "react";
import {
  Search,
  Filter,
  Calendar as CalendarIcon,
  User,
  Building,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { DateRange } from "react-day-picker";
import { format, subDays } from "date-fns";

interface TransactionFiltersProps {
  onFilterChange?: (filters: FilterState) => void;
}

interface FilterState {
  dateRange: DateRange | undefined;
  transactionType: string;
  user: string;
  department: string;
  searchTerm: string;
}

const TransactionFilters: React.FC<TransactionFiltersProps> = ({
  onFilterChange = () => {},
}) => {
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: subDays(new Date(), 7),
    to: new Date(),
  });

  const [transactionType, setTransactionType] = useState<string>("all");
  const [user, setUser] = useState<string>("all");
  const [department, setDepartment] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const handleFilterChange = (filterUpdate: Partial<FilterState>) => {
    const newFilters = {
      dateRange,
      transactionType,
      user,
      department,
      searchTerm,
      ...filterUpdate,
    };

    onFilterChange(newFilters);
  };

  return (
    <div className="w-full p-4 bg-white border rounded-md shadow-sm">
      <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
        {/* Date Range Filter */}
        <div className="flex-1">
          <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start text-left font-normal"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {dateRange?.from ? (
                  dateRange.to ? (
                    <>
                      {format(dateRange.from, "MMM dd, yyyy")} -{" "}
                      {format(dateRange.to, "MMM dd, yyyy")}
                    </>
                  ) : (
                    format(dateRange.from, "MMM dd, yyyy")
                  )
                ) : (
                  <span>Select date range</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={dateRange?.from}
                selected={dateRange}
                onSelect={(range) => {
                  setDateRange(range);
                  handleFilterChange({ dateRange: range });
                }}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Transaction Type Filter */}
        <div className="w-full md:w-48">
          <Select
            value={transactionType}
            onValueChange={(value) => {
              setTransactionType(value);
              handleFilterChange({ transactionType: value });
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Transaction Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="book-in">Book In</SelectItem>
              <SelectItem value="book-out">Book Out</SelectItem>
              <SelectItem value="transfer">Transfer</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* User Filter */}
        <div className="w-full md:w-48">
          <Select
            value={user}
            onValueChange={(value) => {
              setUser(value);
              handleFilterChange({ user: value });
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="User">
                <div className="flex items-center">
                  <User className="mr-2 h-4 w-4" />
                  <span>User</span>
                </div>
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Users</SelectItem>
              <SelectItem value="john.doe">John Doe</SelectItem>
              <SelectItem value="jane.smith">Jane Smith</SelectItem>
              <SelectItem value="robert.johnson">Robert Johnson</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Department Filter */}
        <div className="w-full md:w-48">
          <Select
            value={department}
            onValueChange={(value) => {
              setDepartment(value);
              handleFilterChange({ department: value });
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Department">
                <div className="flex items-center">
                  <Building className="mr-2 h-4 w-4" />
                  <span>Department</span>
                </div>
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Departments</SelectItem>
              <SelectItem value="emergency">Emergency</SelectItem>
              <SelectItem value="surgery">Surgery</SelectItem>
              <SelectItem value="radiology">Radiology</SelectItem>
              <SelectItem value="cardiology">Cardiology</SelectItem>
              <SelectItem value="pediatrics">Pediatrics</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Search Input */}
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search items, transactions..."
              className="pl-9"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                handleFilterChange({ searchTerm: e.target.value });
              }}
            />
          </div>
        </div>
      </div>

      {/* Filter Actions */}
      <div className="flex justify-end mt-4 space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            setDateRange({
              from: subDays(new Date(), 7),
              to: new Date(),
            });
            setTransactionType("all");
            setUser("all");
            setDepartment("all");
            setSearchTerm("");
            handleFilterChange({
              dateRange: {
                from: subDays(new Date(), 7),
                to: new Date(),
              },
              transactionType: "all",
              user: "all",
              department: "all",
              searchTerm: "",
            });
          }}
        >
          Reset Filters
        </Button>
        <Button size="sm" className="flex items-center">
          <Filter className="mr-2 h-4 w-4" />
          Apply Filters
        </Button>
      </div>
    </div>
  );
};

export default TransactionFilters;
