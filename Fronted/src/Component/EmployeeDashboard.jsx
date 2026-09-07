import {
    ArrowRight,
    CalendarDays,
    FileText,
    DollarSign,
} from "lucide-react"
import { Link } from "react-router-dom"

const EmployeeDashboard = ({ data }) => {
    const { employee, currentMonthAttendance, pendingLeaves, latestPayslip } =
        data

    const cards = [
        {
            title: "Days Present",
            value: currentMonthAttendance,
            icon: CalendarDays,
        },
        {
            title: "Pending Leaves",
            value: pendingLeaves,
            icon: FileText,
        },
        {
            title: "Latest Payslip",
            value: `$${latestPayslip?.netSalary?.toLocaleString() ?? "0"}`,
            icon: DollarSign,
        },
    ]

    return (
        <main className="min-h-screen bg-white px-6 py-8 sm:px-8">
            <div className="max-w-[1100px]">
                {/* Header */}
                <div className="mb-7">
                    <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
                        Welcome, {employee?.firstName || "John"}!
                    </h1>

                    <p className="mt-1 text-sm text-slate-500">
                        {employee?.position || "Software Engineer"} -{" "}
                        {employee?.department || "Engineering"}
                    </p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    {cards.map((card) => {
                        const Icon = card.icon

                        return (
                            <div
                                key={card.title}
                                className="flex h-[94px] items-center justify-between rounded-md border border-slate-200 border-l-4 border-l-slate-400 bg-white px-5"
                            >
                                <div>
                                    <p className="text-sm font-medium text-slate-600">
                                        {card.title}
                                    </p>

                                    <p className="mt-1 text-2xl font-semibold text-slate-900">
                                        {card.value}
                                    </p>
                                </div>

                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
                                    <Icon size={30} strokeWidth={1.8} />
                                </div>
                            </div>
                        )
                    })}
                </div>

                {/* Actions */}
                <div className="mt-7 flex flex-wrap gap-3">
                    <Link to="/attendance">
                        <button
                            type="button"
                            className="flex h-10 items-center gap-2 rounded-md bg-indigo-600 px-5 text-sm font-medium text-white shadow-sm transition hover:bg-indigo-700"
                        >
                            Mark Attendance
                            <ArrowRight size={16} />
                        </button>
                    </Link>

                    <Link to="/leave">

                        <button
                            type="button"
                            className="h-10 rounded-md border border-slate-200 bg-white px-5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                        >
                            Apply for Leave
                        </button></Link>
                </div>
            </div>
        </main>
    )
}

export default EmployeeDashboard