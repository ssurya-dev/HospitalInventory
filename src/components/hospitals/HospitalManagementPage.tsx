import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  ChevronDown,
  ChevronRight,
  Building,
  Building2,
  Users,
  Plus,
  PlusCircle,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import Sidebar from "../layout/Sidebar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface Department {
  id: string;
  name: string;
  type: string;
  staffCount: number;
  subdepartments?: Subdepartment[];
}

interface Subdepartment {
  id: string;
  name: string;
  staffCount: number;
}

interface Hospital {
  id: string;
  name: string;
  location: string;
  type: string;
  departments: Department[];
}

const HospitalManagementPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedHospitals, setExpandedHospitals] = useState<
    Record<string, boolean>
  >({
    H001: true,
    H002: false,
    H003: false,
  });

  const [expandedDepartments, setExpandedDepartments] = useState<
    Record<string, boolean>
  >({});
  const [isHospitalDialogOpen, setIsHospitalDialogOpen] = useState(false);
  const [isDepartmentDialogOpen, setIsDepartmentDialogOpen] = useState(false);
  const [isSubdepartmentDialogOpen, setIsSubdepartmentDialogOpen] =
    useState(false);
  const [selectedHospitalId, setSelectedHospitalId] = useState<string>("");
  const [selectedDepartmentId, setSelectedDepartmentId] = useState<string>("");

  // Mock data for hospitals
  const hospitals: Hospital[] = [
    {
      id: "H001",
      name: "General Hospital",
      location: "Downtown",
      type: "Public",
      departments: [
        {
          id: "D001",
          name: "Emergency Department",
          type: "Clinical",
          staffCount: 45,
          subdepartments: [
            { id: "SD001", name: "Trauma Unit", staffCount: 15 },
            { id: "SD002", name: "Triage", staffCount: 10 },
            { id: "SD003", name: "Pediatric Emergency", staffCount: 12 },
          ],
        },
        {
          id: "D002",
          name: "Surgery",
          type: "Clinical",
          staffCount: 38,
          subdepartments: [
            { id: "SD004", name: "General Surgery", staffCount: 12 },
            { id: "SD005", name: "Orthopedic Surgery", staffCount: 10 },
            { id: "SD006", name: "Cardiac Surgery", staffCount: 8 },
          ],
        },
        {
          id: "D003",
          name: "Pharmacy",
          type: "Support",
          staffCount: 15,
          subdepartments: [
            { id: "SD007", name: "Inpatient Pharmacy", staffCount: 8 },
            { id: "SD008", name: "Outpatient Pharmacy", staffCount: 7 },
          ],
        },
      ],
    },
    {
      id: "H002",
      name: "Children's Medical Center",
      location: "Westside",
      type: "Specialized",
      departments: [
        {
          id: "D004",
          name: "Pediatrics",
          type: "Clinical",
          staffCount: 32,
          subdepartments: [
            { id: "SD009", name: "Neonatal", staffCount: 12 },
            { id: "SD010", name: "Adolescent Medicine", staffCount: 10 },
            { id: "SD011", name: "Pediatric Oncology", staffCount: 10 },
          ],
        },
        {
          id: "D005",
          name: "Child Psychology",
          type: "Clinical",
          staffCount: 18,
          subdepartments: [
            { id: "SD012", name: "Behavioral Health", staffCount: 10 },
            { id: "SD013", name: "Developmental Psychology", staffCount: 8 },
          ],
        },
      ],
    },
    {
      id: "H003",
      name: "University Medical Center",
      location: "Eastside",
      type: "Teaching",
      departments: [
        {
          id: "D006",
          name: "Internal Medicine",
          type: "Clinical",
          staffCount: 50,
          subdepartments: [
            { id: "SD014", name: "Cardiology", staffCount: 15 },
            { id: "SD015", name: "Gastroenterology", staffCount: 12 },
            { id: "SD016", name: "Pulmonology", staffCount: 13 },
            { id: "SD017", name: "Endocrinology", staffCount: 10 },
          ],
        },
        {
          id: "D007",
          name: "Radiology",
          type: "Diagnostic",
          staffCount: 25,
          subdepartments: [
            { id: "SD018", name: "X-Ray", staffCount: 8 },
            { id: "SD019", name: "MRI", staffCount: 7 },
            { id: "SD020", name: "CT Scan", staffCount: 6 },
            { id: "SD021", name: "Ultrasound", staffCount: 4 },
          ],
        },
        {
          id: "D008",
          name: "Research",
          type: "Academic",
          staffCount: 30,
          subdepartments: [
            { id: "SD022", name: "Clinical Trials", staffCount: 15 },
            { id: "SD023", name: "Medical Research", staffCount: 15 },
          ],
        },
      ],
    },
  ];

  const toggleHospital = (hospitalId: string) => {
    setExpandedHospitals((prev) => ({
      ...prev,
      [hospitalId]: !prev[hospitalId],
    }));
  };

  const toggleDepartment = (departmentId: string) => {
    setExpandedDepartments((prev) => ({
      ...prev,
      [departmentId]: !prev[departmentId],
    }));
  };

  const filteredHospitals = hospitals.filter((hospital) => {
    const searchLower = searchTerm.toLowerCase();
    if (
      hospital.name.toLowerCase().includes(searchLower) ||
      hospital.location.toLowerCase().includes(searchLower) ||
      hospital.type.toLowerCase().includes(searchLower)
    ) {
      return true;
    }

    // Search in departments
    return hospital.departments.some(
      (dept) =>
        dept.name.toLowerCase().includes(searchLower) ||
        dept.type.toLowerCase().includes(searchLower) ||
        // Search in subdepartments
        (dept.subdepartments?.some((subdept) =>
          subdept.name.toLowerCase().includes(searchLower),
        ) ??
          false),
    );
  });

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
          <h1 className="text-2xl font-bold text-gray-900">
            Hospital Management
          </h1>
          <p className="text-gray-500">
            Manage hospitals, departments, and subdepartments
          </p>
        </div>

        <div className="mb-6 flex justify-between items-center">
          <Input
            placeholder="Search hospitals, departments, or subdepartments..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-md"
          />
          <Dialog
            open={isHospitalDialogOpen}
            onOpenChange={setIsHospitalDialogOpen}
          >
            <DialogTrigger asChild>
              <Button className="bg-green-600 hover:bg-green-700 text-white">
                <Plus className="h-4 w-4 mr-2" /> Add New Hospital
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Hospital</DialogTitle>
                <DialogDescription>
                  Enter the details for the new hospital.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="hospital-name" className="text-right">
                    Name
                  </Label>
                  <Input
                    id="hospital-name"
                    placeholder="Hospital name"
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="hospital-location" className="text-right">
                    Location
                  </Label>
                  <Input
                    id="hospital-location"
                    placeholder="Location"
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="hospital-type" className="text-right">
                    Type
                  </Label>
                  <Select>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select hospital type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="public">Public</SelectItem>
                      <SelectItem value="private">Private</SelectItem>
                      <SelectItem value="teaching">Teaching</SelectItem>
                      <SelectItem value="specialized">Specialized</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setIsHospitalDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    console.log("New hospital added");
                    setIsHospitalDialogOpen(false);
                  }}
                >
                  Add Hospital
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="space-y-4">
          {filteredHospitals.map((hospital) => (
            <Card key={hospital.id} className="w-full bg-white">
              <CardHeader
                className="pb-2 cursor-pointer"
                onClick={() => toggleHospital(hospital.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {expandedHospitals[hospital.id] ? (
                      <ChevronDown className="h-5 w-5 text-gray-500" />
                    ) : (
                      <ChevronRight className="h-5 w-5 text-gray-500" />
                    )}
                    <Building2 className="h-5 w-5 text-blue-600" />
                    <CardTitle className="text-lg">{hospital.name}</CardTitle>
                    <Badge variant="outline" className="ml-2">
                      {hospital.type}
                    </Badge>
                  </div>
                  <div className="text-sm text-gray-500">
                    {hospital.location}
                  </div>
                </div>
              </CardHeader>

              {expandedHospitals[hospital.id] && (
                <CardContent>
                  <div className="pl-6 space-y-3">
                    <div className="flex justify-between items-center mb-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-blue-600 border-blue-200 hover:bg-blue-50"
                        onClick={() => {
                          setSelectedHospitalId(hospital.id);
                          setIsDepartmentDialogOpen(true);
                        }}
                      >
                        <PlusCircle className="h-3 w-3 mr-1" /> Add Department
                      </Button>
                    </div>
                    {hospital.departments.map((department) => (
                      <div key={department.id} className="border-l-2 pl-4 pb-2">
                        <div
                          className="flex items-center gap-2 cursor-pointer py-2"
                          onClick={() => toggleDepartment(department.id)}
                        >
                          {expandedDepartments[department.id] ? (
                            <ChevronDown className="h-4 w-4 text-gray-500" />
                          ) : (
                            <ChevronRight className="h-4 w-4 text-gray-500" />
                          )}
                          <Building className="h-4 w-4 text-indigo-600" />
                          <span className="font-medium">{department.name}</span>
                          <Badge variant="secondary" className="ml-2">
                            {department.type}
                          </Badge>
                          <span className="text-sm text-gray-500 ml-auto">
                            {department.staffCount} Staff
                          </span>
                        </div>

                        {expandedDepartments[department.id] &&
                          department.subdepartments && (
                            <div className="pl-6 mt-2 space-y-2">
                              <div className="flex justify-between items-center mb-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="text-purple-600 border-purple-200 hover:bg-purple-50 text-xs"
                                  onClick={() => {
                                    setSelectedHospitalId(hospital.id);
                                    setSelectedDepartmentId(department.id);
                                    setIsSubdepartmentDialogOpen(true);
                                  }}
                                >
                                  <PlusCircle className="h-3 w-3 mr-1" /> Add
                                  Subdepartment
                                </Button>
                              </div>
                              {department.subdepartments.map((subdept) => (
                                <div
                                  key={subdept.id}
                                  className="flex items-center gap-2 border-l-2 pl-4 py-1"
                                >
                                  <Users className="h-4 w-4 text-purple-600" />
                                  <span>{subdept.name}</span>
                                  <span className="text-sm text-gray-500 ml-auto">
                                    {subdept.staffCount} Staff
                                  </span>
                                </div>
                              ))}
                            </div>
                          )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              )}
            </Card>
          ))}

          {filteredHospitals.length === 0 && (
            <div className="flex flex-col items-center justify-center p-12 border border-dashed border-gray-300 rounded-lg bg-white">
              <div className="text-gray-400 text-center">
                <Building2 className="h-16 w-16 mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No Hospitals Found</h3>
                <p className="max-w-md">
                  No hospitals match your search criteria. Try adjusting your
                  search terms.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Department Dialog */}
        <Dialog
          open={isDepartmentDialogOpen}
          onOpenChange={setIsDepartmentDialogOpen}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Department</DialogTitle>
              <DialogDescription>
                Add a new department to the selected hospital.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="department-name" className="text-right">
                  Name
                </Label>
                <Input
                  id="department-name"
                  placeholder="Department name"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="department-type" className="text-right">
                  Type
                </Label>
                <Select>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select department type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="clinical">Clinical</SelectItem>
                    <SelectItem value="diagnostic">Diagnostic</SelectItem>
                    <SelectItem value="support">Support</SelectItem>
                    <SelectItem value="administrative">
                      Administrative
                    </SelectItem>
                    <SelectItem value="academic">Academic</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="staff-count" className="text-right">
                  Staff Count
                </Label>
                <Input
                  id="staff-count"
                  type="number"
                  placeholder="Number of staff"
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsDepartmentDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  console.log(
                    `New department added to hospital ${selectedHospitalId}`,
                  );
                  setIsDepartmentDialogOpen(false);
                }}
              >
                Add Department
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Subdepartment Dialog */}
        <Dialog
          open={isSubdepartmentDialogOpen}
          onOpenChange={setIsSubdepartmentDialogOpen}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Subdepartment</DialogTitle>
              <DialogDescription>
                Add a new subdepartment to the selected department.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="subdepartment-name" className="text-right">
                  Name
                </Label>
                <Input
                  id="subdepartment-name"
                  placeholder="Subdepartment name"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="subdept-staff-count" className="text-right">
                  Staff Count
                </Label>
                <Input
                  id="subdept-staff-count"
                  type="number"
                  placeholder="Number of staff"
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsSubdepartmentDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  console.log(
                    `New subdepartment added to department ${selectedDepartmentId} in hospital ${selectedHospitalId}`,
                  );
                  setIsSubdepartmentDialogOpen(false);
                }}
              >
                Add Subdepartment
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default HospitalManagementPage;
