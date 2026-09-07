import React from "react";
import {
  UserRound,
  LayoutDashboard,
  CalendarCheck,
  FileText,
  DollarSign,
  Settings,
  LogOut,
  ChevronRight,
} from "lucide-react";

import { NavLink } from "react-router-dom";

import { dummyProfileData } from "../assets/assets";

const Sidebar = () => {
  const profile = dummyProfileData;

  const roll = "ADMIN" || "EMPLOYEE"
  const menuItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: LayoutDashboard,
    },
    roll === "ADMIN" ?
      {
      name: "Employee",
      path: "/employees",
      icon: UserRound ,
    }:
    {
      name: "Attendance",
      path: "/attendance",
      icon: CalendarCheck,
    },
    {
      name: "Leave",
      path: "/leave",
      icon: FileText,
    },
    {
      name: "Payslips",
      path: "/payslips",
      icon: DollarSign,
    },
    {
      name: "Settings",
      path: "/settings",
      icon: Settings,
    },
  ];

  const handlelogout = () =>{
    window.location.href = "/login"
  }

  return (
    <aside className="fixed left-0 top-0 z-40 flex h-screen w-62.5 flex-col bg-[#0b1328] text-white">

      {/* Logo */}
      <div className="flex h-26.25 items-center gap-4 border-b border-white/5 px-7">
        <div className="flex h-9 w-9 items-center justify-center">
          <UserRound size={25} strokeWidth={2} />
        </div>

        <div>
          <h1 className="text-sm font-semibold tracking-wide">
            Employee MS
          </h1>

          <p className="mt-0.5 text-[10px] text-slate-500">
            Management System
          </p>
        </div>
      </div>

      {/* Profile */}
      <div className="px-3 py-4">
        <div className="flex items-center gap-3 rounded-lg border border-white/5 bg-[#151e35] px-4 py-3">

          {/* Profile Image / Initial */}
          {profile.image ? (
            <img
              src={profile.image}
              alt={`${profile.firstName} ${profile.lastName}`}
              className="h-9 w-9 rounded-lg object-cover"
            />
          ) : (
            <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-700 bg-[#1b263f] text-xs text-slate-300">
              {profile.firstName?.charAt(0)}
            </div>
          )}

          <div>
            <p className="text-xs font-medium text-slate-200">
              {profile.firstName} {profile.lastName}
            </p>

            <p className="mt-0.5 text-[10px] text-slate-500">
              Admin
            </p>
          </div>

        </div>
      </div>

      {/* Navigation */}
      <div className="px-3">

        <p className="mb-3 px-4 text-[9px] font-semibold uppercase tracking-[0.18em] text-slate-500">
          Navigation
        </p>

        <nav className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `group relative flex h-9 items-center gap-3 rounded-md px-4 text-xs transition ${isActive
                    ? "bg-[#202957] text-indigo-300"
                    : "text-slate-300 hover:bg-[#151e35] hover:text-white"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {isActive && (
                      <span className="absolute left-0 top-0 h-full w-0.75 rounded-r bg-indigo-500" />
                    )}

                    <Icon size={15} strokeWidth={1.7} />

                    <span>{item.name}</span>

                    {isActive && (
                      <ChevronRight
                        size={13}
                        className="ml-auto text-indigo-400"
                      />
                    )}
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>

      </div>

      {/* Logout */}
      <div className="mt-auto border-t border-white/5 p-3">
        <button onClick={handlelogout} className="flex h-10 w-full items-center gap-3 rounded-md px-4 text-xs text-slate-400 transition hover:bg-[#151e35] hover:text-white">
          <LogOut size={15} strokeWidth={1.7} />
          <span>Log out</span>
        </button>
      </div>

    </aside>
  );
};

export default Sidebar;