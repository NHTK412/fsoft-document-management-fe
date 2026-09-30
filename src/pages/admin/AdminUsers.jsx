import React, { useEffect, useState, useCallback } from "react";
import AdminLayout from "@/layouts/AdminLayout";
import { adminService } from "@/services";
import { useAuth } from "@/contexts";

export default function AdminUsers() {
  const { user: currentUser } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [toast, setToast] = useState({ message: "", type: "success" });

  // Filters & Pagination
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [totalElements, setTotalElements] = useState(0);

  // Action states
  const [actionInProgressId, setActionInProgressId] = useState(null);
  const [deleteConfirmUser, setDeleteConfirmUser] = useState(null);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => {
      setToast({ message: "", type: "success" });
    }, 3500);
  };

  const fetchUsers = useCallback(async (pageIndex = 0) => {
    try {
      setLoading(true);
      setError("");
      const res = await adminService.getUsers(pageIndex, 10, "id,desc");
      if (res?.data) {
        setUsers(res.data.content || []);
        setTotalPages(res.data.totalPages || 1);
        setTotalElements(res.data.totalElements || 0);
        setPage(res.data.number || 0);
      }
    } catch (err) {
      console.error("Lỗi khi tải danh sách người dùng:", err);
      setError(err.message || "Không thể tải danh sách người dùng");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers(page);
  }, [fetchUsers, page]);

  // Handle Role Change
  const handleRoleChange = async (userId, newRole) => {
    if (userId === currentUser?.id) {
      alert("Bạn không thể tự thay đổi vai trò của chính mình!");
      return;
    }
    try {
      setActionInProgressId(userId);
      await adminService.changeRole(userId, newRole);
      showToast(`Đã cập nhật vai trò người dùng thành ${newRole === "ROLE_ADMIN" ? "Quản trị viên" : "Thành viên"}`);
      fetchUsers(page);
    } catch (err) {
      showToast(err.message || "Không thể đổi vai trò người dùng", "error");
    } finally {
      setActionInProgressId(null);
    }
  };

  // Handle Status Toggle (Lock / Unlock)
  const handleToggleStatus = async (userId, currentStatus) => {
    if (userId === currentUser?.id) {
      alert("Bạn không thể tự khóa tài khoản của chính mình!");
      return;
    }
    try {
      setActionInProgressId(userId);
      await adminService.toggleStatus(userId);
      showToast(`Tài khoản đã được ${currentStatus ? "khóa" : "mở khóa"} thành công`);
      fetchUsers(page);
    } catch (err) {
      showToast(err.message || "Không thể thay đổi trạng thái tài khoản", "error");
    } finally {
      setActionInProgressId(null);
    }
  };

  // Handle Delete User
  const handleDeleteUser = async () => {
    if (!deleteConfirmUser) return;
    if (deleteConfirmUser.id === currentUser?.id) {
      alert("Bạn không thể tự xóa tài khoản của chính mình!");
      setDeleteConfirmUser(null);
      return;
    }
    try {
      setActionInProgressId(deleteConfirmUser.id);
      await adminService.deleteUser(deleteConfirmUser.id);
      showToast(`Đã xóa tài khoản "${deleteConfirmUser.fullName || deleteConfirmUser.email}"`);
      setDeleteConfirmUser(null);
      fetchUsers(page);
    } catch (err) {
      showToast(err.message || "Không thể xóa tài khoản", "error");
    } finally {
      setActionInProgressId(null);
    }
  };

  // Client-side filtering for search & role/status
  const filteredUsers = users.filter((u) => {
    const matchesSearch =
      !search ||
      (u.fullName && u.fullName.toLowerCase().includes(search.toLowerCase())) ||
      (u.email && u.email.toLowerCase().includes(search.toLowerCase())) ||
      String(u.id).includes(search);

    const matchesRole =
      roleFilter === "all" ||
      (roleFilter === "admin" && u.role === "ROLE_ADMIN") ||
      (roleFilter === "user" && u.role === "ROLE_USER");

    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "active" && u.isActive) ||
      (statusFilter === "locked" && !u.isActive);

    return matchesSearch && matchesRole && matchesStatus;
  });

  return (
    <AdminLayout
      activeTab="users"
      title="Quản lý người dùng"
      description="Quản lý danh sách tài khoản, phân quyền quản trị và trạng thái người dùng"
    >
      {/* Toast Alert */}
      {toast.message && (
        <div className={`fixed bottom-6 right-6 z-50 px-4 py-3 rounded-xl shadow-lg border text-sm font-medium flex items-center gap-2 transition-all ${
          toast.type === "error"
            ? "bg-red-50 text-red-700 border-red-200"
            : "bg-emerald-50 text-emerald-800 border-emerald-200"
        }`}>
          {toast.type === "error" ? (
            <svg className="w-4 h-4 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          ) : (
            <svg className="w-4 h-4 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 6 9 17l-5-5" />
            </svg>
          )}
          <span>{toast.message}</span>
        </div>
      )}

      {/* Error Message */}
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
            onClick={() => fetchUsers(page)}
            className="px-3 py-1 bg-red-100 hover:bg-red-200 text-red-800 rounded-lg text-xs font-semibold"
          >
            Tải lại
          </button>
        </div>
      )}

      {/* Controls & Filters Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 mb-6 shadow-xs flex flex-col md:flex-row gap-4 items-center justify-between">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <input
            type="text"
            placeholder="Tìm theo tên, email hoặc ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-slate-800"
          />
          <svg className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
        </div>

        {/* Filter Dropdowns */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-end">
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20"
          >
            <option value="all">Tất cả vai trò</option>
            <option value="admin">Quản trị viên</option>
            <option value="user">Thành viên</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20"
          >
            <option value="all">Tất cả trạng thái</option>
            <option value="active">Đang hoạt động</option>
            <option value="locked">Đã khóa</option>
          </select>

          <button
            onClick={() => fetchUsers(page)}
            title="Làm mới"
            className="p-2 text-slate-500 hover:text-indigo-600 hover:bg-slate-100 rounded-xl border border-slate-200 transition-colors"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
              <path d="M3 3v5h5" />
              <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
              <path d="M16 21h5v-5" />
            </svg>
          </button>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                <th className="py-3 px-6">Người dùng</th>
                <th className="py-3 px-6">Email</th>
                <th className="py-3 px-6">Vai trò hệ thống</th>
                <th className="py-3 px-6">Trạng thái</th>
                <th className="py-3 px-6 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {loading ? (
                Array.from({ length: 6 }).map((_, idx) => (
                  <tr key={idx} className="animate-pulse">
                    <td className="py-4 px-6"><div className="w-32 h-4 bg-slate-200 rounded" /></td>
                    <td className="py-4 px-6"><div className="w-40 h-4 bg-slate-200 rounded" /></td>
                    <td className="py-4 px-6"><div className="w-24 h-6 bg-slate-200 rounded" /></td>
                    <td className="py-4 px-6"><div className="w-20 h-5 bg-slate-200 rounded-full" /></td>
                    <td className="py-4 px-6 text-right"><div className="w-24 h-6 bg-slate-200 rounded ml-auto" /></td>
                  </tr>
                ))
              ) : filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-slate-400 text-sm">
                    Không tìm thấy người dùng nào phù hợp với bộ lọc
                  </td>
                </tr>
              ) : (
                filteredUsers.map((u) => {
                  const isCurrent = u.id === currentUser?.id;
                  const isBusy = actionInProgressId === u.id;
                  return (
                    <tr key={u.id} className="hover:bg-slate-50/60 transition-colors">
                      {/* Name & Avatar */}
                      <td className="py-3.5 px-6">
                        <div className="flex items-center gap-3">
                          <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${
                            u.role === "ROLE_ADMIN"
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
                            <div className="flex items-center gap-1.5">
                              <span className="font-semibold text-slate-800 truncate text-[13px]">
                                {u.fullName || "Chưa cập nhật tên"}
                              </span>
                              {isCurrent && (
                                <span className="px-1.5 py-0.2 rounded text-[10px] bg-indigo-50 text-indigo-700 font-semibold border border-indigo-200">
                                  Bạn
                                </span>
                              )}
                            </div>
                            <span className="text-[11px] text-slate-400">ID: #{u.id}</span>
                          </div>
                        </div>
                      </td>

                      {/* Email */}
                      <td className="py-3.5 px-6 text-slate-600 text-xs font-mono">
                        {u.email}
                      </td>

                      {/* Role Selector */}
                      <td className="py-3.5 px-6">
                        <select
                          disabled={isCurrent || isBusy}
                          value={u.role || "ROLE_USER"}
                          onChange={(e) => handleRoleChange(u.id, e.target.value)}
                          className={`text-xs font-semibold px-2.5 py-1 rounded-lg border focus:outline-hidden transition-colors cursor-pointer ${
                            u.role === "ROLE_ADMIN"
                              ? "bg-purple-50 text-purple-700 border-purple-200 focus:border-purple-400"
                              : "bg-slate-50 text-slate-700 border-slate-200 focus:border-indigo-400"
                          } ${isCurrent ? "opacity-60 cursor-not-allowed" : ""}`}
                        >
                          <option value="ROLE_USER">Thành viên</option>
                          <option value="ROLE_ADMIN">Quản trị viên</option>
                        </select>
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

                      {/* Actions */}
                      <td className="py-3.5 px-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                          {/* Toggle Status */}
                          <button
                            type="button"
                            disabled={isCurrent || isBusy}
                            onClick={() => handleToggleStatus(u.id, u.isActive)}
                            className={`px-2.5 py-1 text-xs font-medium rounded-lg transition-colors border ${
                              u.isActive
                                ? "text-amber-700 bg-amber-50 hover:bg-amber-100 border-amber-200"
                                : "text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border-emerald-200"
                            } ${isCurrent ? "opacity-40 cursor-not-allowed" : "cursor-pointer"}`}
                            title={u.isActive ? "Khóa tài khoản" : "Mở khóa tài khoản"}
                          >
                            {u.isActive ? "Khóa" : "Mở khóa"}
                          </button>

                          {/* Delete */}
                          <button
                            type="button"
                            disabled={isCurrent || isBusy}
                            onClick={() => setDeleteConfirmUser(u)}
                            className={`p-1 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors ${
                              isCurrent ? "opacity-30 cursor-not-allowed" : "cursor-pointer"
                            }`}
                            title="Xóa tài khoản"
                          >
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M3 6h18" />
                              <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                              <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="p-4 border-t border-slate-200 bg-slate-50/50 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <div>
            Hiển thị trang <span className="font-semibold text-slate-700">{page + 1}</span> / <span className="font-semibold text-slate-700">{totalPages}</span> (Tổng cộng {totalElements} người dùng)
          </div>
          <div className="flex items-center gap-2">
            <button
              disabled={page <= 0 || loading}
              onClick={() => setPage((prev) => Math.max(0, prev - 1))}
              className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Trang trước
            </button>
            <button
              disabled={page >= totalPages - 1 || loading}
              onClick={() => setPage((prev) => prev + 1)}
              className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Trang sau
            </button>
          </div>
        </div>
      </div>

      {/* Delete User Confirmation Modal */}
      {deleteConfirmUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 max-w-md w-full p-6 animate-in fade-in zoom-in-95">
            <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mb-4">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 6h18" />
                <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
              </svg>
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2">
              Xác nhận xóa người dùng?
            </h3>
            <p className="text-xs text-slate-600 mb-6 leading-relaxed">
              Bạn có chắc chắn muốn xóa tài khoản <strong>{deleteConfirmUser.fullName || deleteConfirmUser.email}</strong> khỏi hệ thống? Thao tác này sẽ vô hiệu hóa và xóa người dùng.
            </p>
            <div className="flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setDeleteConfirmUser(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
              >
                Hủy bỏ
              </button>
              <button
                type="button"
                onClick={handleDeleteUser}
                className="px-4 py-2 text-xs font-semibold bg-red-600 hover:bg-red-700 text-white rounded-xl shadow-xs transition-colors cursor-pointer"
              >
                Xác nhận xóa
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
