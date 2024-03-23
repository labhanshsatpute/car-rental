import React from 'react'
import ProfileDropdown from './ProfileDropdown';
import { FiChevronRight, FiMenu } from "react-icons/fi";
import NotificationDropdown from './NotificationDropdown';

const Header = ({ sidebarToggle }: {
  sidebarToggle: () => void;
}) => {
  return (
    <React.Fragment>
      <header className="panel-header">
        <div className="lg:px-0 md:px-0 sm:px-2">
          <div>
            <ul className="breadcrumb">
                <li><a href="#">Admin</a></li>
                <li><FiChevronRight size={15} /></li>
                <li><a href="#">Dashboard</a></li>
            </ul>
            <h1 className="panel-title">Dashboard</h1>
          </div>
        </div>
        <div>
          <figure className="p-2.5 shadow-lg bg-white rounded-xl border">
            <div className="flex items-center justify-between">
              <div>
                <button onClick={sidebarToggle} className="h-[40px] w-[40px] lg:hidden md:hidden hover:bg-complement rounded-lg flex items-center justify-center transition duration-300 ease-in-out hover:ease-in-out border border-gray-200">
                  <FiMenu size={20} strokeWidth={2.5} />
                </button>
              </div>
              <div className="lg:hidden md:hidden sm:block">
                <h1 className="font-semibold text-base text-ascent">CarsHub</h1>
              </div>
              <div className="flex items-center justify-center gap-2">
                <NotificationDropdown />
                <ProfileDropdown />
              </div>
            </div>
          </figure>
        </div>
      </header>
    </React.Fragment>
  );
}

export default Header
