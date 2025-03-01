import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  LayoutDashboard,
  ClipboardList,
  ArrowLeftRight,
  Search,
  FileBarChart,
  Settings,
  LogOut,
  Menu,
  X,
  Package,
  Plus,
  Minus,
  Building2,
  Users,
  ShieldAlert,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

interface SidebarProps {
  className?: string;
}

const Sidebar = ({ className }: SidebarProps = {}) => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const toggleMobileSidebar = () => {
    setMobileOpen(!mobileOpen);
  };

  const NavItem = ({
    icon: Icon,
    label,
    href,
    active = false,
  }: {
    icon: React.ElementType;
    label: string;
    href: string;
    active?: boolean;
  }) => (
    <Link to={href}>
      <Button
        variant="ghost"
        className={cn(
          "w-full justify-start gap-3 px-3",
          active
            ? "bg-primary/10 text-primary font-medium"
            : "text-muted-foreground hover:text-primary",
        )}
      >
        <Icon className="h-5 w-5" />
        {!collapsed && <span>{label}</span>}
      </Button>
    </Link>
  );

  const sidebarContent = (
    <div
      className={cn(
        "flex h-full flex-col bg-white p-4 shadow-md transition-all duration-300",
        collapsed ? "w-[70px]" : "w-[280px]",
        className,
      )}
    >
      <div className="flex items-center justify-between">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <Package className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-bold">MedInventory</h1>
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          className="hidden md:flex"
          onClick={toggleSidebar}
        >
          <Menu className="h-5 w-5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={toggleMobileSidebar}
        >
          <X className="h-5 w-5" />
        </Button>
      </div>

      <div className="mt-8 flex flex-col gap-2">
        <NavItem
          icon={LayoutDashboard}
          label="Dashboard"
          href="/"
          active={true}
        />
        <NavItem icon={Plus} label="Book In" href="/transactions?tab=book-in" />
        <NavItem
          icon={Minus}
          label="Book Out"
          href="/transactions?tab=book-out"
        />
        <NavItem
          icon={ClipboardList}
          label="Transaction Log"
          href="/transactions"
        />
        <NavItem
          icon={ArrowLeftRight}
          label="Transfer Management"
          href="/transfers"
        />
        <NavItem icon={Search} label="Inventory Search" href="/search" />
        <NavItem icon={FileBarChart} label="Reporting" href="/reports" />

        <div className="mt-2 mb-2 group relative">
          <div className="flex items-center px-3 py-2 text-muted-foreground cursor-pointer hover:text-primary">
            <ShieldAlert className="h-5 w-5 mr-2" />
            <span className="font-medium">Admin</span>
            <ChevronRight className="ml-auto h-4 w-4 transition-transform group-hover:rotate-90" />
          </div>
          <div className="pl-4 max-h-0 overflow-hidden transition-all duration-300 group-hover:max-h-24">
            <NavItem
              icon={Building2}
              label="Hospital Management"
              href="/hospitals"
            />
            <NavItem icon={Users} label="User Management" href="/users" />
          </div>
        </div>
      </div>

      <Separator className="my-6" />

      {!collapsed && (
        <div className="mt-auto">
          <NavItem icon={Settings} label="Settings" href="/settings" />
          <NavItem icon={LogOut} label="Logout" href="/logout" />
        </div>
      )}

      {!collapsed && (
        <div className="mt-6 flex items-center gap-3 rounded-lg bg-gray-50 p-3">
          <Avatar>
            <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=hospital" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="text-sm font-medium">Dr. Jane Doe</span>
            <span className="text-xs text-muted-foreground">Surgery Dept.</span>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* Mobile menu button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed left-4 top-4 z-50 md:hidden"
        onClick={toggleMobileSidebar}
      >
        <Menu className="h-6 w-6" />
      </Button>

      {/* Mobile sidebar */}
      <div
        className={cn(
          "fixed inset-0 z-40 transform transition-transform duration-300 md:hidden",
          mobileOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div
          className="absolute inset-0 bg-black/50"
          onClick={toggleMobileSidebar}
        />
        <div className="absolute left-0 top-0 h-full w-[280px]">
          {sidebarContent}
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden h-full md:block">{sidebarContent}</div>
    </>
  );
};

export default Sidebar;
