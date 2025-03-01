import React from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Sidebar from "../layout/Sidebar";
import ProfilePage from "./ProfilePage";

const SettingsPage = () => {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 overflow-auto">
        <ProfilePage />
      </div>
    </div>
  );
};

export default SettingsPage;
