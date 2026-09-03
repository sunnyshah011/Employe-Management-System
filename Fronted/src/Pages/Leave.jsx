import React from "react";
import { Check, X } from "lucide-react";

const Leave = () => {
  const leaveData = [
    {
      employee: "David Michael",
      type: "ANNUAL",
      dates: "Mar 27 — Mar 29, 2026",
      reason: "Out for a trip",
      status: "APPROVED",
    },
    {
      employee: "Alex Matthew",
      type: "CASUAL",
      dates: "Mar 23 — Mar 24, 2026",
      reason: "Going For Vacations",
      status: "REJECTED",
    },
    {
      employee: "John Doe",
      type: "CASUAL",
      dates: "Mar 27 — Mar 28, 2026",
      reason: "Going to visit a temple",
      status: "PENDING",
    },
    {
      employee: "David Michael",
      type: "SICK",
      dates: "Mar 15 — Mar 16, 2026",
      reason: "I had a fracture on leg",
      status: "APPROVED",
    },
  ];

  return (
    <div className="min-h-screen bg-white px-8 py-8">
      <div className="w-full">
        {/* Header */}
        <div className="mb-7">
          <h1 className="text-[22px] font-semibold tracking-tight text-[#172033]">
            Leave Management
          </h1>

          <p className="mt-1 text-[12px] text-[#62718f]">
            Manage leave applications
          </p>
        </div>

        {/* Table */}
        <div className="overflow-hidden rounded-lg border border-[#e7ebf2] bg-white">
          <table className="w-full border-collapse">
            <thead>
              <tr className="h-[43px] bg-[#fbfcfe]">
                <th className="px-5 text-left text-[10px] font-bold tracking-wide text-[#65728d]">
                  EMPLOYEE
                </th>

                <th className="px-5 text-left text-[10px] font-bold tracking-wide text-[#65728d]">
                  TYPE
                </th>

                <th className="px-5 text-left text-[10px] font-bold tracking-wide text-[#65728d]">
                  DATES
                </th>

                <th className="px-5 text-left text-[10px] font-bold tracking-wide text-[#65728d]">
                  REASON
                </th>

                <th className="px-5 text-left text-[10px] font-bold tracking-wide text-[#65728d]">
                  STATUS
                </th>

                <th className="px-5 text-left text-[10px] font-bold tracking-wide text-[#65728d]">
                  ACTIONS
                </th>
              </tr>
            </thead>

            <tbody>
              {leaveData.map((leave, index) => (
                <tr
                  key={index}
                  className="h-[52px] border-t border-[#edf0f5]"
                >
                  {/* Employee */}
                  <td className="px-5 text-[12px] font-medium text-[#1d273c]">
                    {leave.employee}
                  </td>

                  {/* Type */}
                  <td className="px-5">
                    <span className="inline-flex rounded-md bg-[#f0f3f7] px-3 py-[5px] text-[9px] font-semibold text-[#56647e]">
                      {leave.type}
                    </span>
                  </td>

                  {/* Dates */}
                  <td className="px-5 text-[11px] text-[#667592]">
                    {leave.dates}
                  </td>

                  {/* Reason */}
                  <td className="px-5 text-[11px] text-[#566681]">
                    {leave.reason}
                  </td>

                  {/* Status */}
                  <td className="px-5">
                    <StatusBadge status={leave.status} />
                  </td>

                  {/* Actions */}
                  <td className="px-5">
                    {leave.status === "PENDING" && (
                      <div className="flex items-center gap-2">
                        <button
                          className="flex h-[25px] w-[25px] items-center justify-center rounded-md bg-[#eafaf4] text-[#16a675] hover:bg-[#d8f6ea]"
                          title="Approve"
                        >
                          <Check size={14} />
                        </button>

                        <button
                          className="flex h-[25px] w-[25px] items-center justify-center rounded-md bg-[#fff0f2] text-[#f0445c] hover:bg-[#ffe1e5]"
                          title="Reject"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const StatusBadge = ({ status }) => {
  const styles = {
    APPROVED: "bg-[#e9faf4] text-[#11966b]",
    REJECTED: "bg-[#fff0f2] text-[#ed3852]",
    PENDING: "bg-[#fff7e8] text-[#dc7700]",
  };

  return (
    <span
      className={`inline-flex rounded-md px-3 py-[5px] text-[9px] font-semibold ${styles[status]}`}
    >
      {status}
    </span>
  );
};

export default Leave;