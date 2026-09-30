import React from "react";
import { Link, useNavigate } from "react-router-dom";
import AdminSidebar from "@/components/admin/AdminSidebar";
import UserHeaderDropdown from "@/components/common/UserHeaderDropdown";
import { useAuth } from "@/contexts";

export default function AdminLayout({ activeTab = "overview", children, title = "Tổng quan Hệ thống", description = "Quản trị hệ thống KBase" }) {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-slate-950 text-white">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-3 border-indigo-500 border-t-transparent rounded-full animate-spin" />
          <span className="text-sm text-slate-400">Đang tải dữ liệu quản trị...</span>
        </div>
      </div>
    );
  }

  // Access check: only ROLE_ADMIN
  if (!user || user.role !== "ROLE_ADMIN") {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-slate-50 p-4">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg border border-slate-200 p-8 text-center flex flex-col items-center">
          <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center text-red-600 mb-4">
            <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-slate-800 mb-2">Truy cập bị từ chối</h2>
          <p className="text-sm text-slate-500 mb-6">
            Khu vực này chỉ dành riêng cho tài khoản có quyền Quản trị viên (Admin). Bạn không có quyền truy cập vào giao diện này.
          </p>
          <button
            onClick={() => navigate("/projects")}
            className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-semibold transition-colors"
          >
            Quay lại Dự án của tôi
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex w-full min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* Admin Sidebar with 3 tabs */}
      <AdminSidebar activeTab={activeTab} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto">
        {/* Admin Header */}
        <header className="h-[64px] shrink-0 bg-white border-b border-slate-200 px-6 sm:px-8 flex items-center justify-between sticky top-0 z-20">
          <div>
            <h1 className="text-lg font-bold text-slate-900 flex items-center gap-2.5">
              <span>{title}</span>
              {/* <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
                Admin Panel
              </span> */}
            </h1>
            <p className="text-xs text-slate-500 hidden sm:block">
              {description}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <UserHeaderDropdown />
          </div>
        </header>

        {/* Content Body */}
        <main className="flex-1 p-6 sm:p-8 bg-slate-50">
          <div className="max-w-[1600px] mx-auto w-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
