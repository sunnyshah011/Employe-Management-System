import {
    X,
    FileText,
    CalendarDays,
    Send
} from "lucide-react";
import { useState } from "react";

const ApplyLeaveModal = ({ open, onClose, onSuccess }) => {
    
    const [loading, setLoading] = useState(false);

    const today = new Date();

    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const minDate = tomorrow.toISOString().split("T")[0];

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Submit logic here
    };

    if (!open) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
            onClick={onClose}
        >
            <div
                className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg animate-fade-in"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-6 pb-0">
                    <div>
                        <h2 className="text-xl font-semibold text-slate-900">
                            Apply for Leave
                        </h2>

                        <p className="text-sm text-slate-500 mt-1">
                            Submit your leave request
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        className="p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6">
                    {/* Form */}
                    <div className="p-6">

                        {/* Leave Type */}
                        <div className="mb-5">
                            <label className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-2">
                                <FileText className="w-4 h-4 text-slate-400" />
                                Leave Type
                            </label>

                            <select
                                className="w-full h-11 px-3 rounded-lg border border-slate-200 bg-white text-sm text-slate-700 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition"
                            >
                                <option>Sick Leave</option>
                                <option>Casual Leave</option>
                                <option>Annual Leave</option>
                                <option>Emergency Leave</option>
                                <option>Maternity Leave</option>
                                <option>Paternity Leave</option>
                            </select>
                        </div>

                        {/* Duration */}
                        <div className="mb-5">
                            <label className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-2">
                                <CalendarDays className="w-4 h-4 text-slate-400" />
                                Duration
                            </label>

                            <div className="grid grid-cols-2 gap-3">

                                {/* From */}
                                <div>
                                    <label className="block text-xs text-slate-500 mb-1">
                                        From
                                    </label>

                                    <input
                                        type="date"
                                        className="w-full h-11 px-3 rounded-lg border border-slate-200 text-sm text-slate-700 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition"
                                    />
                                </div>

                                {/* To */}
                                <div>
                                    <label className="block text-xs text-slate-500 mb-1">
                                        To
                                    </label>

                                    <input
                                        type="date"
                                        className="w-full h-11 px-3 rounded-lg border border-slate-200 text-sm text-slate-700 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition"
                                    />
                                </div>

                            </div>
                        </div>

                        {/* Reason */}
                        <div className="mb-7">
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                Reason
                            </label>

                            <textarea
                                rows={4}
                                placeholder="Briefly describe why you need this leave..."
                                className="w-full resize-none px-3 py-3 rounded-lg border border-slate-200 text-sm text-slate-700 placeholder:text-slate-400 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition"
                            />
                        </div>

                        {/* Buttons */}
                        <div className="flex gap-3">

                            <button
                                type="button"
                                className="flex-1 h-11 rounded-lg border border-slate-200 bg-white text-sm font-medium text-slate-600 hover:bg-slate-50 transition"
                            >
                                Cancel
                            </button>

                            <button
                                type="button"
                                className="flex-1 h-11 rounded-lg bg-gradient-to-r from-indigo-600 to-violet-500 text-white text-sm font-medium flex items-center justify-center gap-2 hover:from-indigo-700 hover:to-violet-600 transition"
                            >
                                <Send className="w-4 h-4" />
                                Submit
                            </button>

                        </div>

                    </div>
                </div>
            </div>
        </div>
    );

};

export default ApplyLeaveModal;
