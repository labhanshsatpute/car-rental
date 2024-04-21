"use client"

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react'
import { FiHome, FiSettings, FiChevronLeft, FiUsers } from "react-icons/fi";

const SidebarTab = ({ label, link, icon, isActive }: {
  label: String;
  link: any;
  icon: JSX.Element;
  isActive: Boolean;
}) => {
  return (
    <React.Fragment>
      <li className={`sidebar-tab ${isActive ? 'active' : null }`} >
        <Link href={link}>
          <span>{icon}</span>
          <span>{label}</span>
        </Link>
      </li>
    </React.Fragment>
  );
}

const Sidebar = ({ state, sidebarToggle }: {
  state: Boolean;
  sidebarToggle: () => void;
}) => {

  const pathname = usePathname();
  
  return (
    <React.Fragment>
      <aside id="sidebar" className={state ? 'active' : ''}>
        <div className="sidebar">
          <div className="space-y-7">
            <div className="flex items-center justify-between relative">
              <div className="md:text-center sm:text-left space-y-2 pt-12 lg:px-10 sm:px-8 w-full">
                <div className="flex items-center lg:justify-center md:justify-start">
                  <img src="/assets/logo.png" alt="logo" className='h-[40px] w-auto' />
                </div>
                <p className="text-xs text-slate-500">Administrator Panel</p>
              </div>
            </div>
            <div className="absolute top-3 right-0 lg:hidden md:hidden sm:block">
              <button onClick={sidebarToggle} className="h-[40px] w-[40px] bg-ascent rounded-l-lg border-r-0 flex items-center justify-center transition duration-300 ease-in-out hover:ease-in-out">
                  <FiChevronLeft size={20} strokeWidth={2.5} className='stroke-white' />
              </button>
            </div>
            <hr className="border-complement" />
            <ul className="flex flex-col pb-10">

              <SidebarTab label={"Dashboard"} link={"/dashboard"} icon={<FiHome />} isActive={pathname == "/dashboard"} />
              <SidebarTab label={"Users"} link={"/dashboard/user"} icon={<FiUsers />} isActive={pathname.includes("/dashboard/user")} />
              <SidebarTab label={"Brands"} link={"/dashboard/brand"} icon={<FiUsers />} isActive={pathname.includes("/dashboard/brand")} />
              <SidebarTab label={"Vehicles"} link={"/dashboard/vehicle"} icon={<FiUsers />} isActive={pathname.includes("/dashboard/vehicle")} />
              <SidebarTab label={"Setting"} link={"/dashboard/setting"} icon={<FiSettings />} isActive={pathname.includes("/dashboard/setting")} />

            </ul>
          </div>
        </div>
        <div className="sidebar-overlay" onClick={sidebarToggle} />
      </aside>
    </React.Fragment>
  );
}

export default Sidebar
