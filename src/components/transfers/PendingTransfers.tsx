import React from "react";
import { Check, Clock, X, ArrowRight, Eye } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
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

interface TransferItem {
  id: string;
  name: string;
  category: string;
  quantity: number;
  unit: string;
}

interface PendingTransfer {
  id: string;
  status: "pending" | "approved" | "rejected";
  sourceDepartment: string;
  destinationDepartment: string;
  requestedBy: string;
  requestedAt: string;
  items: TransferItem[];
}

interface PendingTransfersProps {
  transfers?: PendingTransfer[];
  onApprove?: (transferId: string) => void;
  onReject?: (transferId: string) => void;
  onView?: (transferId: string) => void;
}

const PendingTransfers = ({
  transfers = [
    {
      id: "TR-2023-001",
      status: "pending",
      sourceDepartment: "Emergency",
      destinationDepartment: "Surgery",
      requestedBy: "Dr. Jane Smith",
      requestedAt: "2023-06-15T09:30:00",
      items: [
        {
          id: "ITEM-001",
          name: "Surgical Gloves",
          category: "Protective Equipment",
          quantity: 50,
          unit: "pairs",
        },
        {
          id: "ITEM-002",
          name: "Surgical Masks",
          category: "Protective Equipment",
          quantity: 100,
          unit: "pieces",
        },
      ],
    },
    {
      id: "TR-2023-002",
      status: "pending",
      sourceDepartment: "Pharmacy",
      destinationDepartment: "Pediatrics",
      requestedBy: "John Doe",
      requestedAt: "2023-06-14T14:45:00",
      items: [
        {
          id: "ITEM-003",
          name: "Children's Acetaminophen",
          category: "Medication",
          quantity: 20,
          unit: "bottles",
        },
      ],
    },
    {
      id: "TR-2023-003",
      status: "pending",
      sourceDepartment: "Central Supply",
      destinationDepartment: "Radiology",
      requestedBy: "Sarah Johnson",
      requestedAt: "2023-06-13T11:15:00",
      items: [
        {
          id: "ITEM-004",
          name: "Contrast Media",
          category: "Imaging Supplies",
          quantity: 10,
          unit: "vials",
        },
        {
          id: "ITEM-005",
          name: "Disposable Gowns",
          category: "Protective Equipment",
          quantity: 30,
          unit: "pieces",
        },
      ],
    },
  ],
  onApprove = () => {},
  onReject = () => {},
  onView = () => {},
}: PendingTransfersProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge
            variant="secondary"
            className="flex items-center gap-1 bg-amber-100 text-amber-800"
          >
            <Clock className="h-3 w-3" />
            Pending
          </Badge>
        );
      case "approved":
        return (
          <Badge
            variant="secondary"
            className="flex items-center gap-1 bg-green-100 text-green-800"
          >
            <Check className="h-3 w-3" />
            Approved
          </Badge>
        );
      case "rejected":
        return (
          <Badge
            variant="secondary"
            className="flex items-center gap-1 bg-red-100 text-red-800"
          >
            <X className="h-3 w-3" />
            Rejected
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <Card className="w-full bg-white">
      <CardHeader>
        <CardTitle className="text-xl font-bold">Pending Transfers</CardTitle>
      </CardHeader>
      <CardContent>
        {transfers.length === 0 ? (
          <div className="flex h-40 items-center justify-center">
            <p className="text-muted-foreground">
              No pending transfers available
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {transfers.map((transfer) => (
              <div
                key={transfer.id}
                className="rounded-lg border p-4 shadow-sm"
              >
                <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <h3 className="font-medium">{transfer.id}</h3>
                    {getStatusBadge(transfer.status)}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Requested: {formatDate(transfer.requestedAt)}
                  </div>
                </div>

                <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  <div>
                    <p className="text-xs text-muted-foreground">From</p>
                    <p className="font-medium">{transfer.sourceDepartment}</p>
                  </div>
                  <div className="flex items-center">
                    <ArrowRight className="mx-2 h-4 w-4 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">To</p>
                    <p className="font-medium">
                      {transfer.destinationDepartment}
                    </p>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-xs text-muted-foreground">Requested By</p>
                  <p>{transfer.requestedBy}</p>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Item</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead className="text-right">Quantity</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {transfer.items.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">
                          {item.name}
                        </TableCell>
                        <TableCell>{item.category}</TableCell>
                        <TableCell className="text-right">
                          {item.quantity} {item.unit}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                <div className="mt-4 flex justify-end space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onView(transfer.id)}
                    className="flex items-center gap-1"
                  >
                    <Eye className="h-4 w-4" />
                    View Details
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
                    onClick={() => onReject(transfer.id)}
                  >
                    <X className="mr-1 h-4 w-4" />
                    Reject
                  </Button>
                  <Button
                    size="sm"
                    className="bg-green-600 text-white hover:bg-green-700"
                    onClick={() => onApprove(transfer.id)}
                  >
                    <Check className="mr-1 h-4 w-4" />
                    Approve
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PendingTransfers;
