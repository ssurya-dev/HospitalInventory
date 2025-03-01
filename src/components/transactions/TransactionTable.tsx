import React, { useState } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
} from "../ui/table";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import {
  ChevronDown,
  ChevronUp,
  Search,
  ArrowUpDown,
  Eye,
  Edit,
  Trash2,
  FileDown,
  Printer,
} from "lucide-react";

interface Transaction {
  id: string;
  timestamp: string;
  type: "in" | "out" | "transfer";
  itemName: string;
  itemCode: string;
  quantity: number;
  department: string;
  targetDepartment?: string;
  user: string;
  status: "completed" | "pending" | "cancelled";
}

interface TransactionTableProps {
  transactions?: Transaction[];
  onViewTransaction?: (id: string) => void;
  onEditTransaction?: (id: string) => void;
  onDeleteTransaction?: (id: string) => void;
  onExportData?: () => void;
  onPrintTable?: () => void;
}

const TransactionTable = ({
  transactions = [
    {
      id: "TX-001",
      timestamp: "2023-06-15T09:30:00",
      type: "in",
      itemName: "Surgical Masks",
      itemCode: "SM-001",
      quantity: 500,
      department: "Emergency",
      user: "John Doe",
      status: "completed",
    },
    {
      id: "TX-002",
      timestamp: "2023-06-15T10:45:00",
      type: "out",
      itemName: "Disposable Gloves",
      itemCode: "DG-002",
      quantity: 100,
      department: "Surgery",
      user: "Jane Smith",
      status: "completed",
    },
    {
      id: "TX-003",
      timestamp: "2023-06-15T14:20:00",
      type: "transfer",
      itemName: "IV Solution",
      itemCode: "IV-003",
      quantity: 50,
      department: "Pharmacy",
      targetDepartment: "ICU",
      user: "Mike Johnson",
      status: "pending",
    },
    {
      id: "TX-004",
      timestamp: "2023-06-14T16:10:00",
      type: "in",
      itemName: "Bandages",
      itemCode: "BD-004",
      quantity: 200,
      department: "General Ward",
      user: "Sarah Williams",
      status: "completed",
    },
    {
      id: "TX-005",
      timestamp: "2023-06-14T11:05:00",
      type: "out",
      itemName: "Syringes",
      itemCode: "SY-005",
      quantity: 75,
      department: "Pediatrics",
      user: "Robert Brown",
      status: "cancelled",
    },
  ],
  onViewTransaction = (id) => console.log(`View transaction ${id}`),
  onEditTransaction = (id) => console.log(`Edit transaction ${id}`),
  onDeleteTransaction = (id) => console.log(`Delete transaction ${id}`),
  onExportData = () => console.log("Export data"),
  onPrintTable = () => console.log("Print table"),
}: TransactionTableProps) => {
  const [sortColumn, setSortColumn] = useState<string>("timestamp");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "in":
        return "bg-blue-100 text-blue-800";
      case "out":
        return "bg-purple-100 text-purple-800";
      case "transfer":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const filteredTransactions = transactions.filter((transaction) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      transaction.id.toLowerCase().includes(searchLower) ||
      transaction.itemName.toLowerCase().includes(searchLower) ||
      transaction.itemCode.toLowerCase().includes(searchLower) ||
      transaction.department.toLowerCase().includes(searchLower) ||
      transaction.user.toLowerCase().includes(searchLower) ||
      (transaction.targetDepartment &&
        transaction.targetDepartment.toLowerCase().includes(searchLower))
    );
  });

  const sortedTransactions = [...filteredTransactions].sort((a, b) => {
    if (sortColumn === "timestamp") {
      return sortDirection === "asc"
        ? new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
        : new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
    }

    if (sortColumn === "quantity") {
      return sortDirection === "asc"
        ? a.quantity - b.quantity
        : b.quantity - a.quantity;
    }

    const aValue = a[sortColumn as keyof Transaction] as string;
    const bValue = b[sortColumn as keyof Transaction] as string;

    return sortDirection === "asc"
      ? aValue.localeCompare(bValue)
      : bValue.localeCompare(aValue);
  });

  return (
    <div className="bg-white rounded-lg shadow p-4 w-full">
      <div className="flex justify-between items-center mb-4">
        <div className="relative w-64">
          <Input
            placeholder="Search transactions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={onExportData}>
            <FileDown className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button variant="outline" size="sm" onClick={onPrintTable}>
            <Printer className="h-4 w-4 mr-2" />
            Print
          </Button>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableCaption>List of all transactions in the system</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead
                className="cursor-pointer"
                onClick={() => handleSort("id")}
              >
                ID
                <ArrowUpDown className="ml-1 h-4 w-4 inline" />
              </TableHead>
              <TableHead
                className="cursor-pointer"
                onClick={() => handleSort("timestamp")}
              >
                Timestamp
                {sortColumn === "timestamp" &&
                  (sortDirection === "asc" ? (
                    <ChevronUp className="ml-1 h-4 w-4 inline" />
                  ) : (
                    <ChevronDown className="ml-1 h-4 w-4 inline" />
                  ))}
              </TableHead>
              <TableHead
                className="cursor-pointer"
                onClick={() => handleSort("type")}
              >
                Type
                <ArrowUpDown className="ml-1 h-4 w-4 inline" />
              </TableHead>
              <TableHead
                className="cursor-pointer"
                onClick={() => handleSort("itemName")}
              >
                Item
                <ArrowUpDown className="ml-1 h-4 w-4 inline" />
              </TableHead>
              <TableHead
                className="cursor-pointer"
                onClick={() => handleSort("quantity")}
              >
                Quantity
                <ArrowUpDown className="ml-1 h-4 w-4 inline" />
              </TableHead>
              <TableHead
                className="cursor-pointer"
                onClick={() => handleSort("department")}
              >
                Department
                <ArrowUpDown className="ml-1 h-4 w-4 inline" />
              </TableHead>
              <TableHead
                className="cursor-pointer"
                onClick={() => handleSort("user")}
              >
                User
                <ArrowUpDown className="ml-1 h-4 w-4 inline" />
              </TableHead>
              <TableHead
                className="cursor-pointer"
                onClick={() => handleSort("status")}
              >
                Status
                <ArrowUpDown className="ml-1 h-4 w-4 inline" />
              </TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedTransactions.length > 0 ? (
              sortedTransactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell className="font-medium">
                    {transaction.id}
                  </TableCell>
                  <TableCell>{formatDate(transaction.timestamp)}</TableCell>
                  <TableCell>
                    <Badge
                      className={getTypeColor(transaction.type)}
                      variant="outline"
                    >
                      {transaction.type === "in"
                        ? "Book In"
                        : transaction.type === "out"
                          ? "Book Out"
                          : "Transfer"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div>{transaction.itemName}</div>
                    <div className="text-xs text-gray-500">
                      {transaction.itemCode}
                    </div>
                  </TableCell>
                  <TableCell>{transaction.quantity}</TableCell>
                  <TableCell>
                    {transaction.department}
                    {transaction.targetDepartment && (
                      <div className="text-xs text-gray-500">
                        → {transaction.targetDepartment}
                      </div>
                    )}
                  </TableCell>
                  <TableCell>{transaction.user}</TableCell>
                  <TableCell>
                    <Badge
                      className={getStatusColor(transaction.status)}
                      variant="outline"
                    >
                      {transaction.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onViewTransaction(transaction.id)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onEditTransaction(transaction.id)}
                        disabled={transaction.status === "completed"}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onDeleteTransaction(transaction.id)}
                        disabled={transaction.status === "completed"}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={9}
                  className="text-center py-6 text-gray-500"
                >
                  No transactions found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={9} className="text-right">
                Total: {sortedTransactions.length} transactions
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </div>
  );
};

export default TransactionTable;
