import { useMemo, useState } from "react"
import { Plus, Search } from "lucide-react"
import { dummyEmployeeData, DEPARTMENTS } from "../assets/assets"
import EmployeeCard from "../Component/EmployeeCard"
import EmployeeForm from "../Component/EmployeeForm"

const Employees = () => {
  const [employees, setEmployees] = useState(
    Array.isArray(dummyEmployeeData)
      ? dummyEmployeeData.filter(Boolean)
      : []
  )

  const [search, setSearch] = useState("")
  const [department, setDepartment] = useState("All Departments")

  const [modal, setModal] = useState(null)
  const [selectedEmployee, setSelectedEmployee] = useState(null)

  const filteredEmployees = useMemo(() => {
    return employees.filter((employee) => {
      const fullName =
        `${employee.firstName || ""} ${employee.lastName || ""}`.toLowerCase()

      const matchesSearch =
        fullName.includes(search.toLowerCase()) ||
        (employee.position || "")
          .toLowerCase()
          .includes(search.toLowerCase())

      const matchesDepartment =
        department === "All Departments" ||
        employee.department === department

      return matchesSearch && matchesDepartment
    })
  }, [employees, search, department])

  const openModal = (mode, employee = null) => {
    setSelectedEmployee(employee)
    setModal(mode)
  }

  const closeModal = () => {
    setModal(null)
    setSelectedEmployee(null)
  }

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
    closeModal()
  }

  // EDIT
  const handleEdit = (updatedEmployee) => {
    if (!selectedEmployee) return

    setEmployees((prev) =>
      prev.map((employee) =>
        employee.id === selectedEmployee.id
          ? {
              ...employee,
              ...updatedEmployee,
              userId: {
                ...employee.userId,
                role: updatedEmployee.role || employee.userId?.role,
              },
            }
          : employee
      )
    )

    closeModal()
  }

  // DELETE
  const handleDelete = () => {
    if (!selectedEmployee) return

    setEmployees((prev) =>
      prev.filter((employee) => employee.id !== selectedEmployee.id)
    )

    closeModal()
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
            onClick={() => openModal("add")}
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
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            className="h-10 rounded-md border border-slate-200 bg-white px-4 text-sm text-slate-700 outline-none focus:border-indigo-400 sm:w-[180px]"
          >
            <option>All Departments</option>

            {DEPARTMENTS.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>
        </div>

        {/* Cards */}
        {filteredEmployees.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredEmployees.map((employee) => (
              <EmployeeCard
                key={employee.id}
                employee={employee}
                onView={() => openModal("view", employee)}
                onEdit={() => openModal("edit", employee)}
                onDelete={() => openModal("delete", employee)}
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

      {/* ONE FORM COMPONENT HANDLES ALL MODALS */}
      {modal && (
        <EmployeeForm
          mode={modal}
          employee={selectedEmployee}
          onClose={closeModal}
          onAdd={handleAdd}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </main>
  )
}

export default Employees