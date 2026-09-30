import React, { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import AdminLayout from "@/layouts/AdminLayout";
import { adminService } from "@/services";

export default function AdminProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [toast, setToast] = useState({ message: "", type: "success" });

  // Filters
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Actions
  const [actionInProgressId, setActionInProgressId] = useState(null);
  const [deleteConfirmProject, setDeleteConfirmProject] = useState(null);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => {
      setToast({ message: "", type: "success" });
    }, 3500);
  };

  const fetchProjects = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      const res = await adminService.getAllProjects();
      if (res?.data) {
        setProjects(res.data);
      }
    } catch (err) {
      console.error("Lỗi khi tải danh sách dự án:", err);
      setError(err.message || "Không thể tải danh sách dự án");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  // Handle Delete Project
  const handleDeleteProject = async () => {
    if (!deleteConfirmProject) return;
    try {
      setActionInProgressId(deleteConfirmProject.id);
      await adminService.deleteProject(deleteConfirmProject.id);
      showToast(`Đã xóa dự án "${deleteConfirmProject.name || deleteConfirmProject.title}" thành công`);
      setDeleteConfirmProject(null);
      fetchProjects();
    } catch (err) {
      showToast(err.message || "Không thể xóa dự án", "error");
    } finally {
      setActionInProgressId(null);
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "N/A";
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString("vi-VN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
    } catch {
      return dateStr;
    }
  };

  // Filter projects
  const filteredProjects = projects.filter((p) => {
    const name = p.name || p.title || "";
    const desc = p.description || p.desc || "";
    const owner = p.ownerName || p.ownerEmail || "";

    const matchesSearch =
      !search ||
      name.toLowerCase().includes(search.toLowerCase()) ||
      desc.toLowerCase().includes(search.toLowerCase()) ||
      owner.toLowerCase().includes(search.toLowerCase()) ||
      String(p.id).includes(search);

    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "active" && (p.status === "active" || !p.status)) ||
      (statusFilter === "inactive" && p.status !== "active");

    return matchesSearch && matchesStatus;
  });

  return (
    <AdminLayout
      activeTab="projects"
      title="Quản lý dự án"
      description="Quản lý toàn bộ không gian làm việc và dự án tri thức trên hệ thống"
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
            onClick={fetchProjects}
            className="px-3 py-1 bg-red-100 hover:bg-red-200 text-red-800 rounded-lg text-xs font-semibold"
          >
            Tải lại
          </button>
        </div>
      )}

      {/* Controls Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 mb-6 shadow-xs flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-80">
          <input
            type="text"
            placeholder="Tìm theo tên dự án, chủ sở hữu, ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-slate-800"
          />
          <svg className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto justify-end">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20"
          >
            <option value="all">Tất cả trạng thái</option>
            <option value="active">Đang hoạt động</option>
            <option value="inactive">Đã tạm dừng / lưu trữ</option>
          </select>

          <button
            onClick={fetchProjects}
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

      {/* Projects Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                <th className="py-3 px-6">Dự án</th>
                <th className="py-3 px-6">Chủ sở hữu</th>
                <th className="py-3 px-6">Tài liệu</th>
                <th className="py-3 px-6">Thành viên</th>
                <th className="py-3 px-6">Dung lượng</th>
                <th className="py-3 px-6">Trạng thái</th>
                <th className="py-3 px-6">Ngày tạo</th>
                <th className="py-3 px-6 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {loading ? (
                Array.from({ length: 5 }).map((_, idx) => (
                  <tr key={idx} className="animate-pulse">
                    <td className="py-4 px-6"><div className="w-40 h-4 bg-slate-200 rounded" /></td>
                    <td className="py-4 px-6"><div className="w-32 h-4 bg-slate-200 rounded" /></td>
                    <td className="py-4 px-6"><div className="w-16 h-4 bg-slate-200 rounded" /></td>
                    <td className="py-4 px-6"><div className="w-16 h-4 bg-slate-200 rounded" /></td>
                    <td className="py-4 px-6"><div className="w-20 h-4 bg-slate-200 rounded" /></td>
                    <td className="py-4 px-6"><div className="w-20 h-5 bg-slate-200 rounded-full" /></td>
                    <td className="py-4 px-6"><div className="w-24 h-4 bg-slate-200 rounded" /></td>
                    <td className="py-4 px-6 text-right"><div className="w-20 h-6 bg-slate-200 rounded ml-auto" /></td>
                  </tr>
                ))
              ) : filteredProjects.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-slate-400 text-sm">
                    Không tìm thấy dự án nào trong hệ thống
                  </td>
                </tr>
              ) : (
                filteredProjects.map((p) => {
                  const isBusy = actionInProgressId === p.id;
                  const isActive = p.status === "active" || !p.status;
                  return (
                    <tr key={p.id} className="hover:bg-slate-50/60 transition-colors">
                      {/* Name & Desc */}
                      <td className="py-3.5 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-500 to-indigo-600 text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-xs">
                            {(p.name || p.title || "P").charAt(0).toUpperCase()}
                          </div>
                          <div className="flex flex-col min-w-0 max-w-xs">
                            <span className="font-semibold text-slate-800 truncate text-[13px]">
                              {p.name || p.title}
                            </span>
                            <span className="text-[11px] text-slate-400 truncate">
                              {p.description || p.desc || "Không có mô tả"}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Owner */}
                      <td className="py-3.5 px-6">
                        <div className="flex flex-col">
                          <span className="text-xs font-semibold text-slate-700">
                            {p.ownerName || "Chưa xác định"}
                          </span>
                          <span className="text-[11px] text-slate-400 font-mono">
                            {p.ownerEmail || `ID #${p.ownerId}`}
                          </span>
                        </div>
                      </td>

                      {/* Docs Count */}
                      <td className="py-3.5 px-6 text-xs text-slate-600">
                        <span className="font-semibold text-slate-800">{p.totalFiles ?? 0}</span> tệp
                      </td>

                      {/* Members Count */}
                      <td className="py-3.5 px-6 text-xs text-slate-600">
                        <span className="font-semibold text-slate-800">{p.totalMembers ?? 1}</span> người
                      </td>

                      {/* Storage */}
                      <td className="py-3.5 px-6 text-xs text-slate-600 font-mono">
                        {p.storageUsed || "0 B"}
                      </td>

                      {/* Status */}
                      <td className="py-3.5 px-6">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          isActive
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : "bg-slate-100 text-slate-600 border border-slate-200"
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${isActive ? "bg-emerald-500" : "bg-slate-400"}`} />
                          {isActive ? "Hoạt động" : "Tạm dừng"}
                        </span>
                      </td>

                      {/* Created At */}
                      <td className="py-3.5 px-6 text-xs text-slate-500">
                        {formatDate(p.createdAt)}
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            type="button"
                            disabled={isBusy}
                            onClick={() => setDeleteConfirmProject(p)}
                            className="p-1 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                            title="Xóa dự án"
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

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 bg-slate-50/50 flex items-center justify-between text-xs text-slate-500">
          <span>Tổng số dự án: <strong className="text-slate-700">{filteredProjects.length}</strong></span>
          <span className="text-[11px] text-slate-400">Admin có toàn quyền quản trị và điều phối các dự án trong hệ thống</span>
        </div>
      </div>

      {/* Delete Project Confirmation Modal */}
      {deleteConfirmProject && (
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
              Xác nhận xóa dự án?
            </h3>
            <p className="text-xs text-slate-600 mb-6 leading-relaxed">
              Bạn có chắc chắn muốn xóa vĩnh viễn dự án <strong>"{deleteConfirmProject.name || deleteConfirmProject.title}"</strong>? Toàn bộ tài liệu, thành viên, và các cuộc trò chuyện AI liên quan sẽ bị xóa hoàn toàn khỏi hệ thống!
            </p>
            <div className="flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setDeleteConfirmProject(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
              >
                Hủy bỏ
              </button>
              <button
                type="button"
                onClick={handleDeleteProject}
                className="px-4 py-2 text-xs font-semibold bg-red-600 hover:bg-red-700 text-white rounded-xl shadow-xs transition-colors cursor-pointer"
              >
                Xác nhận xóa dự án
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
