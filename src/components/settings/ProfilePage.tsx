import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ArrowLeft,
  Camera,
  Clock,
  Edit,
  Eye,
  Globe,
  Lock,
  Mail,
  MessageSquare,
  Save,
  User,
  UserCog,
} from "lucide-react";

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState(
    "https://api.dicebear.com/7.x/avataaars/svg?seed=hospital",
  );

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const recentActivities = [
    {
      id: 1,
      action: "Booked out 50 Surgical Gloves",
      timestamp: "Today, 10:30 AM",
      department: "Surgery",
    },
    {
      id: 2,
      action: "Approved transfer request TR-2023-003",
      timestamp: "Yesterday, 3:45 PM",
      department: "Radiology",
    },
    {
      id: 3,
      action: "Updated inventory for IV Catheters",
      timestamp: "Jun 15, 2023, 11:20 AM",
      department: "Emergency",
    },
    {
      id: 4,
      action: "Generated monthly usage report",
      timestamp: "Jun 14, 2023, 2:15 PM",
      department: "All Departments",
    },
  ];

  return (
    <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="flex items-center gap-2 mb-6">
        <Button variant="ghost" size="sm" onClick={() => window.history.back()}>
          <ArrowLeft className="h-4 w-4 mr-1" /> Back
        </Button>
        <h1 className="text-2xl font-bold">Settings</h1>
      </div>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="account" className="flex items-center gap-2">
            <UserCog className="h-4 w-4" />
            Account Settings
          </TabsTrigger>
          <TabsTrigger value="activity" className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Activity
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="md:col-span-1">
              <CardHeader>
                <CardTitle>Profile Picture</CardTitle>
                <CardDescription>Update your profile photo</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center">
                <div className="relative mb-4">
                  <Avatar className="h-32 w-32">
                    <AvatarImage src={profileImage} alt="Profile" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <label
                    htmlFor="profile-upload"
                    className="absolute bottom-0 right-0 bg-primary text-white p-2 rounded-full cursor-pointer"
                  >
                    <Camera className="h-4 w-4" />
                    <input
                      id="profile-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageUpload}
                    />
                  </label>
                </div>
                <h3 className="text-lg font-medium">Dr. Jane Doe</h3>
                <p className="text-sm text-muted-foreground">Chief Surgeon</p>
                <div className="flex gap-2 mt-2">
                  <Badge>Surgery Dept.</Badge>
                  <Badge variant="outline">Admin</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="md:col-span-2">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>
                    Manage your personal details
                  </CardDescription>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsEditing(!isEditing)}
                >
                  {isEditing ? (
                    <>
                      <Save className="h-4 w-4 mr-2" /> Save
                    </>
                  ) : (
                    <>
                      <Edit className="h-4 w-4 mr-2" /> Edit
                    </>
                  )}
                </Button>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input
                      id="fullName"
                      defaultValue="Dr. Jane Doe"
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="username">Username</Label>
                    <Input
                      id="username"
                      defaultValue="jane.doe"
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      defaultValue="jane.doe@hospital.org"
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      defaultValue="+1 (555) 123-4567"
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="language">Preferred Language</Label>
                    <Select defaultValue="en" disabled={!isEditing}>
                      <SelectTrigger id="language">
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="es">Spanish</SelectItem>
                        <SelectItem value="fr">French</SelectItem>
                        <SelectItem value="de">German</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="timezone">Timezone</Label>
                    <Select defaultValue="est" disabled={!isEditing}>
                      <SelectTrigger id="timezone">
                        <SelectValue placeholder="Select timezone" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="est">Eastern Time (ET)</SelectItem>
                        <SelectItem value="cst">Central Time (CT)</SelectItem>
                        <SelectItem value="mst">Mountain Time (MT)</SelectItem>
                        <SelectItem value="pst">Pacific Time (PT)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="md:col-span-3">
              <CardHeader>
                <CardTitle>Hospital & Department Access</CardTitle>
                <CardDescription>
                  Hospitals and departments you have access to
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="rounded-md border p-4">
                    <h3 className="text-lg font-medium mb-2">
                      General Hospital
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="flex items-center gap-2">
                        <Badge className="bg-green-100 text-green-800">
                          Full Access
                        </Badge>
                        <span>Surgery Department</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className="bg-blue-100 text-blue-800">
                          View Only
                        </Badge>
                        <span>Emergency Department</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className="bg-blue-100 text-blue-800">
                          View Only
                        </Badge>
                        <span>Pharmacy</span>
                      </div>
                    </div>
                  </div>
                  <div className="rounded-md border p-4">
                    <h3 className="text-lg font-medium mb-2">
                      Children's Medical Center
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="flex items-center gap-2">
                        <Badge className="bg-yellow-100 text-yellow-800">
                          Limited Access
                        </Badge>
                        <span>Pediatric Surgery</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="account">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="h-5 w-5" />
                  Security Settings
                </CardTitle>
                <CardDescription>Manage your account security</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="current-password">Current Password</Label>
                  <Input id="current-password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-password">New Password</Label>
                  <Input id="new-password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm New Password</Label>
                  <Input id="confirm-password" type="password" />
                </div>
              </CardContent>
              <CardFooter>
                <Button>Update Password</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Notification Preferences
                </CardTitle>
                <CardDescription>
                  Manage how you receive notifications
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="email-notifications">
                      Email Notifications
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Receive notifications via email
                    </p>
                  </div>
                  <Switch id="email-notifications" defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="low-stock-alerts">Low Stock Alerts</Label>
                    <p className="text-sm text-muted-foreground">
                      Get notified when items are running low
                    </p>
                  </div>
                  <Switch id="low-stock-alerts" defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="transfer-requests">Transfer Requests</Label>
                    <p className="text-sm text-muted-foreground">
                      Notifications for new transfer requests
                    </p>
                  </div>
                  <Switch id="transfer-requests" defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="system-updates">System Updates</Label>
                    <p className="text-sm text-muted-foreground">
                      Get notified about system updates
                    </p>
                  </div>
                  <Switch id="system-updates" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="h-5 w-5" />
                  Privacy Settings
                </CardTitle>
                <CardDescription>
                  Manage your privacy preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="profile-visibility">
                      Profile Visibility
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Who can see your profile information
                    </p>
                  </div>
                  <Select defaultValue="department">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select visibility" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="public">All Hospital Staff</SelectItem>
                      <SelectItem value="department">
                        Department Only
                      </SelectItem>
                      <SelectItem value="private">
                        Administrators Only
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="activity-tracking">Activity Tracking</Label>
                    <p className="text-sm text-muted-foreground">
                      Allow system to track your activities
                    </p>
                  </div>
                  <Switch id="activity-tracking" defaultChecked />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  Regional Settings
                </CardTitle>
                <CardDescription>
                  Customize regional preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="date-format">Date Format</Label>
                  <Select defaultValue="mdy">
                    <SelectTrigger id="date-format">
                      <SelectValue placeholder="Select date format" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mdy">MM/DD/YYYY</SelectItem>
                      <SelectItem value="dmy">DD/MM/YYYY</SelectItem>
                      <SelectItem value="ymd">YYYY/MM/DD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time-format">Time Format</Label>
                  <Select defaultValue="12h">
                    <SelectTrigger id="time-format">
                      <SelectValue placeholder="Select time format" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="12h">12-hour (AM/PM)</SelectItem>
                      <SelectItem value="24h">24-hour</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="first-day">First Day of Week</Label>
                  <Select defaultValue="sunday">
                    <SelectTrigger id="first-day">
                      <SelectValue placeholder="Select first day" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sunday">Sunday</SelectItem>
                      <SelectItem value="monday">Monday</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="activity">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>
                Your recent actions in the system
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex">
                    <div className="mr-4 flex flex-col items-center">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                        <Clock className="h-5 w-5 text-primary" />
                      </div>
                      <div className="h-full w-px bg-border"></div>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {activity.action}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {activity.timestamp}
                      </p>
                      <div className="flex items-center pt-2">
                        <Badge variant="outline">{activity.department}</Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                View All Activity
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProfilePage;
