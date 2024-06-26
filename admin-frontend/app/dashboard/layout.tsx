"use client"

import Header from "@/components/Common/Header/Header";
import Sidebar from "@/components/Common/Sidebar/Sidebar"
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const [sidebarState, setSidebarState] = useState(false);

  const auth = useSelector((state: any) => state.AuthReducer);

  if (!auth) {
    return "Loading...";
  } 

  return (
    <React.Fragment>
      <main>
        <Sidebar state={sidebarState} sidebarToggle={() => setSidebarState(false)}  />
        <section id="panel-section">
          <div className="panel-container">
            <Header sidebarToggle={() => setSidebarState(true)} />
            <section className="panel-body">
              {children}
            </section>
          </div>
        </section>
      </main>
    </React.Fragment>
  )
}