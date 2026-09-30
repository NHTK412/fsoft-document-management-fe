import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AdminLayout from "@/layouts/AdminLayout";
import { adminService } from "@/services";
import { formatRole } from "@/utils/formatRole";

export default function AdminOverview() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchStats = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await adminService.getStats();
      if (res?.data) {
        setStats(res.data);
      }
    } catch (err) {
      console.error("Lỗi khi tải thống kê admin:", err);
      setError(err.message || "Không thể tải thống kê hệ thống");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const formatDate = (dateStr) => {
    if (!dateStr) return "N/A";
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString("vi-VN", {
        hour: "2-digit",
        minute: "2-digit",
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <AdminLayout
      activeTab="overview"
      title="Tổng quan Hệ thống"
      description="Theo dõi hoạt động, dự án và người dùng trên toàn hệ thống KBase"
    >
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm flex items-center justify-between">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-red-500 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <span>{error}</span>
          </div>
          <button
            onClick={fetchStats}
            className="px-3 py-1 bg-red-100 hover:bg-red-200 text-red-800 rounded-lg text-xs font-semibold"
          >
            Thử lại
          </button>
        </div>
      )}

      {/* Main KPI Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Card 1: Dự Án Đang Hoạt Động */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs hover:shadow-md transition-shadow relative overflow-hidden flex flex-col justify-between">
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50/60 rounded-full blur-2xl pointer-events-none -mr-10 -mt-10" />
          
          <div className="flex items-start justify-between">
            <div className="flex flex-col">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Chỉ số hệ thống
              </span>
              <h3 className="text-base font-bold text-slate-800 mt-1">
                Dự Án Đang Hoạt Động
              </h3>
            </div>
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-indigo-500 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/20">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z" />
              </svg>
            </div>
          </div>

          <div className="my-6">
            {loading ? (
              <div className="h-10 w-24 bg-slate-200 animate-pulse rounded-lg" />
            ) : (
              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-extrabold text-slate-900 tracking-tight">
                  {stats?.activeProjectsCount ?? 0}
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Đang hoạt động
                </span>
              </div>
            )}
            <p className="text-xs text-slate-500 mt-2">
              Các không gian làm việc và tri thức tài liệu đang được người dùng khởi tạo và sử dụng.
            </p>
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            <Link
              to="/admin/projects"
              className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 inline-flex items-center gap-1.5 group"
            >
              <span>Đi đến Quản lý dự án</span>
              <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Card 2: Tổng Người Dùng */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs hover:shadow-md transition-shadow relative overflow-hidden flex flex-col justify-between">
          <div className="absolute top-0 right-0 w-32 h-32 bg-purple-50/60 rounded-full blur-2xl pointer-events-none -mr-10 -mt-10" />
          
          <div className="flex items-start justify-between">
            <div className="flex flex-col">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Quy mô nền tảng
              </span>
              <h3 className="text-base font-bold text-slate-800 mt-1">
                Tổng Người Dùng
              </h3>
            </div>
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-purple-500 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-purple-500/20">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </div>
          </div>

          <div className="my-6">
            {loading ? (
              <div className="h-10 w-24 bg-slate-200 animate-pulse rounded-lg" />
            ) : (
              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-extrabold text-slate-900 tracking-tight">
                  {stats?.totalUsersCount ?? 0}
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200">
                  Thành viên
                </span>
              </div>
            )}
            <p className="text-xs text-slate-500 mt-2">
              Tài khoản đã đăng ký trong hệ thống, bao gồm Quản trị viên và Thành viên.
            </p>
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            <Link
              to="/admin/users"
              className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 inline-flex items-center gap-1.5 group"
            >
              <span>Đi đến Quản lý người dùng</span>
              <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      {/* Section: Danh sách các người dùng gần đây */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <span>Danh sách các người dùng gần đây</span>
              <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-slate-100 text-slate-600">
                {stats?.recentUsers?.length ?? 0} người dùng mới
              </span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Danh sách tài khoản vừa đăng ký hoặc hoạt động mới nhất trên hệ thống KBase
            </p>
          </div>

          <Link
            to="/admin/users"
            className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-lg transition-colors shrink-0"
          >
            <span>Xem tất cả người dùng</span>
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* Recent Users Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                <th className="py-3 px-6">Người dùng</th>
                <th className="py-3 px-6">Email</th>
                <th className="py-3 px-6">Vai trò</th>
                <th className="py-3 px-6">Trạng thái</th>
                <th className="py-3 px-6">Ngày tham gia</th>
                <th className="py-3 px-6 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {loading ? (
                Array.from({ length: 5 }).map((_, idx) => (
                  <tr key={idx} className="animate-pulse">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-slate-200" />
                        <div className="w-24 h-4 bg-slate-200 rounded" />
                      </div>
                    </td>
                    <td className="py-4 px-6"><div className="w-32 h-4 bg-slate-200 rounded" /></td>
                    <td className="py-4 px-6"><div className="w-16 h-5 bg-slate-200 rounded-full" /></td>
                    <td className="py-4 px-6"><div className="w-20 h-5 bg-slate-200 rounded-full" /></td>
                    <td className="py-4 px-6"><div className="w-24 h-4 bg-slate-200 rounded" /></td>
                    <td className="py-4 px-6 text-right"><div className="w-12 h-6 bg-slate-200 rounded ml-auto" /></td>
                  </tr>
                ))
              ) : !stats?.recentUsers || stats.recentUsers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-400 text-sm">
                    Chưa có người dùng nào được ghi nhận gần đây
                  </td>
                </tr>
              ) : (
                stats.recentUsers.map((u) => {
                  const isAdmin = u.role === "ROLE_ADMIN";
                  return (
                    <tr key={u.id} className="hover:bg-slate-50/60 transition-colors">
                      {/* Name & Avatar */}
                      <td className="py-3.5 px-6">
                        <div className="flex items-center gap-3">
                          <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${
                            isAdmin
                              ? "bg-gradient-to-tr from-purple-600 to-indigo-600 text-white"
                              : "bg-slate-200 text-slate-700"
                          }`}>
                            {u.avatarUrl ? (
                              <img src={u.avatarUrl} alt="" className="w-full h-full rounded-full object-cover" />
                            ) : (
                              u.fullName?.charAt(0) || u.email?.charAt(0) || "U"
                            )}
                          </div>
                          <div className="flex flex-col min-w-0">
                            <span className="font-semibold text-slate-800 truncate text-[13px]">
                              {u.fullName || "Chưa cập nhật tên"}
                            </span>
                            <span className="text-[11px] text-slate-400">ID: #{u.id}</span>
                          </div>
                        </div>
                      </td>

                      {/* Email */}
                      <td className="py-3.5 px-6 text-slate-600 text-xs font-mono">
                        {u.email}
                      </td>

                      {/* Role */}
                      <td className="py-3.5 px-6">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                          isAdmin
                            ? "bg-purple-50 text-purple-700 border border-purple-200"
                            : "bg-slate-100 text-slate-700 border border-slate-200"
                        }`}>
                          {isAdmin ? "Quản trị viên" : "Thành viên"}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="py-3.5 px-6">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          u.isActive
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : "bg-red-50 text-red-700 border border-red-200"
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${u.isActive ? "bg-emerald-500" : "bg-red-500"}`} />
                          {u.isActive ? "Hoạt động" : "Đã khóa"}
                        </span>
                      </td>

                      {/* Created At */}
                      <td className="py-3.5 px-6 text-xs text-slate-500">
                        {formatDate(u.createdAt)}
                      </td>

                      {/* Action */}
                      <td className="py-3.5 px-6 text-right">
                        <Link
                          to="/admin/users"
                          className="px-2.5 py-1 text-xs font-medium text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50 rounded transition-colors inline-block"
                        >
                          Quản lý
                        </Link>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}
