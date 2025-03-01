import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  ArrowLeftRight,
  Clipboard,
  Download,
  FileBarChart,
  Package,
  ShoppingCart,
} from "lucide-react";

interface ItemDetailProps {
  item?: {
    id: string;
    name: string;
    category: string;
    department: string;
    currentQuantity: number;
    minThreshold: number;
    description: string;
    lastUpdated: string;
    status: "In Stock" | "Low Stock" | "Out of Stock";
    location: string;
    serialNumber?: string;
    manufacturer?: string;
    purchaseDate?: string;
    expiryDate?: string;
  };
  onClose?: () => void;
}

const ItemDetailView = ({
  item = {
    id: "ITM-12345",
    name: "Surgical Gloves (Medium)",
    category: "Protective Equipment",
    department: "Surgery",
    currentQuantity: 45,
    minThreshold: 100,
    description: "Sterile latex-free surgical gloves, medium size",
    lastUpdated: "2023-06-15T09:30:00",
    status: "Low Stock",
    location: "Storage Room B, Shelf 3",
    serialNumber: "SN-GL-2023-456",
    manufacturer: "MedSupply Inc.",
    purchaseDate: "2023-01-10",
    expiryDate: "2025-01-10",
  },
  onClose = () => {},
}: ItemDetailProps) => {
  const [isTransferDialogOpen, setIsTransferDialogOpen] = useState(true);
  const [isBookDialogOpen, setIsBookDialogOpen] = useState(true);

  // Mock transaction history data
  const transactionHistory = [
    {
      id: "TRX-789",
      date: "2023-06-15",
      type: "Book Out",
      quantity: 5,
      user: "Dr. Smith",
      department: "Surgery",
    },
    {
      id: "TRX-788",
      date: "2023-06-14",
      type: "Book In",
      quantity: 50,
      user: "John Inventory",
      department: "Central Supply",
    },
    {
      id: "TRX-787",
      date: "2023-06-10",
      type: "Transfer",
      quantity: 20,
      user: "Jane Doe",
      department: "Emergency → Surgery",
    },
    {
      id: "TRX-786",
      date: "2023-06-05",
      type: "Book Out",
      quantity: 10,
      user: "Dr. Johnson",
      department: "Surgery",
    },
    {
      id: "TRX-785",
      date: "2023-06-01",
      type: "Book In",
      quantity: 100,
      user: "John Inventory",
      department: "Central Supply",
    },
  ];

  // Get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "In Stock":
        return "bg-green-100 text-green-800";
      case "Low Stock":
        return "bg-yellow-100 text-yellow-800";
      case "Out of Stock":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto bg-white shadow-lg">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-2xl font-bold">{item.name}</CardTitle>
            <CardDescription className="text-gray-500">
              ID: {item.id}
            </CardDescription>
          </div>
          <Badge className={getStatusColor(item.status)}>{item.status}</Badge>
        </div>
      </CardHeader>

      <CardContent>
        <Tabs defaultValue="details" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="details">Item Details</TabsTrigger>
            <TabsTrigger value="transactions">Transaction History</TabsTrigger>
            <TabsTrigger value="analytics">Usage Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="pt-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Category</h3>
                <p>{item.category}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">
                  Department
                </h3>
                <p>{item.department}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">
                  Current Quantity
                </h3>
                <p
                  className={
                    item.currentQuantity < item.minThreshold
                      ? "text-red-600 font-medium"
                      : ""
                  }
                >
                  {item.currentQuantity} units
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">
                  Minimum Threshold
                </h3>
                <p>{item.minThreshold} units</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Location</h3>
                <p>{item.location}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">
                  Last Updated
                </h3>
                <p>{new Date(item.lastUpdated).toLocaleString()}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">
                  Serial Number
                </h3>
                <p>{item.serialNumber || "N/A"}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">
                  Manufacturer
                </h3>
                <p>{item.manufacturer || "N/A"}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">
                  Purchase Date
                </h3>
                <p>{item.purchaseDate || "N/A"}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">
                  Expiry Date
                </h3>
                <p
                  className={
                    item.expiryDate && new Date(item.expiryDate) < new Date()
                      ? "text-red-600 font-medium"
                      : ""
                  }
                >
                  {item.expiryDate || "N/A"}
                </p>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-sm font-medium text-gray-500">Description</h3>
              <p className="mt-1">{item.description}</p>
            </div>
          </TabsContent>

          <TabsContent value="transactions" className="pt-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Department</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactionHistory.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell className="font-medium">
                      {transaction.id}
                    </TableCell>
                    <TableCell>{transaction.date}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          transaction.type === "Book In"
                            ? "outline"
                            : transaction.type === "Book Out"
                              ? "secondary"
                              : "default"
                        }
                      >
                        {transaction.type}
                      </Badge>
                    </TableCell>
                    <TableCell>{transaction.quantity}</TableCell>
                    <TableCell>{transaction.user}</TableCell>
                    <TableCell>{transaction.department}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>

          <TabsContent value="analytics" className="pt-4">
            <div className="flex flex-col items-center justify-center h-64 text-center">
              <FileBarChart className="h-16 w-16 text-gray-300 mb-4" />
              <h3 className="text-lg font-medium">Usage Analytics</h3>
              <p className="text-gray-500 mt-2">
                Detailed usage patterns and consumption trends would be
                displayed here.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>

      <Separator />

      <CardFooter className="flex justify-between pt-6">
        <Button variant="outline" onClick={onClose}>
          Close
        </Button>

        <div className="flex gap-2">
          <Dialog open={isBookDialogOpen} onOpenChange={setIsBookDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="flex gap-2">
                <Clipboard className="h-4 w-4" />
                Book In/Out
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Book Item In/Out</DialogTitle>
                <DialogDescription>
                  Update inventory by booking this item in or out of the system.
                </DialogDescription>
              </DialogHeader>

              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="transaction-type" className="text-right">
                    Action
                  </Label>
                  <Select defaultValue="out">
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select action" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="in">Book In</SelectItem>
                      <SelectItem value="out">Book Out</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="quantity" className="text-right">
                    Quantity
                  </Label>
                  <Input
                    id="quantity"
                    type="number"
                    defaultValue="1"
                    min="1"
                    className="col-span-3"
                  />
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="notes" className="text-right">
                    Notes
                  </Label>
                  <Input
                    id="notes"
                    placeholder="Optional notes"
                    className="col-span-3"
                  />
                </div>
              </div>

              <DialogFooter>
                <Button type="submit">Confirm</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Dialog
            open={isTransferDialogOpen}
            onOpenChange={setIsTransferDialogOpen}
          >
            <DialogTrigger asChild>
              <Button variant="outline" className="flex gap-2">
                <ArrowLeftRight className="h-4 w-4" />
                Transfer
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Transfer Item</DialogTitle>
                <DialogDescription>
                  Transfer this item to another department.
                </DialogDescription>
              </DialogHeader>

              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="destination" className="text-right">
                    Destination
                  </Label>
                  <Select>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="emergency">Emergency</SelectItem>
                      <SelectItem value="icu">ICU</SelectItem>
                      <SelectItem value="pediatrics">Pediatrics</SelectItem>
                      <SelectItem value="radiology">Radiology</SelectItem>
                      <SelectItem value="laboratory">Laboratory</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="transfer-quantity" className="text-right">
                    Quantity
                  </Label>
                  <Input
                    id="transfer-quantity"
                    type="number"
                    defaultValue="1"
                    min="1"
                    max={item.currentQuantity.toString()}
                    className="col-span-3"
                  />
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="transfer-notes" className="text-right">
                    Notes
                  </Label>
                  <Input
                    id="transfer-notes"
                    placeholder="Reason for transfer"
                    className="col-span-3"
                  />
                </div>
              </div>

              <DialogFooter>
                <Button type="submit">Initiate Transfer</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Button variant="default" className="flex gap-2">
            <ShoppingCart className="h-4 w-4" />
            Order More
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ItemDetailView;
