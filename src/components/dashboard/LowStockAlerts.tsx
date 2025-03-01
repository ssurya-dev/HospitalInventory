import React, { useState } from "react";
import {
  AlertTriangle,
  ShoppingCart,
  ArrowUpDown,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface LowStockItem {
  id: string;
  name: string;
  category: string;
  department: string;
  currentQuantity: number;
  minThreshold: number;
  status: "critical" | "low";
  lastUpdated: string;
}

interface LowStockAlertsProps {
  items?: LowStockItem[];
  onOrderSupplies?: (itemId: string) => void;
  onViewDetails?: (itemId: string) => void;
}

const LowStockAlerts = ({
  items = [
    {
      id: "ITM-001",
      name: "Surgical Gloves",
      category: "Protective Equipment",
      department: "Surgery",
      currentQuantity: 45,
      minThreshold: 100,
      status: "low" as const,
      lastUpdated: "2023-06-15T09:30:00",
    },
    {
      id: "ITM-002",
      name: "IV Catheters",
      category: "Medical Supplies",
      department: "Emergency",
      currentQuantity: 12,
      minThreshold: 50,
      status: "critical" as const,
      lastUpdated: "2023-06-14T14:45:00",
    },
    {
      id: "ITM-003",
      name: "Oxygen Masks",
      category: "Respiratory",
      department: "ICU",
      currentQuantity: 8,
      minThreshold: 30,
      status: "critical" as const,
      lastUpdated: "2023-06-13T11:20:00",
    },
    {
      id: "ITM-004",
      name: "Bandages",
      category: "Wound Care",
      department: "Emergency",
      currentQuantity: 75,
      minThreshold: 150,
      status: "low" as const,
      lastUpdated: "2023-06-12T16:10:00",
    },
    {
      id: "ITM-005",
      name: "Syringes",
      category: "Medical Supplies",
      department: "Pharmacy",
      currentQuantity: 60,
      minThreshold: 200,
      status: "critical" as const,
      lastUpdated: "2023-06-11T10:05:00",
    },
  ],
  onOrderSupplies = (itemId) =>
    console.log(`Order supplies for item ${itemId}`),
  onViewDetails = (itemId) => console.log(`View details for item ${itemId}`),
}: LowStockAlertsProps) => {
  const [sortColumn, setSortColumn] = useState<keyof LowStockItem>("status");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [isOrderDialogOpen, setIsOrderDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<LowStockItem | null>(null);
  const [orderQuantity, setOrderQuantity] = useState("100");

  const handleSort = (column: keyof LowStockItem) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const sortedItems = [...items].sort((a, b) => {
    if (sortColumn === "currentQuantity" || sortColumn === "minThreshold") {
      return sortDirection === "asc"
        ? a[sortColumn] - b[sortColumn]
        : b[sortColumn] - a[sortColumn];
    }

    if (sortColumn === "lastUpdated") {
      return sortDirection === "asc"
        ? new Date(a.lastUpdated).getTime() - new Date(b.lastUpdated).getTime()
        : new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime();
    }

    const aValue = String(a[sortColumn]);
    const bValue = String(b[sortColumn]);

    return sortDirection === "asc"
      ? aValue.localeCompare(bValue)
      : bValue.localeCompare(aValue);
  });

  const handleOrderClick = (item: LowStockItem) => {
    setSelectedItem(item);
    setOrderQuantity(String(item.minThreshold - item.currentQuantity));
    setIsOrderDialogOpen(true);
  };

  const handleOrderSubmit = () => {
    if (selectedItem) {
      onOrderSupplies(selectedItem.id);
      setIsOrderDialogOpen(false);
      setSelectedItem(null);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "critical":
        return (
          <Badge variant="destructive" className="flex items-center gap-1">
            <AlertTriangle className="h-3 w-3" />
            Critical
          </Badge>
        );
      case "low":
        return (
          <Badge
            variant="secondary"
            className="flex items-center gap-1 bg-yellow-100 text-yellow-800"
          >
            <AlertTriangle className="h-3 w-3" />
            Low Stock
          </Badge>
        );
      default:
        return null;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <Card className="w-full bg-white">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-xl font-bold">
              Low Stock Alerts
            </CardTitle>
            <CardDescription>
              Items that need to be restocked soon
            </CardDescription>
          </div>
          <Badge variant="outline" className="bg-red-50 text-red-700">
            {items.filter((item) => item.status === "critical").length} Critical
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead
                  className="cursor-pointer"
                  onClick={() => handleSort("name")}
                >
                  Item
                  {sortColumn === "name" ? (
                    sortDirection === "asc" ? (
                      <ChevronUp className="inline ml-1 h-4 w-4" />
                    ) : (
                      <ChevronDown className="inline ml-1 h-4 w-4" />
                    )
                  ) : (
                    <ArrowUpDown className="inline ml-1 h-4 w-4" />
                  )}
                </TableHead>
                <TableHead
                  className="cursor-pointer"
                  onClick={() => handleSort("department")}
                >
                  Department
                  <ArrowUpDown className="inline ml-1 h-4 w-4" />
                </TableHead>
                <TableHead
                  className="cursor-pointer text-right"
                  onClick={() => handleSort("currentQuantity")}
                >
                  Current
                  <ArrowUpDown className="inline ml-1 h-4 w-4" />
                </TableHead>
                <TableHead
                  className="cursor-pointer text-right"
                  onClick={() => handleSort("minThreshold")}
                >
                  Threshold
                  <ArrowUpDown className="inline ml-1 h-4 w-4" />
                </TableHead>
                <TableHead
                  className="cursor-pointer"
                  onClick={() => handleSort("status")}
                >
                  Status
                  <ArrowUpDown className="inline ml-1 h-4 w-4" />
                </TableHead>
                <TableHead
                  className="cursor-pointer"
                  onClick={() => handleSort("lastUpdated")}
                >
                  Last Updated
                  <ArrowUpDown className="inline ml-1 h-4 w-4" />
                </TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">
                    <div>{item.name}</div>
                    <div className="text-xs text-gray-500">{item.category}</div>
                  </TableCell>
                  <TableCell>{item.department}</TableCell>
                  <TableCell className="text-right">
                    <span
                      className={`font-medium ${item.status === "critical" ? "text-red-600" : "text-yellow-600"}`}
                    >
                      {item.currentQuantity}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    {item.minThreshold}
                  </TableCell>
                  <TableCell>{getStatusBadge(item.status)}</TableCell>
                  <TableCell>{formatDate(item.lastUpdated)}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-blue-600 border-blue-200 hover:bg-blue-50"
                        onClick={() => onViewDetails(item.id)}
                      >
                        Details
                      </Button>
                      <Dialog
                        open={isOrderDialogOpen && selectedItem?.id === item.id}
                        onOpenChange={setIsOrderDialogOpen}
                      >
                        <DialogTrigger asChild>
                          <Button
                            size="sm"
                            className="bg-green-600 hover:bg-green-700 text-white"
                            onClick={() => handleOrderClick(item)}
                          >
                            <ShoppingCart className="mr-1 h-4 w-4" />
                            Order
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Order Supplies</DialogTitle>
                            <DialogDescription>
                              Create a purchase request for {item.name}
                            </DialogDescription>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="item-name" className="text-right">
                                Item
                              </Label>
                              <Input
                                id="item-name"
                                value={item.name}
                                className="col-span-3"
                                disabled
                              />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="quantity" className="text-right">
                                Quantity
                              </Label>
                              <Input
                                id="quantity"
                                type="number"
                                value={orderQuantity}
                                onChange={(e) =>
                                  setOrderQuantity(e.target.value)
                                }
                                className="col-span-3"
                                min="1"
                              />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="priority" className="text-right">
                                Priority
                              </Label>
                              <Select defaultValue="high">
                                <SelectTrigger className="col-span-3">
                                  <SelectValue placeholder="Select priority" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="critical">
                                    Critical
                                  </SelectItem>
                                  <SelectItem value="high">High</SelectItem>
                                  <SelectItem value="medium">Medium</SelectItem>
                                  <SelectItem value="low">Low</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="notes" className="text-right">
                                Notes
                              </Label>
                              <Input
                                id="notes"
                                placeholder="Any special instructions"
                                className="col-span-3"
                              />
                            </div>
                          </div>
                          <DialogFooter>
                            <Button
                              type="button"
                              variant="outline"
                              onClick={() => setIsOrderDialogOpen(false)}
                            >
                              Cancel
                            </Button>
                            <Button type="button" onClick={handleOrderSubmit}>
                              Submit Order
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default LowStockAlerts;
