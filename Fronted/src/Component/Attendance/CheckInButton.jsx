import { useState } from 'react'
import { LogInIcon, LogOutIcon, Loader2Icon } from 'lucide-react'

const CheckInButton = ({ todayRecord, onAction }) => {
    const [loading, setLoading] = useState(false)

    const handleAttendance = async () => {
        setLoading(true)

        setTimeout(() => {
            setLoading(false)
            onAction()
        }, 1000)
    }

    if (todayRecord?.checkOut) {
        return (
            <div className="flex flex-col items-center justify-center p-8 bg-slate-50 rounded-2xl border border-slate-200">
                <h3 className="text-lg font-bold text-slate-900">
                    Work Day Completed
                </h3>
                <p className="text-slate-500 text-sm mt-1">
                    Great job! See you tomorrow
                </p>
            </div>
        )
    }

    const isCheckedIn = !!todayRecord?.isCheckedIn

    return (
        <div className="absolute bottom-4 right-4 flex flex-col z-10">
            <button
                onClick={handleAttendance}
                disabled={loading}
                className={`flex items-center gap-3 px-5 py-3 rounded-xl text-white transition-all ${isCheckedIn
                        ? 'bg-red-500 hover:bg-red-600'
                        : 'bg-blue-500 hover:bg-blue-600'
                    } ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
                {loading ? (
                    <Loader2Icon className="size-7 animate-spin" />
                ) : isCheckedIn ? (
                    <LogOutIcon className="size-7" />
                ) : (
                    <LogInIcon className="size-7" />
                )}

                <div className="text-left">
                    <h2 className="font-semibold">
                        {loading
                            ? 'Processing...'
                            : isCheckedIn
                                ? 'Clock Out'
                                : 'Clock In'}
                    </h2>

                    <p className="text-xs opacity-90">
                        {isCheckedIn
                            ? 'Click to end your shift'
                            : 'Start your work day'}
                    </p>
                </div>
            </button>
        </div>
    )
}

export default CheckInButton