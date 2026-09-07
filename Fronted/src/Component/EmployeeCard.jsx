import { Eye, Pencil, Trash2 } from "lucide-react"

const EmployeeCard = ({ employee, onView, onEdit, onDelete }) => {
  if (!employee) return null

  const firstName = employee.firstName || ""
  const lastName = employee.lastName || ""

  const initials = `${firstName[0] || ""}${lastName[0] || ""}`

  return (
    <div className="overflow-hidden rounded-lg border border-slate-200 bg-white">

      {/* Avatar */}
      <div className="relative flex h-[175px] items-center justify-center bg-slate-50">

        <span className="absolute left-3 top-3 rounded-md border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-600 shadow-sm">
          {employee.department || "No Department"}
        </span>

        <div className="flex h-[72px] w-[72px] items-center justify-center rounded-full bg-indigo-50 text-2xl font-medium text-indigo-400">
          {initials || "?"}
        </div>
      </div>

      {/* Details */}
      <div className="p-5">
        <h3 className="text-sm font-medium text-slate-900">
          {firstName} {lastName}
        </h3>

        <p className="mt-1 text-xs text-slate-500">
          {employee.position || "No Position"}
        </p>

        {/* Actions */}
        <div className="mt-4 flex gap-2 border-t border-slate-100 pt-4">

          <button
            onClick={onView}
            className="flex flex-1 items-center justify-center gap-1.5 rounded-md border border-slate-200 py-2 text-xs font-medium text-slate-600 hover:bg-slate-50"
          >
            <Eye size={14} />
            View
          </button>

          <button
            onClick={onEdit}
            className="flex flex-1 items-center justify-center gap-1.5 rounded-md border border-indigo-100 py-2 text-xs font-medium text-indigo-600 hover:bg-indigo-50"
          >
            <Pencil size={14} />
            Edit
          </button>

          <button
            onClick={onDelete}
            className="flex flex-1 items-center justify-center gap-1.5 rounded-md border border-red-100 py-2 text-xs font-medium text-red-500 hover:bg-red-50"
          >
            <Trash2 size={14} />
            Delete
          </button>

        </div>
      </div>
    </div>
  )
}

export default EmployeeCard