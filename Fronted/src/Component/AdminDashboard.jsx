import {
    UsersRound,
    Building2,
    CalendarDays,
    FileText,
} from "lucide-react"

const AdminDashboard = ({ data }) => {
    const cards = [
        {
            title: "Total Employees",
            value: data.totalEmployees,
            icon: UsersRound,
        },
        {
            title: "Departments",
            value: data.totalDepartments,
            icon: Building2,
        },
        {
            title: "Today's Attendance",
            value: data.todayAttendance,
            icon: CalendarDays,
        },
        {
            title: "Pending Leaves",
            value: data.pendingLeaves,
            icon: FileText,
        },
    ]

    return (
        <main className="min-h-screen bg-white px-6 py-8 sm:px-8">
            <div className="max-w-[1100px]">
                {/* Header */}
                <div className="mb-7">
                    <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
                        Dashboard
                    </h1>

                    <p className="mt-1 text-sm text-slate-500">
                        Welcome back, Admin — here's your overview
                    </p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
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
            </div>
        </main>
    )
}

export default AdminDashboard