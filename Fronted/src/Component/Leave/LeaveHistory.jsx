import { useState } from "react";
import { Check, X, Loader2 } from "lucide-react";
import { format } from "date-fns";

const LeaveHistory = ({ leaves, isAdmin, onUpdate }) => {
  const [processing, setProcessing] = useState(null);

  const handleStatusUpdate = async (id, status) => {
    try {
      setProcessing(id);

      await onUpdate(id, status);
    } catch (error) {
      console.error("Failed to update leave status:", error);
    } finally {
      setProcessing(null);
    }
  };

  return (
    <div className="card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="table-modern">
          <thead>
            <tr>
              {isAdmin && <th>Employee</th>}

              <th>Type</th>
              <th>Dates</th>
              <th>Reason</th>
              <th>Status</th>

              {isAdmin && (
                <th className="text-center">
                  Actions
                </th>
              )}
            </tr>
          </thead>

          <tbody>
            {leaves.length === 0 ? (
              <tr>
                <td
                  colSpan={isAdmin ? 6 : 4}
                  className="text-center py-12 text-slate-400"
                >
                  No leave applications found
                </td>
              </tr>
            ) : (
              leaves.map((leave) => {
                const leaveId = leave._id || leave.id;

                return (
                  <tr key={leaveId}>
                    {/* Employee */}
                    {isAdmin && (
                      <td className="text-slate-900">
                        {leave.employee?.firstName}{" "}
                        {leave.employee?.lastName}
                      </td>
                    )}

                    {/* Type */}
                    <td>
                      <span className="badge bg-slate-100 text-slate-600">
                        {leave.type}
                      </span>
                    </td>

                    {/* Dates */}
                    <td className="text-xs text-slate-500">
                      {format(
                        new Date(leave.startDate),
                        "MMM dd"
                      )}{" "}
                      -{" "}
                      {format(
                        new Date(leave.endDate),
                        "MMM dd, yyyy"
                      )}
                    </td>

                    {/* Reason */}
                    <td
                      className="max-w-xs truncate text-slate-500"
                      title={leave.reason}
                    >
                      {leave.reason}
                    </td>

                    {/* Status */}
                    <td>
                      <span
                        className={`badge ${
                          leave.status === "APPROVED"
                            ? "badge-success"
                            : leave.status === "REJECTED"
                              ? "badge-danger"
                              : "badge-warning"
                        }`}
                      >
                        {leave.status}
                      </span>
                    </td>

                    {/* Actions */}
                    {isAdmin && (
                      <td>
                        {leave.status === "PENDING" && (
                          <div className="flex justify-center gap-2">
                            {/* Approve */}
                            <button
                              disabled={!!processing}
                              onClick={() =>
                                handleStatusUpdate(
                                  leaveId,
                                  "APPROVED"
                                )
                              }
                              className="p-1.5 rounded-md bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition-colors"
                            >
                              {processing === leaveId ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                              ) : (
                                <Check className="w-4 h-4" />
                              )}
                            </button>

                            {/* Reject */}
                            <button
                              disabled={!!processing}
                              onClick={() =>
                                handleStatusUpdate(
                                  leaveId,
                                  "REJECTED"
                                )
                              }
                              className="p-1.5 rounded-md bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
                            >
                              {processing === leaveId ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                              ) : (
                                <X className="w-4 h-4" />
                              )}
                            </button>
                          </div>
                        )}
                      </td>
                    )}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeaveHistory;
