import React from "react";
import PanelSideBar from "./panel-sidebar";
import PanelHeader from "./panel-header";

interface Props {
  children: React.ReactNode;
}

export default function PanelLayout({
  children,
}: React.PropsWithChildren<Props>) {
  return (
    <div className="flex min-h-screen w-full">
      <PanelSideBar />
      <div className="flex flex-1 flex-col">
        <PanelHeader />
        <main className="flex-1 p-6 ml-64">{children}</main>
      </div>
    </div>
  );
}
