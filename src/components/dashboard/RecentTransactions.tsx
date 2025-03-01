import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, ArrowRight, Clock, Calendar } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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
  userAvatar?: string;
  status: "completed" | "pending" | "cancelled";
}

interface RecentTransactionsProps {
  transactions?: Transaction[];
  onViewAll?: () => void;
  onViewTransaction?: (id: string) => void;
}

const RecentTransactions = ({
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
      userAvatar: "john",
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
      userAvatar: "jane",
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
      userAvatar: "mike",
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
      userAvatar: "sarah",
      status: "completed",
    },
  ],
  onViewAll = () => {},
  onViewTransaction = () => {},
}: RecentTransactionsProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString(undefined, {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
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

  return (
    <Card className="w-full bg-white">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl font-bold">Recent Transactions</CardTitle>
        <Button
          variant="ghost"
          size="sm"
          onClick={onViewAll}
          className="flex items-center gap-1"
        >
          <span>View All</span>
          <ArrowRight className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {transactions.map((transaction) => (
            <div
              key={transaction.id}
              className="flex items-center justify-between p-3 rounded-lg border hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage
                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${transaction.userAvatar || transaction.user}`}
                    alt={transaction.user}
                  />
                  <AvatarFallback>
                    {transaction.user.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center gap-2">
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
                    <Badge
                      className={getStatusColor(transaction.status)}
                      variant="outline"
                    >
                      {transaction.status}
                    </Badge>
                  </div>
                  <p className="font-medium mt-1">{transaction.itemName}</p>
                  <p className="text-sm text-gray-500">
                    {transaction.quantity} units • {transaction.department}
                    {transaction.targetDepartment && (
                      <span className="inline-flex items-center">
                        <ArrowRight className="h-3 w-3 mx-1" />
                        {transaction.targetDepartment}
                      </span>
                    )}
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <div className="text-sm text-gray-500 flex items-center">
                  <Clock className="h-3 w-3 mr-1" />
                  {formatDate(transaction.timestamp)}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0"
                  onClick={() => onViewTransaction(transaction.id)}
                >
                  <Eye className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
        {transactions.length === 0 && (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <Calendar className="h-10 w-10 text-gray-300 mb-2" />
            <p className="text-gray-500">No recent transactions</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RecentTransactions;
