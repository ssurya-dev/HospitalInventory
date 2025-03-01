import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Search, UserPlus, UserCog, Shield } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Sidebar from "../layout/Sidebar";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
  accessLevel: "admin" | "manager" | "user" | "readonly";
  lastActive: string;
  avatar?: string;
}

const UserManagementPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedHospital, setSelectedHospital] = useState("all");

  // Mock data for hospitals
  const hospitals = [
    { id: "all", name: "All Hospitals" },
    { id: "H001", name: "General Hospital" },
    { id: "H002", name: "Children's Medical Center" },
    { id: "H003", name: "University Medical Center" },
  ];

  // Mock data for users
  const allUsers: User[] = [
    {
      id: "U001",
      name: "Dr. John Smith",
      email: "john.smith@generalhospital.org",
      role: "Chief Physician",
      department: "Emergency Department",
      accessLevel: "admin",
      lastActive: "2023-06-15T10:30:00Z",
      avatar: "john",
      hospitalId: "H001",
    },
    {
      id: "U002",
      name: "Sarah Johnson",
      email: "sarah.johnson@generalhospital.org",
      role: "Inventory Manager",
      department: "Pharmacy",
      accessLevel: "manager",
      lastActive: "2023-06-15T09:15:00Z",
      avatar: "sarah",
      hospitalId: "H001",
    },
    {
      id: "U003",
      name: "Dr. Michael Chen",
      email: "michael.chen@childrens.org",
      role: "Pediatrician",
      department: "Pediatrics",
      accessLevel: "user",
      lastActive: "2023-06-14T14:45:00Z",
      avatar: "michael",
      hospitalId: "H002",
    },
    {
      id: "U004",
      name: "Emily Rodriguez",
      email: "emily.rodriguez@childrens.org",
      role: "Nurse Practitioner",
      department: "Child Psychology",
      accessLevel: "user",
      lastActive: "2023-06-14T11:20:00Z",
      avatar: "emily",
      hospitalId: "H002",
    },
    {
      id: "U005",
      name: "Prof. David Wilson",
      email: "david.wilson@umc.edu",
      role: "Research Director",
      department: "Research",
      accessLevel: "admin",
      lastActive: "2023-06-13T16:30:00Z",
      avatar: "david",
      hospitalId: "H003",
    },
    {
      id: "U006",
      name: "Dr. Lisa Taylor",
      email: "lisa.taylor@umc.edu",
      role: "Radiologist",
      department: "Radiology",
      accessLevel: "user",
      lastActive: "2023-06-13T13:45:00Z",
      avatar: "lisa",
      hospitalId: "H003",
    },
    {
      id: "U007",
      name: "Robert Brown",
      email: "robert.brown@umc.edu",
      role: "IT Administrator",
      department: "IT Support",
      accessLevel: "admin",
      lastActive: "2023-06-12T15:20:00Z",
      avatar: "robert",
      hospitalId: "H003",
    },
    {
      id: "U008",
      name: "Jennifer Lee",
      email: "jennifer.lee@generalhospital.org",
      role: "Nurse Manager",
      department: "Surgery",
      accessLevel: "manager",
      lastActive: "2023-06-12T10:15:00Z",
      avatar: "jennifer",
      hospitalId: "H001",
    },
  ];

  // Filter users based on selected hospital and search term
  const filteredUsers = allUsers.filter((user) => {
    // Filter by hospital
    if (selectedHospital !== "all" && user.hospitalId !== selectedHospital) {
      return false;
    }

    // Filter by search term
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      return (
        user.name.toLowerCase().includes(searchLower) ||
        user.email.toLowerCase().includes(searchLower) ||
        user.role.toLowerCase().includes(searchLower) ||
        user.department.toLowerCase().includes(searchLower)
      );
    }

    return true;
  });

  const getAccessLevelBadge = (level: string) => {
    switch (level) {
      case "admin":
        return <Badge className="bg-red-100 text-red-800">Admin</Badge>;
      case "manager":
        return <Badge className="bg-blue-100 text-blue-800">Manager</Badge>;
      case "user":
        return <Badge className="bg-green-100 text-green-800">User</Badge>;
      case "readonly":
        return <Badge className="bg-gray-100 text-gray-800">Read Only</Badge>;
      default:
        return null;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return (
      date.toLocaleDateString() +
      " " +
      date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    );
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />

      <div className="flex-1 overflow-auto p-6">
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => window.history.back()}
            >
              <ArrowLeft className="h-4 w-4 mr-1" /> Back
            </Button>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
          <p className="text-gray-500">Manage user access and permissions</p>
        </div>

        <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
            <Select
              value={selectedHospital}
              onValueChange={setSelectedHospital}
            >
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="Select hospital" />
              </SelectTrigger>
              <SelectContent>
                {hospitals.map((hospital) => (
                  <SelectItem key={hospital.id} value={hospital.id}>
                    {hospital.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="relative w-full md:w-[300px]">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <Button className="bg-green-600 hover:bg-green-700 text-white">
            <UserPlus className="h-4 w-4 mr-2" /> Add New User
          </Button>
        </div>

        <div className="space-y-4">
          {filteredUsers.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredUsers.map((user) => (
                <Card
                  key={user.id}
                  className="w-full bg-white hover:shadow-md transition-shadow"
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-12 w-12">
                          <AvatarImage
                            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.avatar || user.name}`}
                          />
                          <AvatarFallback>
                            {user.name.substring(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-medium">{user.name}</h3>
                          <p className="text-sm text-gray-500">{user.email}</p>
                        </div>
                      </div>
                      {getAccessLevelBadge(user.accessLevel)}
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Role:</span>
                        <span className="text-sm font-medium">{user.role}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">
                          Department:
                        </span>
                        <span className="text-sm font-medium">
                          {user.department}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">
                          Last Active:
                        </span>
                        <span className="text-sm">
                          {formatDate(user.lastActive)}
                        </span>
                      </div>
                    </div>

                    <div className="mt-4 flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-blue-600 border-blue-200 hover:bg-blue-50"
                      >
                        <Shield className="h-3.5 w-3.5 mr-1" /> Permissions
                      </Button>
                      <Button variant="outline" size="sm">
                        <UserCog className="h-3.5 w-3.5 mr-1" /> Edit
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center p-12 border border-dashed border-gray-300 rounded-lg bg-white">
              <div className="text-gray-400 text-center">
                <UserCog className="h-16 w-16 mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No Users Found</h3>
                <p className="max-w-md">
                  {searchTerm
                    ? "No users match your search criteria. Try adjusting your search terms."
                    : "No users found for the selected hospital."}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserManagementPage;
