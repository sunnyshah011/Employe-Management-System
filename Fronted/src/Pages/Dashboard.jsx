import React from "react";
import {
  UsersRound,
  Building2,
  CalendarDays,
  FileText,
} from "lucide-react";

import { dummyAdminDashboardData } from "../assets/assets";

const Dashboard = () => {
  const dashboardData = dummyAdminDashboardData;

  const cards = [
    {
      title: "Total Employees",
      value: dashboardData.totalEmployees,
      icon: UsersRound,
    },
    {
      title: "Departments",
      value: dashboardData.totalDepartments,
      icon: Building2,
    },
    {
      title: "Today's Attendance",
      value: dashboardData.todayAttendance,
      icon: CalendarDays,
    },
    {
      title: "Pending Leaves",
      value: dashboardData.pendingLeaves,
      icon: FileText,
    },
  ];

  return (
    <main className="min-h-screen bg-[#f8fafc]">
      {/* Header */}
      <div className="px-8 pt-8">
        <h1 className="text-[21px] font-semibold tracking-tight text-slate-900">
          Dashboard
        </h1>

        <p className="mt-1 text-xs text-slate-500">
          Welcome back, Admin — here's your overview
        </p>
      </div>

      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 gap-4 px-8 pt-7 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => {
          const Icon = card.icon;

          return (
            <div
              key={card.title}
              className="relative flex h-[94px] items-center justify-between overflow-hidden rounded-lg border border-slate-200 bg-white px-5 shadow-sm"
            >
              {/* Left Border */}
              <div className="absolute left-0 top-0 h-full w-[3px] bg-slate-400" />

              {/* Content */}
              <div>
                <p className="text-xs font-medium text-slate-600">
                  {card.title}
                </p>

                <p className="mt-1.5 text-[21px] font-semibold text-slate-900">
                  {card.value}
                </p>
              </div>

              {/* Icon */}
              <div className="text-slate-600">
                <Icon size={32} strokeWidth={1.8} />
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
};

export default Dashboard;