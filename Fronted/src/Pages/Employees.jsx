import React, { useMemo, useState } from "react";
import {
  Plus,
  Search,
  UsersRound,
} from "lucide-react";

import { dummyEmployeeData, DEPARTMENTS } from "../assets/assets";

const Employees = () => {
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("All Departments");

  const employees = useMemo(() => {
    return dummyEmployeeData.filter((employee) => {
      const fullName = `${employee.firstName} ${employee.lastName}`;

      const matchesSearch =
        fullName.toLowerCase().includes(search.toLowerCase()) ||
        employee.email.toLowerCase().includes(search.toLowerCase()) ||
        employee.position.toLowerCase().includes(search.toLowerCase());

      const matchesDepartment =
        department === "All Departments" ||
        employee.department === department;

      return matchesSearch && matchesDepartment;
    });
  }, [search, department]);

  const getInitials = (employee) => {
    return `${employee.firstName?.charAt(0) || ""}${
      employee.lastName?.charAt(0) || ""
    }`;
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-[22px] font-semibold tracking-tight text-slate-900">
            Employees
          </h1>

          <p className="mt-1 text-xs text-slate-500">
            Manage your team members
          </p>
        </div>

        {/* Add Employee */}
        <button
          type="button"
          className="flex h-9 items-center justify-center gap-2 rounded-md bg-indigo-600 px-4 text-xs font-medium text-white shadow-md shadow-indigo-200 transition hover:bg-indigo-700"
        >
          <Plus size={15} />
          Add Employee
        </button>
      </div>

      {/* Search + Filter */}
      <div className="mt-7 flex flex-col gap-3 sm:flex-row">
        {/* Search */}
        <div className="relative flex-1">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            placeholder="Search employees..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-10 w-full rounded-md border border-slate-200 bg-white pl-10 pr-4 text-xs text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
          />
        </div>

        {/* Department */}
        <select
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          className="h-10 w-full rounded-md border border-slate-200 bg-white px-4 text-xs text-slate-700 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 sm:w-[145px]"
        >
          <option>All Departments</option>

          {DEPARTMENTS.map((dept) => (
            <option key={dept} value={dept}>
              {dept}
            </option>
          ))}
        </select>
      </div>

      {/* Employee Cards */}
      {employees.length > 0 ? (
        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {employees.map((employee) => (
            <div
              key={employee._id}
              className="group overflow-hidden rounded-lg border border-slate-200 bg-white transition hover:border-indigo-200 hover:shadow-md"
            >
              {/* Top section */}
              <div className="relative flex h-[176px] items-center justify-center bg-slate-50">

                {/* Department Badge */}
                <span className="absolute left-3 top-3 rounded-md border border-slate-200 bg-white px-2.5 py-1 text-[10px] font-medium text-slate-600 shadow-sm">
                  {employee.department}
                </span>

                {/* Profile */}
                {employee.image ? (
                  <img
                    src={employee.image}
                    alt={`${employee.firstName} ${employee.lastName}`}
                    className="h-[72px] w-[72px] rounded-full object-cover"
                  />
                ) : (
                  <div className="flex h-18 w-[72px] items-center justify-center rounded-full bg-indigo-50 text-xl font-medium text-indigo-400">
                    {getInitials(employee)}
                  </div>
                )}
              </div>

              {/* Bottom section */}
              <div className="px-5 py-5">
                <h2 className="text-sm font-medium text-slate-800">
                  {employee.firstName} {employee.lastName}
                </h2>

                <p className="mt-1 text-[10px] text-slate-500">
                  {employee.position}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* No Employees */
        <div className="mt-5 flex min-h-[250px] flex-col items-center justify-center rounded-lg border border-dashed border-slate-200 bg-white">
          <UsersRound
            size={32}
            className="text-slate-300"
            strokeWidth={1.5}
          />

          <p className="mt-3 text-sm font-medium text-slate-600">
            No employees found
          </p>

          <p className="mt-1 text-xs text-slate-400">
            Try changing your search or department filter.
          </p>
        </div>
      )}
    </div>
  );
};

export default Employees;