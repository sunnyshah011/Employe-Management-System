import { useCallback, useEffect, useMemo, useState } from "react"
import { Plus, Search } from "lucide-react"
import { dummyEmployeeData, DEPARTMENTS } from "../assets/assets"
import EmployeeCard from "../Component/EmployeeCard"
import EmployeeForm from "../Component/EmployeeForm"
import LoadingAnimation from "../Component/LoadingAnimation"

const Employees = () => {
  const [employees, setEmployees] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [selectedDept, setSelectedDept] = useState("")
  const [editEmployee, setEditEmployee] = useState(null)
  const [showCreateModal, setShowCreateModal] = useState(false)

  // Fetch employees
  const fetchEmployees = useCallback(async () => {
    setLoading(true)

    const filteredData = dummyEmployeeData.filter((emp) =>
      selectedDept
        ? emp.department === selectedDept
        : emp
    )

    setEmployees(filteredData)

    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }, [selectedDept])

  useEffect(() => {
    fetchEmployees()
  }, [fetchEmployees])

  // Search employees
  const filteredEmployees = useMemo(() => {
    return employees.filter((employee) => {
      const fullName =
        `${employee.firstName || ""} ${employee.lastName || ""}`.toLowerCase()

      const matchesSearch =
        fullName.includes(search.toLowerCase()) ||
        (employee.position || "")
          .toLowerCase()
          .includes(search.toLowerCase())

      return matchesSearch
    })
  }, [employees, search])

  // ADD
  const handleAdd = (newEmployee) => {
    const id = Date.now().toString()

    const employee = {
      ...newEmployee,
      id,
      _id: id,
      isDeleted: false,
      image: null,
      employmentStatus: "ACTIVE",
      userId: {
        role: newEmployee.role || "EMPLOYEE",
      },
    }

    setEmployees((prev) => [...prev, employee])
    setShowCreateModal(false)
  }

  // EDIT
  const handleEdit = (updatedEmployee) => {
    if (!editEmployee) return

    setEmployees((prev) =>
      prev.map((employee) =>
        employee.id === editEmployee.id
          ? {
            ...employee,
            ...updatedEmployee,
            userId: {
              ...employee.userId,
              role:
                updatedEmployee.role ||
                employee.userId?.role,
            },
          }
          : employee
      )
    )

    setEditEmployee(null)
  }

  // DELETE
  const handleDelete = () => {
    if (!editEmployee) return

    setEmployees((prev) =>
      prev.filter(
        (employee) => employee.id !== editEmployee.id
      )
    )

    setEditEmployee(null)
  }

  return (
    <main className="min-h-screen bg-white px-6 py-8 sm:px-8">
      <div className="mx-auto max-w-[1100px]">

        {/* Header */}
        <div className="mb-7 flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
              Employees
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Manage your team members
            </p>
          </div>

          <button
            onClick={() => setShowCreateModal(true)}
            className="flex h-10 items-center gap-2 rounded-md bg-indigo-600 px-5 text-sm font-medium text-white shadow-sm transition hover:bg-indigo-700"
          >
            <Plus size={17} />
            Add Employee
          </button>
        </div>

        {/* Search + Filter */}
        <div className="mb-5 flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              placeholder="Search employees..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-10 w-full rounded-md border border-slate-200 pl-10 pr-4 text-sm outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
            />
          </div>

          <select
            value={selectedDept}
            onChange={(e) => setSelectedDept(e.target.value)}
            className="h-10 rounded-md border border-slate-200 bg-white px-4 text-sm text-slate-700 outline-none focus:border-indigo-400 sm:w-[180px]"
          >
            <option value="">All Departments</option>

            {DEPARTMENTS.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>
        </div>

        {/* Loading */}
        {loading ? (
          <LoadingAnimation />
        ) : filteredEmployees.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredEmployees.map((employee) => (
              <EmployeeCard
                key={employee.id}
                employee={employee}
                onView={() =>
                  setEditEmployee({
                    mode: "view",
                    employee,
                  })
                }
                onEdit={() =>
                  setEditEmployee({
                    mode: "edit",
                    employee,
                  })
                }
                onDelete={() =>
                  setEditEmployee({
                    mode: "delete",
                    employee,
                  })
                }
              />
            ))}
          </div>
        ) : (
          <div className="rounded-lg border border-dashed border-slate-200 py-16 text-center">
            <p className="text-sm text-slate-500">
              No employees found
            </p>
          </div>
        )}

      </div>

      {/* ADD MODAL */}
      {showCreateModal && (
        <EmployeeForm
          mode="add"
          employee={null}
          onClose={() => setShowCreateModal(false)}
          onAdd={handleAdd}
        />
      )}

      {/* EDIT / VIEW / DELETE MODAL */}
      {editEmployee && (
        <EmployeeForm
          mode={editEmployee.mode}
          employee={editEmployee.employee}
          onClose={() => setEditEmployee(null)}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}

    </main>
  )
}

export default Employees