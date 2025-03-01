import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, ArrowUpDown, BookOpen, Send } from "lucide-react";

interface InventoryItem {
  id: string;
  name: string;
  category: string;
  department: string;
  quantity: number;
  status: "In Stock" | "Low Stock" | "Out of Stock";
  lastUpdated: string;
}

interface SearchResultsProps {
  results?: InventoryItem[];
  onViewItem?: (item: InventoryItem) => void;
  onBookItem?: (item: InventoryItem) => void;
  onTransferItem?: (item: InventoryItem) => void;
}

const SearchResults = ({
  results = [
    {
      id: "1",
      name: "Surgical Gloves",
      category: "Protective Equipment",
      department: "Surgery",
      quantity: 250,
      status: "In Stock",
      lastUpdated: "2023-06-15T10:30:00Z",
    },
    {
      id: "2",
      name: "IV Catheters",
      category: "Medical Supplies",
      department: "Emergency",
      quantity: 45,
      status: "Low Stock",
      lastUpdated: "2023-06-14T08:15:00Z",
    },
    {
      id: "3",
      name: "Oxygen Masks",
      category: "Respiratory",
      department: "ICU",
      quantity: 0,
      status: "Out of Stock",
      lastUpdated: "2023-06-10T14:45:00Z",
    },
    {
      id: "4",
      name: "Blood Pressure Monitors",
      category: "Equipment",
      department: "Cardiology",
      quantity: 12,
      status: "In Stock",
      lastUpdated: "2023-06-12T11:20:00Z",
    },
    {
      id: "5",
      name: "Syringes",
      category: "Medical Supplies",
      department: "Pharmacy",
      quantity: 320,
      status: "In Stock",
      lastUpdated: "2023-06-13T09:10:00Z",
    },
  ],
  onViewItem = () => {},
  onBookItem = () => {},
  onTransferItem = () => {},
}: SearchResultsProps) => {
  const [sortColumn, setSortColumn] = useState<keyof InventoryItem>("name");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const handleSort = (column: keyof InventoryItem) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const sortedResults = [...results].sort((a, b) => {
    const aValue = a[sortColumn];
    const bValue = b[sortColumn];

    if (typeof aValue === "string" && typeof bValue === "string") {
      return sortDirection === "asc"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    } else if (typeof aValue === "number" && typeof bValue === "number") {
      return sortDirection === "asc" ? aValue - bValue : bValue - aValue;
    }
    return 0;
  });

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "In Stock":
        return "default";
      case "Low Stock":
        return "secondary";
      case "Out of Stock":
        return "destructive";
      default:
        return "outline";
    }
  };

  return (
    <div className="w-full bg-white rounded-md shadow-sm border">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold">Search Results</h2>
        <p className="text-sm text-gray-500">{results.length} items found</p>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead
                className="cursor-pointer"
                onClick={() => handleSort("name")}
              >
                Item Name
                <ArrowUpDown className="ml-2 h-4 w-4 inline" />
              </TableHead>
              <TableHead
                className="cursor-pointer"
                onClick={() => handleSort("category")}
              >
                Category
                <ArrowUpDown className="ml-2 h-4 w-4 inline" />
              </TableHead>
              <TableHead
                className="cursor-pointer"
                onClick={() => handleSort("department")}
              >
                Department
                <ArrowUpDown className="ml-2 h-4 w-4 inline" />
              </TableHead>
              <TableHead
                className="cursor-pointer text-right"
                onClick={() => handleSort("quantity")}
              >
                Quantity
                <ArrowUpDown className="ml-2 h-4 w-4 inline" />
              </TableHead>
              <TableHead
                className="cursor-pointer"
                onClick={() => handleSort("status")}
              >
                Status
                <ArrowUpDown className="ml-2 h-4 w-4 inline" />
              </TableHead>
              <TableHead
                className="cursor-pointer"
                onClick={() => handleSort("lastUpdated")}
              >
                Last Updated
                <ArrowUpDown className="ml-2 h-4 w-4 inline" />
              </TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedResults.length > 0 ? (
              sortedResults.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell>{item.department}</TableCell>
                  <TableCell className="text-right">{item.quantity}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusBadgeVariant(item.status)}>
                      {item.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {new Date(item.lastUpdated).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onViewItem(item)}
                        title="View Details"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onBookItem(item)}
                        title="Book In/Out"
                      >
                        <BookOpen className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onTransferItem(item)}
                        title="Transfer"
                      >
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="text-center py-8 text-gray-500"
                >
                  No items found matching your search criteria
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {results.length > 10 && (
        <div className="p-4 border-t flex justify-center">
          <Button variant="outline" size="sm">
            Load More
          </Button>
        </div>
      )}
    </div>
  );
};

export default SearchResults;
