import { SearchIcon, BellIcon, Badge } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { ThemeToggle } from "../theme-toggle";

export default function PanelHeader() {
  return (
    <header className="sticky top-0 z-20 flex h-16 shrink-0 items-center border-b bg-background px-6 shadow-sm">
      <div className="relative flex-1">
        <div className="absolute left-2.5 top-2.5 h-5 w-5 text-muted-foreground">
          <SearchIcon className="h-5 w-5" />
        </div>
        <Input
          type="search"
          placeholder="Search..."
          className="w-full rounded-md bg-muted pl-8"
        />
      </div>
      <div className="ml-auto flex items-center gap-4">
        <Button variant="ghost" size="icon" className="rounded-full">
          <ThemeToggle />
        </Button>
      </div>
    </header>
  );
}
