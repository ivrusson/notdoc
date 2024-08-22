import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  MountainIcon,
  HomeIcon,
  PackageIcon,
  ShoppingCartIcon,
  UsersIcon,
  LineChartIcon,
} from "lucide-react";
import { Button } from "../ui/button";
import Menu from "./components/menu";

export default function PanelSideBar() {
  return (
    <aside className="fixed inset-y-0 left-0 z-10 flex w-64 flex-col border-r bg-background">
      <div className="flex h-16 shrink-0 items-center px-6">
        <a href="#" className="flex items-center gap-2 font-semibold">
          <MountainIcon className="h-6 w-6" />
          <span className="text-lg">Acme Inc</span>
        </a>
      </div>
      <nav className="flex-1 space-y-1 px-4 py-6">
        <a
          href="#"
          className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          <HomeIcon className="h-5 w-5" />
          Dashboard
        </a>
        <a
          href="#"
          className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          <PackageIcon className="h-5 w-5" />
          Products
        </a>
        <a
          href="#"
          className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          <ShoppingCartIcon className="h-5 w-5" />
          Orders
        </a>
        <a
          href="#"
          className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          <UsersIcon className="h-5 w-5" />
          Customers
        </a>
        <a
          href="#"
          className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          <LineChartIcon className="h-5 w-5" />
          Analytics
        </a>
      </nav>
      <Menu />
      <div className="border-t px-4 py-6"></div>
    </aside>
  );
}
