import { useState } from "react"
import { X, Trash2 } from "lucide-react"
import { DEPARTMENTS } from "../assets/assets"

const EmployeeForm = ({
  mode,
  employee,
  onClose,
  onAdd,
  onEdit,
  onDelete,
}) => {
  if (mode === "delete") {
    return (
      <DeleteModal
        employee={employee}
        onClose={onClose}
        onDelete={onDelete}
      />
    )
  }

  if (mode === "view") {
    return (
      <ViewModal
        employee={employee}
        onClose={onClose}
      />
    )
  }

  return (
    <AddEditModal
      mode={mode}
      employee={employee}
      onClose={onClose}
      onAdd={onAdd}
      onEdit={onEdit}
    />
  )
}

/* =====================================================
   ADD / EDIT MODAL
===================================================== */

const AddEditModal = ({
  mode,
  employee,
  onClose,
  onAdd,
  onEdit,
}) => {
  const isEdit = mode === "edit"

  const [form, setForm] = useState({
    firstName: employee?.firstName || "",
    lastName: employee?.lastName || "",
    phone: employee?.phone || "",
    joinDate: employee?.joinDate
      ? employee.joinDate.split("T")[0]
      : "",
    bio: employee?.bio || "",

    department: employee?.department || "",
    position: employee?.position || "",
    basicSalary: employee?.basicSalary || 0,
    allowances: employee?.allowances || 0,
    deductions: employee?.deductions || 0,

    email: employee?.email || "",
    password: "",
    role: employee?.userId?.role || "EMPLOYEE",
  })

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const formattedData = {
      ...form,
      basicSalary: Number(form.basicSalary),
      allowances: Number(form.allowances),
      deductions: Number(form.deductions),
    }

    if (isEdit) {
      onEdit(formattedData)
    } else {
      onAdd(formattedData)
    }
  }

  return (
    <ModalWrapper>

      {/* Header */}
      <div className="mb-4 flex items-start justify-between">
        <div>
          <h2 className="text-sm font-semibold text-slate-900">
            {isEdit ? "Edit Employee" : "Add New Employee"}
          </h2>

          <p className="mt-1 text-[10px] text-slate-500">
            {isEdit
              ? "Update employee details"
              : "Create a user account and employee profile"}
          </p>
        </div>

        <button
          onClick={onClose}
          className="text-slate-400 hover:text-slate-600"
        >
          <X size={16} />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Personal Information */}
        <section className="rounded-md border border-slate-200 p-4">
          <h3 className="text-[11px] font-medium text-slate-800">
            Personal Information
          </h3>

          <div className="my-4 h-px bg-slate-100" />

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

            <Input
              label="First Name"
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
              required
            />

            <Input
              label="Last Name"
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
              required
            />

            <Input
              label="Phone Number"
              name="phone"
              value={form.phone}
              onChange={handleChange}
            />

            <Input
              label="Join Date"
              name="joinDate"
              type="date"
              value={form.joinDate}
              onChange={handleChange}
            />

            <div className="sm:col-span-2">
              <label className="mb-2 block text-[10px] font-medium text-slate-600">
                Bio (Optional)
              </label>

              <textarea
                name="bio"
                value={form.bio}
                onChange={handleChange}
                placeholder="Brief description..."
                rows={3}
                className="w-full resize-none rounded-md border border-slate-200 px-3 py-2 text-[10px] outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
              />
            </div>

          </div>
        </section>

        {/* Employment Details */}
        <section className="rounded-md border border-slate-200 p-4">
          <h3 className="text-[11px] font-medium text-slate-800">
            Employment Details
          </h3>

          <div className="my-4 h-px bg-slate-100" />

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

            <Select
              label="Department"
              name="department"
              value={form.department}
              onChange={handleChange}
              options={DEPARTMENTS}
              placeholder="Select Department"
              required
            />

            <Input
              label="Position"
              name="position"
              value={form.position}
              onChange={handleChange}
              required
            />

            <Input
              label="Basic Salary"
              name="basicSalary"
              type="number"
              value={form.basicSalary}
              onChange={handleChange}
            />

            <Input
              label="Allowances"
              name="allowances"
              type="number"
              value={form.allowances}
              onChange={handleChange}
            />

            <Input
              label="Deductions"
              name="deductions"
              type="number"
              value={form.deductions}
              onChange={handleChange}
            />

            {isEdit && (
              <Input
                label="Status"
                name="employmentStatus"
                value={employee?.employmentStatus || "ACTIVE"}
                disabled
              />
            )}

          </div>
        </section>

        {/* Account Setup */}
        <section className="rounded-md border border-slate-200 p-4">
          <h3 className="text-[11px] font-medium text-slate-800">
            Account Setup
          </h3>

          <div className="my-4 h-px bg-slate-100" />

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

            <div className="sm:col-span-2">
              <Input
                label="Work Email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            <Input
              label={
                isEdit
                  ? "Change Password (Optional)"
                  : "Temporary Password"
              }
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              placeholder={
                isEdit ? "Leave blank to keep current" : ""
              }
            />

            <Select
              label="System Role"
              name="role"
              value={form.role}
              onChange={handleChange}
              options={["EMPLOYEE", "ADMIN"]}
            />

          </div>
        </section>

        {/* Footer */}
        <div className="flex justify-end gap-2 pt-2">

          <button
            type="button"
            onClick={onClose}
            className="rounded-md border border-slate-200 px-4 py-2 text-[10px] font-medium text-slate-600 hover:bg-slate-50"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-4 py-2 text-[10px] font-medium text-white shadow-sm hover:bg-indigo-700"
          >
            {isEdit ? "Update Employee" : "Create Employee"}
          </button>

        </div>
      </form>
    </ModalWrapper>
  )
}

/* =====================================================
   VIEW MODAL
===================================================== */

const ViewModal = ({ employee, onClose }) => {
  if (!employee) return null

  return (
    <ModalWrapper>

      {/* Header */}
      <div className="mb-5 flex items-start justify-between">
        <div>
          <h2 className="text-sm font-semibold text-slate-900">
            Employee Details
          </h2>

          <p className="mt-1 text-[10px] text-slate-500">
            View employee information
          </p>
        </div>

        <button
          onClick={onClose}
          className="text-slate-400 hover:text-slate-600"
        >
          <X size={16} />
        </button>
      </div>

      {/* Profile */}
      <div className="mb-5 flex items-center gap-4 rounded-lg bg-slate-50 p-4">

        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-indigo-50 text-lg font-medium text-indigo-400">
          {employee.firstName?.[0]}
          {employee.lastName?.[0]}
        </div>

        <div>
          <h3 className="text-sm font-semibold text-slate-900">
            {employee.firstName} {employee.lastName}
          </h3>

          <p className="mt-1 text-xs text-slate-500">
            {employee.position || "No Position"}
          </p>

          <span className="mt-2 inline-block rounded-full bg-indigo-50 px-2 py-1 text-[10px] text-indigo-600">
            {employee.department || "No Department"}
          </span>
        </div>

      </div>

      {/* Details */}
      <div className="grid grid-cols-2 gap-4 text-xs">

        <Detail label="Email" value={employee.email} />

        <Detail label="Phone Number" value={employee.phone} />

        <Detail
          label="Join Date"
          value={employee.joinDate?.split("T")[0]}
        />

        <Detail
          label="Basic Salary"
          value={`$${employee.basicSalary ?? 0}`}
        />

        <Detail
          label="Allowances"
          value={`$${employee.allowances ?? 0}`}
        />

        <Detail
          label="Deductions"
          value={`$${employee.deductions ?? 0}`}
        />

        <Detail
          label="Status"
          value={employee.employmentStatus}
        />

        <Detail
          label="System Role"
          value={employee.userId?.role}
        />

      </div>

      {/* Bio */}
      <div className="mt-5">
        <p className="mb-2 text-xs font-medium text-slate-600">
          Bio
        </p>

        <p className="rounded-md bg-slate-50 p-3 text-xs text-slate-500">
          {employee.bio || "No bio available"}
        </p>
      </div>

      {/* Footer */}
      <div className="mt-5 flex justify-end">
        <button
          onClick={onClose}
          className="rounded-md border border-slate-200 px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-50"
        >
          Close
        </button>
      </div>

    </ModalWrapper>
  )
}

/* =====================================================
   DELETE MODAL
===================================================== */

const DeleteModal = ({ employee, onClose, onDelete }) => {
  if (!employee) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">

      <div className="w-full max-w-[380px] rounded-xl bg-white p-5 shadow-2xl">

        <div className="flex items-start justify-between">

          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-50 text-red-500">
            <Trash2 size={19} />
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600"
          >
            <X size={17} />
          </button>

        </div>

        <h2 className="mt-4 text-base font-semibold text-slate-900">
          Delete Employee?
        </h2>

        <p className="mt-2 text-sm leading-6 text-slate-500">
          Are you sure you want to delete{" "}
          <span className="font-medium text-slate-700">
            {employee.firstName} {employee.lastName}
          </span>
          ? This action cannot be undone.
        </p>

        <div className="mt-6 flex justify-end gap-3">

          <button
            onClick={onClose}
            className="rounded-md border border-slate-200 px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-50"
          >
            Cancel
          </button>

          <button
            onClick={onDelete}
            className="rounded-md bg-red-500 px-4 py-2 text-xs font-medium text-white hover:bg-red-600"
          >
            Delete Employee
          </button>

        </div>
      </div>
    </div>
  )
}

/* =====================================================
   SHARED UI
===================================================== */

const ModalWrapper = ({ children }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-3 sm:p-6">
    <div className="max-h-[95vh] w-full max-w-[480px] overflow-y-auto rounded-xl bg-white p-5 shadow-2xl">
      {children}
    </div>
  </div>
)

const Input = ({ label, ...props }) => (
  <div>
    <label className="mb-2 block text-[10px] font-medium text-slate-600">
      {label}
    </label>

    <input
      {...props}
      className="h-9 w-full rounded-md border border-slate-200 px-3 text-[10px] text-slate-700 outline-none placeholder:text-slate-400 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 disabled:bg-slate-50 disabled:text-slate-500"
    />
  </div>
)

const Select = ({ label, options, placeholder, ...props }) => (
  <div>
    <label className="mb-2 block text-[10px] font-medium text-slate-600">
      {label}
    </label>

    <select
      {...props}
      className="h-9 w-full rounded-md border border-slate-200 bg-white px-3 text-[10px] text-slate-700 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
    >
      {placeholder && <option value="">{placeholder}</option>}

      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  </div>
)

const Detail = ({ label, value }) => (
  <div>
    <p className="mb-1 text-[10px] text-slate-400">
      {label}
    </p>

    <p className="break-words text-xs font-medium text-slate-700">
      {value || "—"}
    </p>
  </div>
)

export default EmployeeForm